"use client"

import { useEffect, useRef } from "react"

interface RevenueChartProps {
  fullSize?: boolean
}

export function RevenueChart({ fullSize = false }: RevenueChartProps) {
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
    const subscriptionData = [800, 950, 1100, 1250, 1400, 1550, 1700, 1850, 2000, 2150, 2300, 2450]
    const nftData = [200, 300, 150, 400, 250, 350, 200, 300, 250, 400, 350, 400]

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
      const totalData = subscriptionData.map((val, i) => val + nftData[i])
      const maxValue = Math.max(...totalData)

      ctx.textAlign = "right"
      ctx.textBaseline = "middle"

      for (let i = 0; i <= 4; i++) {
        const value = maxValue * (i / 4)
        const y = chartHeight - padding - i * (graphHeight / 4)
        ctx.fillText("$" + Math.round(value).toString(), padding - 10, y)
      }

      // Legend
      const legendX = chartWidth - 120
      const legendY = padding + 10

      // Subscription legend
      ctx.beginPath()
      ctx.rect(legendX, legendY, 12, 12)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()

      ctx.textAlign = "left"
      ctx.fillStyle = "#94a3b8"
      ctx.fillText("Subscriptions", legendX + 20, legendY + 6)

      // NFT legend
      ctx.beginPath()
      ctx.rect(legendX, legendY + 20, 12, 12)
      ctx.fillStyle = "#8b5cf6"
      ctx.fill()

      ctx.fillText("NFT Sales", legendX + 20, legendY + 26)
    }

    // Calculate max value for scaling
    const totalData = subscriptionData.map((val, i) => val + nftData[i])
    const maxValue = Math.max(...totalData)

    // Draw bars
    const barWidth = (graphWidth / months.length) * 0.7
    const barSpacing = (graphWidth / months.length) * 0.3

    for (let i = 0; i < months.length; i++) {
      const x = padding + i * (graphWidth / months.length) + barSpacing / 2

      // Subscription bar
      const subHeight = (subscriptionData[i] / maxValue) * graphHeight
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, chartHeight - padding - subHeight, barWidth, subHeight)

      // NFT bar
      const nftHeight = (nftData[i] / maxValue) * graphHeight
      ctx.fillStyle = "#8b5cf6"
      ctx.fillRect(x, chartHeight - padding - subHeight - nftHeight, barWidth, nftHeight)
    }
  }, [fullSize])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
}
