"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        const form = e.target as HTMLFormElement
        form.reset()
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Get in Touch</h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
              Have questions or ready to start your project? Reach out to us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/20 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Email</p>
                    <p className="text-neutral-700 dark:text-neutral-300">contact@minimal.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Phone</p>
                    <p className="text-neutral-700 dark:text-neutral-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-red-100 dark:bg-red-900/20 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-red-600 dark:text-red-500" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Address</p>
                    <p className="text-neutral-700 dark:text-neutral-300">123 Design Street, Creative City, 10001</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-white">Office Hours</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-neutral-700 dark:text-neutral-300">Saturday - Sunday: Closed</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    disabled={isSubmitting || submitted}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    disabled={isSubmitting || submitted}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    disabled={isSubmitting || submitted}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800 h-12"
                  disabled={isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

