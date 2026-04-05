import React from 'react'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent border-b-transparent rounded-full animate-spin shadow-lg">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
