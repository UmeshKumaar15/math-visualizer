from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm_manager import process_math_prompt
from math_engine import calculate_surface
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserPrompt(BaseModel):
    prompt: str

@app.post("/api/visualize")
async def generate_visualization(request: UserPrompt):
    result = process_math_prompt(request.prompt)
    
    if result['category'] == 'error':
        return {"success": False, "error": result['error_message']}
        
    try:
        # Pass the new parametric parameters to the engine
        x, y, z = calculate_surface(
            category=result['category'],
            code_z=result.get('numpy_code_z'),
            code_x=result.get('numpy_code_x'),
            code_y=result.get('numpy_code_y')
        )
        
        # Format a clean string to display in the React UI
        if result['category'] == 'parametric':
            display_formula = f"Parametric [X, Y, Z]"
        else:
            display_formula = result['numpy_code_z']

        return {
            "success": True, 
            "formula": result.get('latex_formula', 'No formula generated'), # Changed this line
            "x": x, 
            "y": y, 
            "z": z
        }
    except Exception as e:
         return {"success": False, "error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)