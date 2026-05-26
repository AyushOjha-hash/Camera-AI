export async function analyzeFrame(blob: Blob) {
    const formData = new FormData()

    formData.append('file', blob, 'frame.jpg')

    const response = await fetch(
        'https://unmanufacturable-jodie-uncarted.ngrok-free.dev/analyze',
        {
            method: 'POST',
            body: formData,
        }
    )

    return response.json()
}