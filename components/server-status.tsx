"use client"

import { fetchServerStats } from "@/lib/api"
import { motion } from "framer-motion"

export default async function ServerStatus() {
  const stats = await fetchServerStats()

  return (
    <div className="space-y-4">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className={`h-3 w-3 rounded-full ${stats.players_online > 0 ? "bg-green-500" : "bg-red-500"}`}
            animate={{
              scale: stats.players_online > 0 ? [1, 1.2, 1] : 1,
              boxShadow:
                stats.players_online > 0
                  ? ["0 0 0px rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.7)", "0 0 0px rgba(34, 197, 94, 0)"]
                  : "none",
            }}
            transition={{
              repeat: stats.players_online > 0 ? Number.POSITIVE_INFINITY : 0,
              duration: 2,
            }}
          ></motion.div>
          <span className="font-medium">Server Status</span>
        </div>
        <span className={`text-sm font-semibold ${stats.players_online > 0 ? "text-green-500" : "text-red-500"}`}>
          {stats.players_online > 0 ? "Online" : "Offline"}
        </span>
      </motion.div>

      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <span className="text-gray-400">Players Online</span>
        <motion.span
          className="text-xl font-bold text-red-400"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
        >
          {stats.players_online}
        </motion.span>
      </motion.div>

      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <span className="text-gray-400">Server Address</span>
        <motion.span className="font-medium relative group" whileHover={{ scale: 1.05 }}>
          gameplay.hosterfy.eu
          <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-300"></motion.span>
        </motion.span>
      </motion.div>

      <motion.div
        className="mt-6 pt-4 border-t border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Player Capacity</span>
          <span className="text-sm font-medium">{stats.players_online} / 100</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2 overflow-hidden">
          <motion.div
            className="bg-red-500 h-2.5 rounded-full relative"
            style={{ width: "0%" }}
            animate={{ width: `${Math.min(stats.players_online, 100)}%` }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "linear",
                repeatDelay: 1,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

