// Définition du type CacheItem qui contient les données et le timestamp
type CacheItem<T> = {
  data: T;
  timestamp: number;
};

// Classe ApiClient avec gestion du cache et du throttling
class ApiClient {
  private cache: Map<string, CacheItem<any>> = new Map(); // Le cache des réponses
  private throttleTime = 30000; // Délai de 30 secondes entre les requêtes identiques

  // Méthode générique pour effectuer les requêtes API avec cache et throttling
  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const cacheKey = `${url}-${JSON.stringify(options?.body || {})}`; // Clé de cache basée sur l'URL et les paramètres
    const now = Date.now(); // Timestamp actuel

    // Vérification si la réponse est déjà dans le cache et si elle est encore valide
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && now - cachedItem.timestamp < this.throttleTime) {
      console.log("Using cached response for:", url); // Affiche que l'on utilise une réponse mise en cache
      return cachedItem.data; // Retourne les données mises en cache
    }

    // Si la réponse n'est pas dans le cache ou est expirée, on fait la requête API
    console.log("Making fresh API request to:", url);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`); // Gestion des erreurs si la requête échoue
    }

    const data = await response.json(); // Récupère les données au format JSON

    // Mise en cache de la réponse pour la réutiliser plus tard
    this.cache.set(cacheKey, {
      data,
      timestamp: now,
    });

    return data; // Retourne les données de la requête
  }

  // Méthode pour effectuer une requête GET
  async get<T>(url: string): Promise<T> {
    return this.fetch<T>(url, { method: "GET" });
  }

  // Méthode pour effectuer une requête POST
  async post<T>(url: string, body: any): Promise<T> {
    return this.fetch<T>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  // Méthode pour effacer un élément spécifique du cache
  clearCache(url: string): void {
    const keys = Array.from(this.cache.keys());
    keys.forEach((key) => {
      if (key.startsWith(url)) {
        this.cache.delete(key); // Supprime les éléments du cache correspondant à l'URL
      }
    });
  }

  // Méthode pour effacer tout le cache
  clearAllCache(): void {
    this.cache.clear(); // Vide tout le cache
  }
}

// Exporter une instance unique de ApiClient pour l'utiliser dans le reste du code
export const apiClient = new ApiClient();
