import { apiClient } from './api-client' // Assurez-vous que le chemin d'importation est correct

// Function to fetch server stats
export async function fetchServerStats() {
  try {
    // Utilisation de apiClient pour effectuer la requête et utiliser le cache
    const response = await apiClient.get("https://feegaffe.fr/poke/api.php?endpoint=stats");
    return response;
  } catch (error) {
    console.error("Error fetching server stats:", error);
    return { players_online: 0 }; // Default fallback
  }
}

// Function to fetch player list
export async function fetchPlayerList() {
  try {
    // Utilisation de apiClient pour effectuer la requête et utiliser le cache
    const response = await apiClient.get("https://feegaffe.fr/poke/api.php?endpoint=joueur");
    return response;
  } catch (error) {
    console.error("Error fetching player list:", error);
    return { players: [] }; // Default fallback
  }
}

// Function to fetch leaderboard data
export async function fetchLeaderboard() {
  try {
    // Utilisation de apiClient pour effectuer la requête et utiliser le cache
    const response = await apiClient.get("https://feegaffe.fr/poke/getdata.php");
    return response;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return { status: "error", players: [] }; // Default fallback
  }
}
