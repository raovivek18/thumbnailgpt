import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Route segment config
export const runtime = 'edge'
export const alt = 'ThumbnailGPT – Make Stunning Thumbnails with AI'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default async function Image(request: NextRequest) {
  // Try to load a font (optional, for better text rendering)
  // For now, we'll use system fonts
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 141, 0, 0.1) 0%, transparent 70%)',
        }}
      >
        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: '1.1',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            ThumbnailGPT
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#FF8D00',
              textAlign: 'center',
              marginTop: '0',
              fontWeight: '600',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Make Stunning Thumbnails with AI
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#CCCCCC',
              textAlign: 'center',
              marginTop: '30px',
              maxWidth: '900px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Create viral, high-CTR thumbnails in seconds
          </p>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 141, 0, 0.3) 0%, transparent 70%)',
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 141, 0, 0.2) 0%, transparent 70%)',
            opacity: 0.4,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

