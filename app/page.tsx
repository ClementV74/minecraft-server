"use client"

import { Suspense } from "react"
import ServerStatus from "@/components/server-status"
import PlayerList from "@/components/player-list"
import HeroSection from "@/components/hero-section"
import LeaderboardPreview from "@/components/leaderboard-preview"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <HeroSection />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <motion.section
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50"
            whileHover={{
              boxShadow: "0 0 20px rgba(248, 113, 113, 0.15)",
              borderColor: "rgba(248, 113, 113, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-400">Server Status</h2>
            <Suspense fallback={<LoadingState />}>
              <ServerStatus />
            </Suspense>
          </motion.div>

          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700/50"
            whileHover={{
              boxShadow: "0 0 20px rgba(248, 113, 113, 0.15)",
              borderColor: "rgba(248, 113, 113, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-400">Joueur en ligne</h2>
            <Suspense fallback={<LoadingState />}>
              <PlayerList />
            </Suspense>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-center text-red-400"
            animate={{
              textShadow: [
                "0 0 0px rgba(248, 113, 113, 0)",
                "0 0 5px rgba(248, 113, 113, 0.5)",
                "0 0 0px rgba(248, 113, 113, 0)",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          >
            Rank
          </motion.h2>
          <Suspense fallback={<LoadingState />}>
            <LeaderboardPreview />
          </Suspense>
        </motion.section>
      </div>
    </main>
  )
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-40">
      <motion.div
        className="relative w-12 h-12"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-red-400 border-b-red-500 border-l-red-400 opacity-75"
          animate={{
            boxShadow: [
              "0 0 0px rgba(248, 113, 113, 0)",
              "0 0 10px rgba(248, 113, 113, 0.5)",
              "0 0 0px rgba(248, 113, 113, 0)",
            ],
          }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        />
      </motion.div>
    </div>
  )
}

