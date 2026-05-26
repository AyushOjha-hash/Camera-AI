'use client'

import Webcam from 'react-webcam'
import { useEffect, useRef } from 'react'

interface Props {
    onCapture: (blob: Blob) => void
}

export default function Camera({ onCapture }: Props) {
    const webcamRef = useRef<Webcam>(null)

    useEffect(() => {
        const interval = setInterval(async () => {
            if (!webcamRef.current) return

            const screenshot = webcamRef.current.getScreenshot()

            if (!screenshot) return

            const response = await fetch(screenshot)
            const blob = await response.blob()

            onCapture(blob)

        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full">
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-2xl shadow-xl w-full"
            />
        </div>
    )
}