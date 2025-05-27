'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  slotId: string
  format?: 'auto' | 'fluid' | 'rectangle'
  style?: React.CSSProperties
}

export default function AdUnit({ slotId, format = 'auto', style }: AdUnitProps) {
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || []
      adsbygoogle.push({})
    } catch (err) {
      console.error('Erro ao carregar anúncio:', err)
    }
  }, [])

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          overflow: 'hidden',
          minHeight: '280px',
          ...style,
        }}
        data-ad-client="ca-pub-8729769513660491"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
} 