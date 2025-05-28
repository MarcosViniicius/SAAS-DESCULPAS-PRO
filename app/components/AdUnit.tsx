'use client'

import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slotId: string
  format?: 'auto' | 'fluid' | 'rectangle'
  style?: React.CSSProperties
}

export default function AdUnit({ slotId, format = 'auto', style }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || []
      
      // Limpa anúncios anteriores
      if (adRef.current) {
        const ads = adRef.current.querySelectorAll('.adsbygoogle')
        ads.forEach(ad => ad.remove())
      }

      // Cria novo elemento de anúncio
      const adElement = document.createElement('ins')
      adElement.className = 'adsbygoogle'
      adElement.style.display = 'block'
      adElement.style.overflow = 'hidden'
      adElement.style.minHeight = '280px'
      Object.assign(adElement.style, style)
      adElement.setAttribute('data-ad-client', 'ca-pub-8729769513660491')
      adElement.setAttribute('data-ad-slot', slotId)
      adElement.setAttribute('data-ad-format', format)
      adElement.setAttribute('data-full-width-responsive', 'true')

      // Adiciona o elemento ao container
      if (adRef.current) {
        adRef.current.appendChild(adElement)
        adsbygoogle.push({})
      }
    } catch (err) {
      console.error('Erro ao carregar anúncio:', err)
    }
  }, [slotId, format, style])

  return <div ref={adRef} className="ad-container my-4" />
} 