export async function analyzeFrame(blob: Blob) {
    const formData = new FormData()

    formData.append('file', blob, 'frame.jpg')

    const response = await fetch(
        'http://127.0.0.1:8000/analyze',
        {
            method: 'POST',
            body: formData,
        }
    )

    return response.json()
}