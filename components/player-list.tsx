"use client"

import Image from "next/image"
import { fetchPlayerList } from "@/lib/api"
import { motion } from "framer-motion"

export default async function PlayerList() {
  const playerData = await fetchPlayerList()
  const players = playerData.players || []

  if (players.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No players are currently online</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {players.map((player, index) => (
        <motion.div
          key={player.uuid || index}
          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 8px rgba(248, 113, 113, 0.3)",
          }}
        >
          <motion.div
            className="relative h-10 w-10 rounded-md overflow-hidden border border-red-500/50"
            whileHover={{ borderColor: "rgba(248, 113, 113, 0.8)" }}
          >
            {player.skin ? (
              <Image
                src={player.skin || "/placeholder.svg"}
                alt={player.name}
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center text-xs">
                {player.name.charAt(0)}
              </div>
            )}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          <div className="flex-1">
            <motion.p
              className="font-medium"
              whileHover={{ color: "rgb(248, 113, 113)" }}
              transition={{ duration: 0.2 }}
            >
              {player.name}
            </motion.p>
            <p className="text-xs text-gray-400">Online</p>
          </div>
          <motion.div
            className="h-2 w-2 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0px rgba(34, 197, 94, 0)",
                "0 0 5px rgba(34, 197, 94, 0.7)",
                "0 0 0px rgba(34, 197, 94, 0)",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

