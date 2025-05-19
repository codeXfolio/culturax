"use client"

import { useEffect, useRef } from "react"

interface SubscriberChartProps {
  fullSize?: boolean
}

export function SubscriberChart({ fullSize = false }: SubscriberChartProps) {
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
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Sample data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const data = [120, 135, 150, 175, 190, 205, 215, 225, 235, 245, 255, 265]

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const padding = fullSize ? 40 : 10
    const graphWidth = chartWidth - padding * 2
    const graphHeight = chartHeight - padding * 2

    // Draw axes if fullSize
    if (fullSize) {
      // X-axis
      ctx.beginPath()
      ctx.moveTo(padding, chartHeight - padding)
      ctx.lineTo(chartWidth - padding, chartHeight - padding)
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 1
      ctx.stroke()

      // Y-axis
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, chartHeight - padding)
      ctx.stroke()

      // X-axis labels
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillStyle = "#94a3b8"
      ctx.font = "10px sans-serif"

      months.forEach((month, i) => {
        const x = padding + i * (graphWidth / (months.length - 1))
        ctx.fillText(month, x, chartHeight - padding + 10)
      })

      // Y-axis labels
      const maxValue = Math.max(...data)
      const minValue = Math.min(...data)
      const valueRange = maxValue - minValue

      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      for (let i = 0; i <= 4; i++) {
        const value = minValue + valueRange * (i / 4)
        const y = chartHeight - padding - i * (graphHeight / 4)
        ctx.fillText(Math.round(value).toString(), padding - 10, y)
      }
    }

    // Calculate points
    const points = data.map((value, index) => ({
      x: padding + index * (graphWidth / (data.length - 1)),
      y: chartHeight - padding - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * graphHeight,
    }))

    // Draw line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = "#8b5cf6"
    ctx.stroke()

    // Draw area under the line
    ctx.lineTo(points[points.length - 1].x, chartHeight - padding)
    ctx.lineTo(points[0].x, chartHeight - padding)
    ctx.closePath()
    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight)
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)")
    gradient.addColorStop(1, "rgba(139, 92, 246, 0.0)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw points
    if (fullSize) {
      points.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#8b5cf6"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }
  }, [fullSize])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
