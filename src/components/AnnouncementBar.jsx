import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-tea-accent-violet text-white py-2 px-4 text-center text-sm relative">
      <div className="container mx-auto">
        <p className="font-medium">
          🚚 Livraison en France FR, Belgique BE & Luxembourg LU offerte dès 49€ | 10% avec le code WELCOME
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-accent-foreground/10"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default AnnouncementBar

