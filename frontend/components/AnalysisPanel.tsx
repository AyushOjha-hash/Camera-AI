interface Props {
    analysis: string
    detections: string[]
}

export default function AnalysisPanel({
    analysis,
    detections,
}: Props) {
    return (
        <div className="bg-black text-white p-6 rounded-2xl shadow-xl h-full">

            <h2 className="text-2xl font-bold mb-6">
                AI Scene Understanding
            </h2>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                    Important Objects
                </h3>

                <div className="flex flex-wrap gap-2">
                    {detections.map((d, i) => (
                        <div
                            key={i}
                            className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">
                    Live Description
                </h3>

                <div className="bg-gray-900 p-4 rounded-xl text-gray-200 leading-relaxed min-h-[150px]">
                    {analysis}
                </div>
            </div>
        </div>
    )
}