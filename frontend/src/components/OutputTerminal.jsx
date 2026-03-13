import React from 'react';

const OutputTerminal = ({ userInput, setUserInput, output, isLightMode }) => {
  return (
    <div
      className={`flex flex-col h-full p-5 transition-all duration-300
      ${
        isLightMode
          ? "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-800"
          : "bg-gradient-to-br from-[#0b0b0b] via-[#121212] to-[#1a1a1a] text-white"
      }`}
    >
      <div className="h-1/3 mb-5">
        <p
          className={`text-xs font-semibold mb-2 uppercase tracking-wider
          ${isLightMode ? "text-gray-600" : "text-gray-400"}`}
        >
          Input (stdin)
        </p>

        <textarea
          className={`w-full h-full p-4 font-mono text-sm border rounded-lg outline-none resize-none transition-all duration-200 shadow-sm
          ${
            isLightMode
              ? "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              : "bg-[#141414] border-white/10 text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          }`}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type inputs here..."
        />
      </div>

      <div
        className={`h-2/3 border-t pt-4 transition-all duration-300
        ${isLightMode ? "border-gray-300" : "border-white/10"}`}
      >
        <p
          className={`text-xs font-semibold mb-2 uppercase tracking-wider
          ${isLightMode ? "text-gray-600" : "text-gray-400"}`}
        >
          Output
        </p>

        <pre
          className={`p-4 font-mono text-sm h-full overflow-y-auto rounded-lg whitespace-pre-wrap transition-all duration-200 shadow-inner
          ${
            isLightMode
              ? "bg-white text-blue-700 border border-gray-300"
              : "bg-[#0f0f0f] text-green-400 border border-white/5"
          }`}
        >
          {output || "Run code to see output..."}
        </pre>
      </div>
    </div>
  );
};

export default OutputTerminal;








