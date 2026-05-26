import requests
import base64

# Simple rolling memory
previous_context = ""


def analyze_image(image_path, detections):

    global previous_context

    # Convert image to base64
    with open(image_path, "rb") as img:
        image_base64 = base64.b64encode(img.read()).decode("utf-8")

    prompt = f"""
You are watching a live camera feed.

Previous scene context:
{previous_context}

Visible objects:
{detections}

Describe only the important things happening in this scene.

Focus on:
- human activities
- interactions
- meaningful actions
- important objects
- scene changes

Ignore tiny background details.

Rules:
- Keep response under 50 words
- Be natural and conversational
- Be highly accurate
- Do not hallucinate
- Do not repeat obvious detections
- Prioritize what matters most visually

Respond like an intelligent visual assistant.
"""

    try:

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "qwen2.5vl:7b",
                "prompt": prompt,
                "images": [image_base64],
                "stream": False,
                "options": {
                    "temperature": 0.2
                }
            }
        )

        data = response.json()

        analysis = data.get("response", "").strip()

        # Update memory
        previous_context = analysis

        return analysis

    except Exception as e:
        return f"Error during analysis: {str(e)}"