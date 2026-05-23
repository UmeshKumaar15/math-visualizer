import os
from google import genai
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

class MathResponse(BaseModel):
    category: str = Field(description="Categorize as '2d', '3d', 'parametric', or 'error'.")
    numpy_code_z: str | None = Field(description="Formula for Z in standard plots (uses x, y) OR Z in parametric (uses u, v).")
    numpy_code_x: str | None = Field(description="Formula for X in parametric plots (uses u, v). Null otherwise.")
    numpy_code_y: str | None = Field(description="Formula for Y in parametric plots (uses u, v). Null otherwise.")
    latex_formula: str | None = Field(description="A clean, human-readable LaTeX representation of the equation(s). Do NOT wrap in $ or $$.")
    error_message: str | None = Field(description="Error message if input is not math or cannot be plotted.")

def process_math_prompt(prompt: str) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"category": "error", "error_message": "Server missing API Key."}
        
    client = genai.Client(api_key=api_key)
    
    system_instruction = """
    You are an elite 3D mathematical parser. Translate the user's intent into programmatic NumPy expression strings AND a readable LaTeX string.
    Rules:
    1. For standard 3D/2D plots: Output category '3d'. Use variables 'x' and 'y'.
    2. For parametric shapes (hearts, spheres, torus): Output category 'parametric'. Use variables 'u' and 'v'. Provide numpy formulas for X, Y, and Z.
    3. Use 'np.' for all mathematical operations in the numpy codes.
    4. LATEX FORMULA: Always provide a beautifully formatted LaTeX string in 'latex_formula'. For parametric, format as 'x=..., y=..., z=...'. Do NOT use 'np.' in the LaTeX. Do NOT use $ or $$ delimiters.
    5. NON-MATH REJECTION: If a user asks for a physical 3D mesh object (like a car), output category 'error'.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=system_instruction + "\nUser Input: " + prompt,
            config={'response_mime_type': 'application/json', 'response_schema': MathResponse}
        )
        parsed = response.parsed
        return {
            "category": parsed.category.lower(), 
            "numpy_code_z": parsed.numpy_code_z,
            "numpy_code_x": parsed.numpy_code_x,
            "numpy_code_y": parsed.numpy_code_y,
            "latex_formula": parsed.latex_formula,
            "error_message": parsed.error_message
        }
    except Exception as e:
        return {"category": "error", "error_message": f"LLM parsing failed: {str(e)}"}