import React from 'react';
import Plot from 'react-plotly.js';

export default function Plot3D({ data }) {
  if (!data || !data.x) return null;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            z: data.z,
            type: 'surface',
            colorscale: 'Jet',
            showscale: false
          }
        ]}
        layout={{
          width: 800,
          height: 600,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: {
            xaxis: { showbackground: false, color: '#888', gridcolor: '#222', zerolinecolor: '#444' },
            yaxis: { showbackground: false, color: '#888', gridcolor: '#222', zerolinecolor: '#444' },
            zaxis: { showbackground: false, color: '#888', gridcolor: '#222', zerolinecolor: '#444' },
            bgcolor: 'rgba(0,0,0,0)'
          }
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}