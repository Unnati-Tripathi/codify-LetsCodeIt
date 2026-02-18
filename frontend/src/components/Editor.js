import React, { useState } from 'react';
import { executeCode, getResults } from '../services/compiler';

const Editor = () => {
    const [code, setCode] = useState(""); 
    const [language, setLanguage] = useState(54); 
    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        setOutput("Running...");
        
        const token = await executeCode(code, language, userInput);
        
        if (token) {
            pollStatus(token);
        } else {
            setOutput("Error submitting code.");
            setLoading(false);
        }
    };

    const pollStatus = async (token) => {
        const result = await getResults(token);
        
        if (result.status.id <= 2) {
            setTimeout(() => pollStatus(token), 1000);
            return;
        }

        setLoading(false);
        
        const standardOutput = result.stdout ? atob(result.stdout) : "";
        const compileErrors = result.compile_output ? atob(result.compile_output) : "";
        const runtimeErrors = result.stderr ? atob(result.stderr) : "";

        if (compileErrors || runtimeErrors) {
            setOutput(`--- DEBUG LOGS ---\n${compileErrors}${runtimeErrors}`);
        } else {
            setOutput(standardOutput || "Program executed successfully.");
        }
    };

    return (
        <div className="editor-container">
            <div className="toolbar">
                <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                    <option value="54">C++</option>
                    <option value="62">Java</option>
                    <option value="63">JavaScript</option>
                </select>
                <button onClick={handleRun} disabled={loading}>
                    {loading ? "Running..." : "Run Code"}
                </button>
                <button onClick={() => setShowInput(!showInput)}>
                    {showInput ? "Hide Input" : "Show Input"}
                </button>
            </div>

            <textarea 
                className="code-area"
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Write your code here..."
            />

            <div className="terminal">
                {showInput && (
                    <textarea 
                        className="input-box"
                        placeholder="Enter your program input (stdin) here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                )}
                <div className="output-box">
                    <strong>Console:</strong>
                    <pre style={{ color: output.includes("DEBUG") ? "#ff5555" : "#fff" }}>
                        {output}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Editor;
