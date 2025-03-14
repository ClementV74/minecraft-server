"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HeroSection() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const serverIp = "gameplay.hosterfy.eu"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIp)
    setCopied(true)
    toast({
      title: "Server IP copied!",
      description: "The server IP has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://preview.redd.it/cobblemon-banner-looks-epic-v0-oalspkbfms4d1.jpeg?width=1080&crop=smart&auto=webp&s=844d26e5708e3b891a25b4519ea7fb13abfb6867')",
          }}
        ></div>
      </div>

      {/* Floating particles */}
      <ParticleEffect />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <motion.div
              className="absolute -inset-6 rounded-full bg-red-500/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Minecraft Adventure
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Rejoinger un serveur incroyable
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white relative overflow-hidden group">
                <span className="relative z-10">
                  Join Now{" "}
                  <ArrowRight className="ml-2 h-4 w-4 inline-block group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-red-500 text-red-400 hover:bg-red-500/10 relative overflow-hidden group"
                onClick={copyToClipboard}
              >
                <span className="relative z-10">
                  {copied ? "Copied!" : serverIp}{" "}
                  <Copy className="ml-2 h-4 w-4 inline-block group-hover:scale-110 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function ParticleEffect() {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      color: string
      rotation: number
      rotationSpeed: number
    }>
  >([])

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: 40 }, (_, i) => {
      const isRed = Math.random() > 0.5
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        color: isRed
          ? `rgba(${220 + Math.floor(Math.random() * 35)}, ${50 + Math.floor(Math.random() * 30)}, ${50 + Math.floor(Math.random() * 30)}, 0.${Math.floor(Math.random() * 5) + 3})`
          : `rgba(${220 + Math.floor(Math.random() * 35)}, ${220 + Math.floor(Math.random() * 35)}, ${220 + Math.floor(Math.random() * 35)}, 0.${Math.floor(Math.random() * 5) + 2})`,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      }
    })

    setParticles(newParticles)

    // Animate particles
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y - particle.speed > -10 ? particle.y - particle.speed : 110,
          x: particle.x + (Math.random() * 0.6 - 0.3),
          rotation: (particle.rotation + particle.rotationSpeed) % 360,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.7 ? "50%" : `${Math.floor(Math.random() * 40) + 10}%`,
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: Math.random() > 0.8 ? `0 0 ${Math.floor(Math.random() * 5) + 2}px ${particle.color}` : "none",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0.5],
            rotate: [0, particle.rotation],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

