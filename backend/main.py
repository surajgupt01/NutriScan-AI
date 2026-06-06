# main.py

from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    prompt: str




ai_client = genai.Client()    

@app.get("/")
def root():
    return {"message": "Hello World"}


@app.post('/scan/')
async def scan(request : ScanRequest):
    try:
        # Call the Gemini API via the modern SDK client
        response = ai_client.models.generate_content(
            model='gemini-3.5-flash', # Recommended model for general text tasks
            contents=request.prompt,
        )
        
        # Return the structured response
        return {"response": response.text}
        
    except Exception as e:
        # Handle exceptions gracefully and return an HTTP 500 error
        raise HTTPException(status_code=500, detail=str(e))
    return{"your prompt" : data.prompt}
