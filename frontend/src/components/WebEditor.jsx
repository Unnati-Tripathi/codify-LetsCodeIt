import React, { useMemo } from 'react';
import CodeEditor from './CodeEditor';

const WebEditor = ({ codes, setCodes, tab, setTab, isLightMode }) => {
  
  
const srcDoc = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>${codes.css}</style>
    </head>
    <body>
      ${codes.html}
      <script>
        // We inject the code directly, NO <script src="..."> tags allowed here
        ${codes.js}
      </script>
    </body>
  </html>
`;

  return (
    <div className="flex w-full">
      <div className="left w-1/2 border-r border-white/10">
        <div className={`tabs flex gap-2 items-center h-[50px] px-10 ${isLightMode ? 'bg-gray-200' : 'bg-[#1A1919]'}`}>
          {['html', 'css', 'js'].map(t => (
            <button 
              key={t} 
              onClick={() => setTab(t)} 
              className={`p-2 uppercase text-xs font-bold transition-all ${
                tab === t 
                ? (isLightMode ? "bg-white text-blue-600 shadow-sm" : "bg-[#333] text-white") 
                : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <CodeEditor 
          theme={isLightMode ? 'vs-light' : 'vs-dark'}
          language={tab === 'js' ? 'javascript' : tab}
          value={codes[tab]}
          onChange={(v) => setCodes(prev => ({ ...prev, [tab]: v }))}
        />
      </div>

      <div className="right w-1/2 h-[83vh] bg-white">
        <iframe 
          id="preview-iframe"
          title="preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts" 
          className="w-full h-full bg-white"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default WebEditor;