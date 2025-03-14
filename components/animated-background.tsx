"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  opacity: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Create particles
    const particleCount = 30
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color:
          Math.random() > 0.5
            ? Math.random() > 0.5
              ? "#3b82f6"
              : "#2563eb"
            : Math.random() > 0.5
              ? "#ef4444"
              : "#dc2626",
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    setParticles(newParticles)

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy

          // Bounce off edges
          if (newX < 0 || newX > 100) {
            particle.vx *= -1
            newX = particle.x + particle.vx
          }
          if (newY < 0 || newY > 100) {
            particle.vy *= -1
            newY = particle.y + particle.vy
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950 opacity-40"></div>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

