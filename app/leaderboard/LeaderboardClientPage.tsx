"use client"

import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FullLeaderboard from "@/components/full-leaderboard"
import { motion } from "framer-motion"

export default function LeaderboardClientPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" /> Back
              to Home
            </Button>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Player Leaderboard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Suspense fallback={<LoadingState />}>
            <FullLeaderboard />
          </Suspense>
        </motion.div>
      </div>
    </main>
  )
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center h-60">
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

