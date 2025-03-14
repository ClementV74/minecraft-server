"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <Header />

      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-200 dark:bg-red-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 dark:opacity-40" />
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-neutral-900 dark:text-white">
              Modern, Minimal, <span className="text-red-600 dark:text-red-500">Professional</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
              A clean, minimalist design focused on readability and user experience. Subtle animations and thoughtful
              interactions enhance engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 h-12 px-8 text-base">
              Get Started
            </Button>
            <Button variant="outline" className="h-12 px-8 text-base group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

