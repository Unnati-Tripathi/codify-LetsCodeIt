import React from 'react';
import CodeEditor from './CodeEditor';
import OutputTerminal from './OutputTerminal';

const CompilerEditor = ({ projectType, code, setCode, terminal, setTerminal, handleRun, isLightMode }) => {
  return (
    <div className="flex w-full">
      <div className="left w-1/2 border-r border-white/10">
        <div className={`tabs flex justify-between items-center h-[50px] px-10 ${isLightMode ? 'bg-gray-200' : 'bg-[#1A1919]'}`}>
          <span className="uppercase text-blue-500 font-black tracking-widest">{projectType}</span>
          <button 
            onClick={handleRun} 
            className="bg-blue-600 hover:bg-blue-500 px-6 py-1 rounded text-xs font-black text-white active:scale-95 transition-all"
          >
            {terminal.isRunning ? "..." : "RUN"}
          </button>
        </div>
        <CodeEditor 
          theme={isLightMode ? 'vs-light' : 'vs-dark'}
          language={projectType === "cpp" ? "cpp" : "java"}
          value={code}
          onChange={setCode}
        />
      </div>
      <div className="right w-1/2 h-[83vh]">
        <OutputTerminal 
          isLightMode={isLightMode}
          userInput={terminal.input} 
          setUserInput={(v) => setTerminal(prev => ({ ...prev, input: v }))} 
          output={terminal.output} 
        />
      </div>
    </div>
  );
};

export default CompilerEditor;
