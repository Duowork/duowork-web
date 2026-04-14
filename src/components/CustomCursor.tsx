import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide default cursor
    document.body.style.cursor = "none"

    // Store cursor position
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY

    // Set initial position
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Check if hovering over links or buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink =
        target.tagName.toLowerCase() === "a" ||
        target.closest("a") ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button")

      if (isLink) {
        cursor.classList.remove("w-16", "h-16")
        cursor.classList.add("w-8", "h-8")
      } else {
        cursor.classList.remove("w-8", "h-8")
        cursor.classList.add("w-16", "h-16")
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    const smoothCursor = () => {
      // Calculate smooth position with easing
      const easing = 0.2 // Lower for smoother/slower tracking
      cursorX += (mouseX - cursorX) * easing
      cursorY += (mouseY - cursorY) * easing

      // Apply position with smoothing
      cursor.style.left = `${cursorX}px`
      cursor.style.top = `${cursorY}px`

      // Continue animation loop
      requestAnimationFrame(smoothCursor)
    }

    smoothCursor()

    // Cleanup
    return () => {
      document.body.style.cursor = "auto"
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="custom-cursor fixed pointer-events-none rounded-full bg-opacity-60 z-50 w-16 h-16 transition-[width]"
      style={{
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#9eff51',
        mixBlendMode: 'difference',
        backfaceVisibility: 'hidden'
      }}
    />
  )
}
