class ApiClient {
  constructor() {
    this.cache = new Map();  // Cache des réponses API
    this.cacheDuration = 60000;  // Durée de cache en millisecondes (ex. 1 minute)
  }

  // Méthode de récupération avec cache
  async fetchWithCache(url, options) {
    const cacheKey = this.createCacheKey(url, options);

    // Vérifier si la réponse est en cache et si elle est encore valide
    const cachedResponse = this.cache.get(cacheKey);
    if (cachedResponse && Date.now() - cachedResponse.timestamp < this.cacheDuration) {
      console.log("Utilisation du cache pour:", url);
      return cachedResponse.data;  // Retourne les données en cache si elles sont valides
    }

    // Si pas en cache ou cache expiré, on fait une requête API
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des données depuis l'API: ${response.status}`);
    }

    const data = await response.json();

    // Mettre en cache la réponse
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    console.log("Nouvelle requête API pour:", url);
    return data;
  }

  // Générer une clé de cache unique pour chaque URL + options
  createCacheKey(url, options) {
    return `${url}-${JSON.stringify(options?.body || {})}`;
  }

  // Méthodes pour récupérer des données
  async fetchServerStats() {
    const url = "https://feegaffe.fr/poke/api.php?endpoint=stats";
    return this.fetchWithCache(url, { method: "GET" });
  }

  async fetchPlayerList() {
    const url = "https://feegaffe.fr/poke/api.php?endpoint=joueur";
    return this.fetchWithCache(url, { method: "GET" });
  }

  async fetchLeaderboard() {
    const url = "https://feegaffe.fr/poke/getdata.php";
    return this.fetchWithCache(url, { method: "GET" });
  }
}

// Instancier l'ApiClient
const apiClient = new ApiClient();

// Exemple d'appel des différentes fonctions
async function loadData() {
  try {
    const serverStats = await apiClient.fetchServerStats();
    console.log('Server Stats:', serverStats);

    const playerList = await apiClient.fetchPlayerList();
    console.log('Player List:', playerList);

    const leaderboard = await apiClient.fetchLeaderboard();
    console.log('Leaderboard:', leaderboard);
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
}

// Appeler la fonction pour charger les données
loadData();
