"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, Shield, Smartphone, Moon, BarChart, RefreshCw } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-6 w-6 text-red-600 dark:text-red-500" />,
    title: "Lightning Fast",
    description: "Optimized performance ensures your website loads quickly on all devices.",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-500" />,
    title: "Secure by Default",
    description: "Built with security best practices to keep your data safe and protected.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-red-600 dark:text-red-500" />,
    title: "Fully Responsive",
    description: "Looks great on any device, from mobile phones to desktop computers.",
  },
  {
    icon: <Moon className="h-6 w-6 text-blue-600 dark:text-blue-500" />,
    title: "Dark Mode",
    description: "Switch between light and dark themes based on your preference.",
  },
  {
    icon: <BarChart className="h-6 w-6 text-red-600 dark:text-red-500" />,
    title: "Analytics Ready",
    description: "Built-in support for tracking user behavior and engagement.",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-blue-600 dark:text-blue-500" />,
    title: "API Throttling",
    description: "Smart request handling to prevent excessive server load.",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-700 dark:text-neutral-300"
          >
            Everything you need to create a professional, modern website
          </motion.p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 p-2 inline-block bg-neutral-100 dark:bg-neutral-700 rounded-lg">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{feature.title}</h3>
              <p className="text-neutral-700 dark:text-neutral-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

