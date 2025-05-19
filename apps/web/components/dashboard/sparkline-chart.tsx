"use client"

import { useEffect, useRef } from "react"

interface SparklineChartProps {
  data: number[]
  color: string
  height?: number
}

export function SparklineChart({ data, color, height = 40 }: SparklineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, height)

    // Find min and max values
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    // Calculate points
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * rect.width,
      y: height - ((value - min) / range) * (height * 0.8) - height * 0.1,
    }))

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = color
    ctx.stroke()

    // Draw area under the line
    ctx.lineTo(points[points.length - 1].x, height)
    ctx.lineTo(points[0].x, height)
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, `${color}40`)
    gradient.addColorStop(1, `${color}00`)
    ctx.fillStyle = gradient
    ctx.fill()
  }, [data, color, height])

  return <canvas ref={canvasRef} style={{ width: "100%", height: `${height}px` }} />
}
