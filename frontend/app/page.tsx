'use client'

import { useState } from 'react'

import Camera from '@/components/Camera'
import AnalysisPanel from '@/components/AnalysisPanel'
import { analyzeFrame } from '@/services/api'

export default function Home() {

  const [analysis, setAnalysis] = useState(
    'Waiting for live scene analysis...'
  )

  const [detections, setDetections] = useState<string[]>([])

  async function handleCapture(blob: Blob) {

    try {

      const data = await analyzeFrame(blob)

      setAnalysis(data.analysis)
      setDetections(data.detections)

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Local AI Camera Assistant
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Camera onCapture={handleCapture} />

        <AnalysisPanel
          analysis={analysis}
          detections={detections}
        />

      </div>

    </main>
  )
}