"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fetchLeaderboard } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPreview() {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  // Get top 5 players for preview
  const topPokemonPlayers = sortedByPokemon.slice(0, 5)
  const topShinyPlayers = sortedByShiny.slice(0, 5)

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50">
      <Tabs defaultValue="pokemon" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-gray-700/50">
            <TabsTrigger value="pokemon" className="data-[state=active]:bg-red-500">
              <Trophy className="mr-2 h-4 w-4" /> Pokémon
            </TabsTrigger>
            <TabsTrigger value="shiny" className="data-[state=active]:bg-red-500">
              <Star className="mr-2 h-4 w-4" /> Shiny
            </TabsTrigger>
          </TabsList>

          <Link href="/leaderboard">
            <Button variant="link" className="text-red-400">
              Voir le classement complet <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TabsContent value="pokemon" className="mt-0">
          <LeaderboardTable players={topPokemonPlayers} valueKey="pokemon" title="Pokémon Caught" />
        </TabsContent>

        <TabsContent value="shiny" className="mt-0">
          <LeaderboardTable players={topShinyPlayers} valueKey="shiny" title="Shiny Pokémon" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LeaderboardTable({ players, valueKey, title }: { players: any[]; valueKey: string; title: string }) {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">Rank</th>
            <th className="py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
            <th className="py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <motion.tr
              key={player.uuid || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover:bg-gray-700/30 transition-colors relative group"
              whileHover={{
                backgroundColor: "rgba(156, 163, 175, 0.1)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 -z-10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  repeatDelay: 0.5,
                  ease: "linear",
                }}
              />
              <td className="py-4">
                <div className="flex justify-center items-center">
                  {index === 0 ? (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold relative"
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(234, 179, 8, 0)",
                          "0 0 10px rgba(234, 179, 8, 0.7)",
                          "0 0 0px rgba(234, 179, 8, 0)",
                        ],
                      }}
                      transition={{ boxShadow: { repeat: Number.POSITIVE_INFINITY, duration: 2 } }}
                    >
                      1
                      <motion.div
                        className="absolute -inset-1 rounded-full border-2 border-yellow-500 opacity-60"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      />
                    </motion.div>
                  ) : index === 1 ? (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-900 font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      2
                    </motion.div>
                  ) : index === 2 ? (
                    <motion.div
                      className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-gray-900 font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      3
                    </motion.div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 font-medium group-hover:text-red-400 transition-colors">{player.name}</td>
              <td className="py-4 text-right">
                <div className="inline-flex items-center justify-center">
                  <motion.span className="font-bold text-red-400" whileHover={{ scale: 1.1 }}>
                    {player[valueKey]}
                  </motion.span>
                  {valueKey === "pokemon" ? (
                    <motion.div
                      className="ml-2 text-yellow-500"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatDelay: 1 }}
                    >
                      <Trophy className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="ml-2 text-yellow-500"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    >
                      <Star className="h-4 w-4" />
                    </motion.div>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

