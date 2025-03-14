// Function to fetch server stats
export async function fetchServerStats() {
  try {
    const response = await fetch("https://feegaffe.fr/poke/api.php?endpoint=stats", { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error("Failed to fetch server stats")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching server stats:", error)
    return { players_online: 0 }
  }
}

// Function to fetch player list
export async function fetchPlayerList() {
  try {
    const response = await fetch("https://feegaffe.fr/poke/api.php?endpoint=joueur", { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error("Failed to fetch player list")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching player list:", error)
    return { players: [] }
  }
}

// Function to fetch leaderboard data
export async function fetchLeaderboard() {
  try {
    const response = await fetch("https://feegaffe.fr/poke/getdata.php", { next: { revalidate: 300 } })

    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard data")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching leaderboard data:", error)
    return { status: "error", players: [] }
  }
}

