import numpy as np

def calculate_surface(category: str, code_z: str, code_x: str = None, code_y: str = None, grid_size: int = 60):
    try:
        if category == 'parametric':
            # Parametric math typically uses angles (u, v) from 0 to 2*Pi
            u_vals = np.linspace(0, 2 * np.pi, grid_size)
            v_vals = np.linspace(0, 2 * np.pi, grid_size)
            u, v = np.meshgrid(u_vals, v_vals)
            
            safe_env = {"np": np, "u": u, "v": v}
            
            # Execute all three dimensions simultaneously
            x = eval(compile(code_x, "<string>", "eval"), {"__builtins__": {}}, safe_env)
            y = eval(compile(code_y, "<string>", "eval"), {"__builtins__": {}}, safe_env)
            z = eval(compile(code_z, "<string>", "eval"), {"__builtins__": {}}, safe_env)
            
        else:
            # Standard Heightmap (uses x, y spatial coordinates)
            bounds = 15.0
            x_vals = np.linspace(-bounds, bounds, grid_size)
            y_vals = np.linspace(-bounds, bounds, grid_size)
            x, y = np.meshgrid(x_vals, y_vals)
            
            safe_env = {"np": np, "x": x, "y": y}
            z = eval(compile(code_z, "<string>", "eval"), {"__builtins__": {}}, safe_env)
            
            # Extrude 2D lines into 3D surfaces
            if np.isscalar(z) or z.shape != x.shape:
                z = np.broadcast_to(z, x.shape)
                
        # Convert all to lists for FastAPI JSON delivery
        return x.tolist(), y.tolist(), z.tolist()
    
    except Exception as e:
        raise ValueError(f"Math engine execution failed. Check formula validity.")