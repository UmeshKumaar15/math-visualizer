# Math Visualizer 🌌

A premium, consumer-grade interactive 3D mathematical graphing application inspired by the sleek, minimalist aesthetic of Gemini. Built using a decoupled modern web architecture, this tool translates natural language intent, standard algebraic equations, and complex parametric surfaces into vibrant, rotatable 3D visualizations in a fluid, lag-free environment.

---
Give a try! - https://math-visualizer-ui.onrender.com/
---

## ✨ Features

* **Gemini-Style Minimalist UI:** An absolute pitch-black workspace (`#000000`) paired with a custom ambient radial background glow to provide a premium user experience.
* **Natural Language Expression Parsing:** Powered by the Google Gemini 1.5/2.5 Flash models to interpret conversational human prompts into execution-ready Python code.
* **Dual Plotting Modalities:**
    * **Standard Surface Heightmaps:** Evaluates structural mathematical formulations where `z = f(x, y)`.
    * **Complex Parametric Shapes:** Dynamically scales to evaluate non-functional topologies (e.g., hearts, spheres, donuts) utilizing multi-variable coordinate spaces (`u`, `v`).
* **Rigorous Textbook Math Rendering:** Integrates a high-performance **KaTeX** rendering engine to beautifully output actual structural LaTeX math above the canvas instead of messy computer-science code.
* **High-Fidelity 360° Rotations:** Employs `react-plotly.js` leveraging local hardware GPU acceleration for smooth, drag-to-rotate interactions with a vibrant `Jet` color scheme.
* **Graceful Intent Filtering & Error Interception:** Automatically screens out requests for non-mathematical entities (like CAD models of cars or houses) or invalid syntax, rendering clean fallback instructions without crashing the execution loop.
* **Session State Sidebar History:** Keeps past iterations readily accessible in a dedicated left-hand history pane, mimicking modern conversational AI tools.

---

## 🏗️ Architecture & Data Flow

This application is decoupled to separate heavy mathematical processing from UI rendering:

    [ Frontend: React / Vite ] ──(User Input)──> [ Backend: FastAPI ]
                ▲                                         │
        (JSON: X, Y, Z + LaTeX)                      (Gemini API)
                │                                         ▼
                └───────────(NumPy Grid Evaluation)◄──────┘

1.  **React Frontend:** Captures natural language string input from a floating, unified input bar.
2.  **FastAPI Backend:** Queries the Gemini API utilizing strict Pydantic schemas to output structural JSON payloads mapping out the coordinate spaces and mathematical categories.
3.  **NumPy Processing Engine:** Evaluates numerical matrices cleanly through restricted execution sandboxes to isolate and eliminate system code-injection vulnerabilities.
4.  **Plotly Rendering Workspace:** Returns native list coordinates straight to the browser DOM, where Plotly processes coordinates directly on the canvas grid lines.

---

## 📥 Getting Started

### Prerequisites
* Python 3.10 or higher
* Node.js 18 or higher (Vite 5 runtime)
* A Gemini API Key from Google AI Studio

### 1. Setting Up the Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```text
GEMINI_API_KEY=your_actual_api_key_here
```

Launch the Python ASGI server:

```bash
python3 main.py
```

### 2. Setting Up the Frontend
Open a separate terminal window:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```text
VITE_API_URL=http://localhost:8000
```

Launch the Vite React application:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🧪 Test Input Examples

Paste these sample inputs directly into the floating bottom chat bar to test various operational capabilities of the tool:

### Standard Mathematics (`z = f(x, y)`)
* `sin(sqrt(x^2 + y^2))` (The iconic Sombrero ripple function)
* `x^2 - y^2` (Hyperbolic Paraboloid / Saddle curve)
* `cos(x) * sin(y)` (Egg-carton terrain grid)

### Conversational/Natural Language
* `Show me a 3D ripple effect originating from the center.`
* `Give me a 3D bowl shape opening upwards.`
* `Visualize a localized wave that flattens out at the edges.`

### Advanced Parametric Shapes (Multi-variable `u`, `v`)
* `Plot a 3D heart` (Triggers complex trigonometric parametric boundaries mapping out a solid heart)
* `Show me a 3D torus` (Renders a mathematical donut topology)
* `Plot a spherical globe`

### Error Rejections & Boundaries
* `Plot a 3D sports car` (Tests the application's clean rejection engine; will notify you that it can only map geometric mathematical equations, not CAD models)
* `How is the weather today?` (Intercepts conversational non-math queries safely)

---

## 🛠️ Stack Components

* **Frontend UI Framework:** React (Vite 5), Tailwind CSS, Lucide Icons
* **Visualization Engine:** Plotly.js (`react-plotly.js`)
* **Typography & Math Notation:** KaTeX (`react-katex`)
* **Backend Server:** FastAPI, Uvicorn
* **AI Translation Layer:** Google GenAI SDK (Pydantic Structured Output Mode)
* **Math Computations:** NumPy

---

## 📄 License

This project is open-source and available under the MIT License.
