"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "This minimalist design perfectly balances aesthetics and functionality. The subtle animations make the experience engaging without being distracting.",
    author: "Alex Johnson",
    title: "Design Director",
  },
  {
    quote:
      "The dark mode implementation is flawless. As someone who works late, I appreciate the attention to detail in both light and dark themes.",
    author: "Samantha Lee",
    title: "Frontend Developer",
  },
  {
    quote:
      "API throttling has significantly improved our server performance. The minimalist approach extends beyond just visuals to smart technical decisions.",
    author: "Michael Chen",
    title: "CTO, TechStart",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    // Auto-advance testimonials every 8 seconds
    const interval = setInterval(nextTestimonial, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">What Our Clients Say</h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Feedback from professionals who use our platform
            </p>
          </motion.div>

          <div className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 md:p-12">
            <div className="absolute -top-6 left-10 text-red-500 dark:text-red-400">
              <Quote className="h-12 w-12 rotate-180" />
            </div>

            <div className="min-h-[200px] flex items-center justify-center">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={() => setIsAnimating(false)}
                className="text-center"
              >
                <p className="text-xl italic mb-8 text-neutral-700 dark:text-neutral-300">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">{testimonials[currentIndex].author}</p>
                  <p className="text-neutral-600 dark:text-neutral-400">{testimonials[currentIndex].title}</p>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                disabled={isAnimating}
                className="rounded-full h-10 w-10 border-neutral-300 dark:border-neutral-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (isAnimating || index === currentIndex) return
                    setIsAnimating(true)
                    setCurrentIndex(index)
                  }}
                  className={`rounded-full h-3 w-3 p-0 ${
                    index === currentIndex ? "bg-blue-600 dark:bg-blue-500" : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                disabled={isAnimating}
                className="rounded-full h-10 w-10 border-neutral-300 dark:border-neutral-700"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

