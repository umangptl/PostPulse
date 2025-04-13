from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import google.generativeai as genai
import os
import re
import uvicorn
import logging
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO)
# Load env
load_dotenv()

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel('gemini-2.0-flash')

# Initialize FastAPI
app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Request model
class GenerateRequest(BaseModel):
    prompt: str
    tone: str
    word_count: int
    hashtags: bool
    emoji: bool
    post_count: int

@app.get("/")
def serve_home():
    return FileResponse("static/index.html")

@app.post("/generate")
async def generate_post(data: GenerateRequest):
    logging.info(f"Received prompt: {data.prompt}")
    logging.info(
        f"Tone: {data.tone}, Words: {data.word_count}, Hashtags: {data.hashtags}, Emoji: {data.emoji}, Posts: {data.post_count}")
    # Build prompt
    hashtags_text = "Include trending and relevant hashtags." if data.hashtags else "Do not include hashtags."
    emoji_text = "Use emojis to make the post engaging." if data.emoji else "Do not include emojis."

    # System prompt to instruct Gemini clearly
    system_instruction = (
        f"You are an expert social media post generator. "
        f"Your task is to generate engaging, creative social media posts based on user input. "
        f"Each post should be clearly marked as list 1. 2. 3. ..."
        f"Do not include any introductory text or explanations, only the list of posts. "
        f"Always write in a {data.tone.lower()} tone. "
        f"Target length is about {data.word_count} words. "
        f"{hashtags_text} "
        f"{emoji_text} "
        f"Generate {data.post_count} unique variations."
    )

    final_prompt = f"{system_instruction}\n\nUser input: {data.prompt}\n\nGenerate the posts below:\n"
    logging.info(f"🔍 Final Prompt sent to Gemini:\n{final_prompt}")

    try:
        response = model.generate_content(final_prompt)

        logging.info("✅ Raw Gemini Response:")
        logging.info(response)

        text = response.text

        logging.info(f"📄 Gemini Text Response:\n{text}")

        # Regex to match lines starting with numbers (e.g., "1. ")
        pattern = r'^\d+\.\s+'

        # Split into lines
        lines = text.strip().split('\n')

        # Filter only lines that look like numbered posts
        posts = [re.sub(pattern, '', line.strip()) for line in lines if re.match(pattern, line.strip())]
        posts = posts[:data.post_count]

        logging.info(f"🚀 Posts parsed to frontend: {posts}")

        return {"posts": posts}
    except Exception as e:
        logging.error(f"❌ Error during generation: {str(e)}")
        return {"error": str(e)}

# Run the app (for development)
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
