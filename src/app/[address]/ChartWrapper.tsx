"use client"
import { useState } from "react"
import { ChartComponent } from "./ChartComponent"
import { AccountTimeData } from "@/api"

export default function ChartWrapper({ data }: { data: { hourData: AccountTimeData[], dayData: AccountTimeData[] } }) {
  const [zoom, setZoom] = useState("hour")

  return (
    <div>
      <div>
        <button onClick={() => setZoom("hour")} disabled={zoom === 'hour'}>Hour</button>
        <button onClick={() => setZoom("day")} disabled={zoom === 'day'}>Day</button>
      </div>
      <ChartComponent data={zoom === 'hour' ? data.hourData : data.dayData} />
    </div>
  )
}