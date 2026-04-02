#!/usr/bin/env python3
"""Generate atmospheric hero images for Argumend topics using Gemini."""

import os
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

# Define topics and their visual prompts
topics = [
    {
        "id": "moon-landing",
        "prompt": """Create an atmospheric, artistic visualization of the Moon landing legacy.
        Show a dramatic view of Earth rising over the lunar horizon, with subtle hints of human achievement -
        perhaps distant footprints or the gentle curve of a spacecraft. Use a warm golden hour color palette
        with deep space blues. Style: cinematic, contemplative, awe-inspiring. Photo-realistic quality with
        artistic lighting. No text."""
    },
    {
        "id": "simulation-hypothesis",
        "prompt": """Create an ethereal, philosophical visualization of reality as a simulation.
        Abstract digital particles dissolving into code, reality fragmenting into geometric patterns.
        Deep purples and electric blues with hints of copper and gold. Matrix-inspired but more elegant
        and contemplative. Suggests the boundary between real and simulated. Style: abstract digital art,
        cinematic, mysterious. No text."""
    },
    {
        "id": "ai-risk",
        "prompt": """Create a thought-provoking visualization of artificial general intelligence.
        An abstract neural network forming into something vast and unknowable, circuits and light
        forming patterns that suggest both intelligence and uncertainty. Warm copper tones transitioning
        to cool technological blues. Neither utopian nor dystopian - genuinely uncertain.
        Style: abstract technological art, contemplative, sublime. No text."""
    },
    {
        "id": "free-will",
        "prompt": """Create a philosophical visualization of the free will debate.
        Branching paths and decision trees rendered in an abstract, organic style.
        Neural pathways interweaving with paths through a landscape. Warm earthy tones -
        sepia, copper, gold - suggesting the ancient nature of the question.
        Style: abstract philosophical art, contemplative, elegant. No text."""
    },
    {
        "id": "climate-change",
        "prompt": """Create a striking visualization of Earth's climate system.
        Dramatic atmospheric layers, ocean currents rendered as flowing ribbons of color,
        the delicate balance of planetary systems. Deep ocean blues, atmospheric whites,
        with warming copper and gold tones suggesting both beauty and urgency.
        Style: scientific visualization meets fine art, sublime, powerful. No text."""
    },
]

output_dir = "/Users/amirjalali/argumend/public/images/topics"

for topic in topics:
    print(f"Generating image for: {topic['id']}...")

    try:
        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[topic["prompt"]],
            config=types.GenerateContentConfig(
                response_modalities=['TEXT', 'IMAGE'],
                image_config=types.ImageConfig(
                    aspect_ratio="16:9",
                    image_size="2K"
                ),
            ),
        )

        for part in response.parts:
            if part.inline_data:
                image = part.as_image()
                output_path = f"{output_dir}/{topic['id']}.jpg"
                image.save(output_path)
                print(f"  Saved: {output_path}")
            elif part.text:
                print(f"  Response text: {part.text[:100]}...")

    except Exception as e:
        print(f"  Error generating {topic['id']}: {e}")

print("\nDone generating topic images!")
