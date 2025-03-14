import { Heart } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 border-t border-blue-100 dark:border-blue-900 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex justify-center items-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Développé avec <Heart className="h-3 w-3 inline text-red-500 mx-1 animate-pulse" /> par Fée Gaffe
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Changer de thème:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

