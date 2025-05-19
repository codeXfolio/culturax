"use client"

import { useEffect, useRef } from "react"

interface EngagementChartProps {
  fullSize?: boolean
}

export function EngagementChart({ fullSize = false }: EngagementChartProps) {
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
    const viewsData = [1200, 1500, 1800, 2100, 1900, 2200, 2400, 2600, 2800, 3000, 3200, 3400]
    const likesData = [300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850]
    const commentsData = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]

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
      const maxValue = Math.max(...viewsData)

      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      for (let i = 0; i <= 4; i++) {
        const value = maxValue * (i / 4)
        const y = chartHeight - padding - i * (graphHeight / 4)
        ctx.fillText(Math.round(value).toString(), padding - 10, y)
      }

      // Legend
      const legendX = chartWidth - 100
      const legendY = padding + 10

      // Views legend
      ctx.beginPath()
      ctx.arc(legendX + 6, legendY + 6, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#10b981"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(legendX - 5, legendY + 6)
      ctx.lineTo(legendX + 17, legendY + 6)
      ctx.strokeStyle = "#10b981"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.textAlign = "left"
      ctx.fillStyle = "#94a3b8"
      ctx.fillText("Views", legendX + 20, legendY + 6)

      // Likes legend
      ctx.beginPath()
      ctx.arc(legendX + 6, legendY + 26, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(legendX - 5, legendY + 26)
      ctx.lineTo(legendX + 17, legendY + 26)
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillText("Likes", legendX + 20, legendY + 26)

      // Comments legend
      ctx.beginPath()
      ctx.arc(legendX + 6, legendY + 46, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#8b5cf6"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(legendX - 5, legendY + 46)
      ctx.lineTo(legendX + 17, legendY + 46)
      ctx.strokeStyle = "#8b5cf6"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillText("Comments", legendX + 20, legendY + 46)
    }

    // Calculate points for views
    const viewsPoints = viewsData.map((value, index) => ({
      x: padding + index * (graphWidth / (viewsData.length - 1)),
      y: chartHeight - padding - (value / Math.max(...viewsData)) * graphHeight,
    }))

    // Calculate points for likes
    const likesPoints = likesData.map((value, index) => ({
      x: padding + index * (graphWidth / (likesData.length - 1)),
      y: chartHeight - padding - (value / Math.max(...viewsData)) * graphHeight,
    }))

    // Calculate points for comments
    const commentsPoints = commentsData.map((value, index) => ({
      x: padding + index * (graphWidth / (commentsData.length - 1)),
      y: chartHeight - padding - (value / Math.max(...viewsData)) * graphHeight,
    }))

    // Draw views line
    ctx.beginPath()
    ctx.moveTo(viewsPoints[0].x, viewsPoints[0].y)
    for (let i = 1; i < viewsPoints.length; i++) {
      ctx.lineTo(viewsPoints[i].x, viewsPoints[i].y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = "#10b981"
    ctx.stroke()

    // Draw likes line
    ctx.beginPath()
    ctx.moveTo(likesPoints[0].x, likesPoints[0].y)
    for (let i = 1; i < likesPoints.length; i++) {
      ctx.lineTo(likesPoints[i].x, likesPoints[i].y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = "#3b82f6"
    ctx.stroke()

    // Draw comments line
    ctx.beginPath()
    ctx.moveTo(commentsPoints[0].x, commentsPoints[0].y)
    for (let i = 1; i < commentsPoints.length; i++) {
      ctx.lineTo(commentsPoints[i].x, commentsPoints[i].y)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = "#8b5cf6"
    ctx.stroke()

    // Draw points if fullSize
    if (fullSize) {
      // Views points
      viewsPoints.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#10b981"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Likes points
      likesPoints.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#3b82f6"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Comments points
      commentsPoints.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "#8b5cf6"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }
  }, [fullSize])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
