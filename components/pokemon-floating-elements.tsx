"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Pokémon element types for the floating elements
const elementTypes = [
  { name: "fire", color: "#F08030" },
  { name: "water", color: "#6890F0" },
  { name: "grass", color: "#78C850" },
  { name: "electric", color: "#F8D030" },
  { name: "psychic", color: "#F85888" },
  { name: "ice", color: "#98D8D8" },
  { name: "dragon", color: "#7038F8" },
  { name: "dark", color: "#705848" },
  { name: "fairy", color: "#EE99AC" },
]

// SVG paths for different Pokémon-related shapes
const pokemonShapes = [
  // Pokéball (simplified)
  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z M2 12h20 M12 2v20",
  // Lightning bolt
  "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  // Leaf
  "M12 2C7.03 2 3 6.03 3 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z M12 6v10 M7 11h10",
  // Fire
  "M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12z",
  // Water drop
  "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
]

type FloatingElement = {
  id: number
  x: number
  y: number
  size: number
  speed: number
  rotation: number
  rotationSpeed: number
  shape: string
  color: string
  delay: number
  opacity: number
}

export default function PokemonFloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Create floating elements
    const newElements = Array.from({ length: 20 }, (_, i) => {
      const elementType = elementTypes[Math.floor(Math.random() * elementTypes.length)]
      const shape = pokemonShapes[Math.floor(Math.random() * pokemonShapes.length)]

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        speed: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        shape,
        color: elementType.color,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
      }
    })

    setElements(newElements)

    // Animate elements
    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: element.y - element.speed > -10 ? element.y - element.speed : 110,
          x: element.x + (Math.random() * 0.4 - 0.2),
          rotation: (element.rotation + element.rotationSpeed) % 360,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, element.opacity, 0],
            rotate: [element.rotation, element.rotation + 360],
          }}
          transition={{
            opacity: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
            },
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={element.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "100%", height: "100%" }}
          >
            <path d={element.shape} />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

