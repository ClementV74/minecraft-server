// Utility for throttling API requests
// This ensures we don't make more than one request every 30 seconds

type CacheItem<T> = {
  data: T
  timestamp: number
}

class ApiClient {
  private cache: Map<string, CacheItem<any>> = new Map()
  private throttleTime = 30000 // 30 seconds

  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const cacheKey = `${url}-${JSON.stringify(options?.body || {})}`
    const now = Date.now()

    // Check if we have a cached response that's still valid
    const cachedItem = this.cache.get(cacheKey)
    if (cachedItem && now - cachedItem.timestamp < this.throttleTime) {
      console.log("Using cached response for:", url)
      return cachedItem.data
    }

    // Make the API request
    console.log("Making fresh API request to:", url)
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()

    // Cache the response
    this.cache.set(cacheKey, {
      data,
      timestamp: now,
    })

    return data
  }

  // Helper methods for common HTTP methods
  async get<T>(url: string): Promise<T> {
    return this.fetch<T>(url, { method: "GET" })
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this.fetch<T>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  }

  // Clear a specific cache entry
  clearCache(url: string): void {
    const keys = Array.from(this.cache.keys())
    keys.forEach((key) => {
      if (key.startsWith(url)) {
        this.cache.delete(key)
      }
    })
  }

  // Clear all cache
  clearAllCache(): void {
    this.cache.clear()
  }
}

// Export a singleton instance
export const apiClient = new ApiClient()

