"use client"

interface ImageRevealProps {
  leftImage: string
  leftMiddleImage: string
  middleImage: string
  rightMiddleImage: string
  rightImage: string
}

export default function ImageReveal({
  leftImage,
  leftMiddleImage,
  middleImage,
  rightMiddleImage,
  rightImage,
}: ImageRevealProps) {
  const imageSize = "w-24 h-24"

  return (
    <div className="relative flex items-center justify-center w-full h-32 my-4 animate-fade-in">
      {/* Left Image */}
      <div
        className={`absolute ${imageSize} origin-bottom-right overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-out hover:scale-105`}
        style={{
          zIndex: 50,
          transform: "rotate(-10deg) translate(-80px, 8px)",
        }}
      >
        <img
          src={leftImage || "/placeholder.svg"}
          alt="Left image"
          className="object-cover w-full h-full p-1.5 rounded-lg"
        />
      </div>

      {/* Left Middle Image */}
      <div
        className={`absolute ${imageSize} origin-bottom overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-out hover:scale-105`}
        style={{
          zIndex: 40,
          transform: "rotate(-5deg) translate(-45px, 5px)",
        }}
      >
        <img
          src={leftMiddleImage || "/placeholder.svg"}
          alt="Left middle image"
          className="object-cover w-full h-full p-1.5 rounded-lg"
        />
      </div>

      {/* Middle Image */}
      <div
        className={`absolute ${imageSize} origin-bottom overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2`}
        style={{
          zIndex: 30,
          transform: "rotate(2deg)",
        }}
      >
        <img
          src={middleImage || "/placeholder.svg"}
          alt="Middle image"
          className="object-cover w-full h-full p-1.5 rounded-lg"
        />
      </div>

      {/* Right Middle Image */}
      <div
        className={`absolute ${imageSize} origin-bottom overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-out hover:scale-105`}
        style={{
          zIndex: 20,
          transform: "rotate(5deg) translate(45px, 5px)",
        }}
      >
        <img
          src={rightMiddleImage || "/placeholder.svg"}
          alt="Right middle image"
          className="object-cover w-full h-full p-1.5 rounded-lg"
        />
      </div>

      {/* Right Image */}
      <div
        className={`absolute ${imageSize} origin-bottom-left overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-500 ease-out hover:scale-105`}
        style={{
          zIndex: 10,
          transform: "rotate(10deg) translate(80px, 8px)",
        }}
      >
        <img
          src={rightImage || "/placeholder.svg"}
          alt="Right image"
          className="object-cover w-full h-full p-1.5 rounded-lg"
        />
      </div>
    </div>
  )
}
