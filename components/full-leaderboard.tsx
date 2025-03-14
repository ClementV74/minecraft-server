"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fetchLeaderboard } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FullLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLeaderboard()
        setLeaderboardData(data.players || [])
      } catch (error) {
        console.error("Failed to load leaderboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin h-8 w-8 border-4 border-red-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No player data available</p>
      </div>
    )
  }

  // Sort players by pokemon count (descending)
  const sortedByPokemon = [...leaderboardData].sort((a, b) => b.pokemon - a.pokemon)

  // Sort players by shiny count (descending)
  const sortedByShiny = [...leaderboardData].sort((a, b) => b.shiny - a.shiny)

  // Filter players based on search term
  const filterPlayers = (players: any[]) => {
    if (!searchTerm) return players
    return players.filter((player) => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const filteredPokemonPlayers = filterPlayers(sortedByPokemon)
  const filteredShinyPlayers = filterPlayers(sortedByShiny)

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50">
      <Tabs defaultValue="pokemon" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList className="bg-gray-700/50">
            <TabsTrigger value="pokemon" className="data-[state=active]:bg-red-500">
              <Trophy className="mr-2 h-4 w-4" /> Pokémon
            </TabsTrigger>
            <TabsTrigger value="shiny" className="data-[state=active]:bg-red-500">
              <Star className="mr-2 h-4 w-4" /> Shiny
            </TabsTrigger>
          </TabsList>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search player..."
              className="pl-10 bg-gray-700/30 border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="pokemon" className="mt-0">
          <LeaderboardTable players={filteredPokemonPlayers} valueKey="pokemon" title="Pokémon attrapé" />
        </TabsContent>

        <TabsContent value="shiny" className="mt-0">
          <LeaderboardTable players={filteredShinyPlayers} valueKey="shiny" title="Shiny Pokémon" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LeaderboardTable({ players, valueKey, title }: { players: any[]; valueKey: string; title: string }) {
  if (players.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No players found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">Classement</th>
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joueur</th>
            <th className="py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <motion.tr
              key={player.uuid || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 1) }}
              className="hover:bg-gray-700/30 transition-colors"
            >
              <td className="py-4">
                <div className="flex justify-center items-center">
                  {index === 0 ? (
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">
                      1
                    </div>
                  ) : index === 1 ? (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 font-bold">
                      2
                    </div>
                  ) : index === 2 ? (
                    <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-gray-900 font-bold">
                      3
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 font-medium">{player.name}</td>
              <td className="py-4 text-right font-bold text-red-400">{player[valueKey]}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

