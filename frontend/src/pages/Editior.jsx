import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api_based_url } from '../helper';

import EditorNavbar from '../components/EditorNavbar';
import CodeEditor from '../components/CodeEditor';
import WebEditor from '../components/WebEditor';
import OutputTerminal from '../components/OutputTerminal';

import { MdOutlineLightMode } from "react-icons/md";
import { BiExpand } from "react-icons/bi";
import { FiDownload } from "react-icons/fi";


const themeStyles = {
  dark: {
    bg: "bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#1c1c1c]",
    text: "text-white",
    surface: "bg-[#1a1919]",
    border: "border-white/10",
    editor: "vs-dark"
  },
  light: {
    bg: "bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200",
    text: "text-gray-800",
    surface: "bg-white/70 backdrop-blur-md",
    border: "border-gray-300",
    editor: "vs-light"
  }
};


const BOILERPLATE = {
  cpp: "#include <iostream>\nusing namespace std ;\n\nint main() {\n    cout << \"Hello World!\";\n    return 0;\n}",
  java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}",
  html: "<h1>Hello World</h1>",
  css: "body {\n  background-color: aqua;\n}",
  js: "console.log('Hello World');"
};

export default function EditorPage() {
  const { projectID } = useParams();

  const [projectType, setProjectType] = useState("html");
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
  const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

  const s = isLightMode ? themeStyles.light : themeStyles.dark;

    useEffect(() => {
    fetchProject();
  }, [projectID]);

  const fetchProject = async () => {
    try {
      const res = await axios.post(`${api_based_url}/getProject`, {
        userId: localStorage.getItem("userId"),
        projId: projectID,
      });

      const proj = res.data.project;
      const type = proj.projectType || "html";
      setProjectType(type);

      setCodes({
        html: proj.htmlCode || BOILERPLATE.html,
        css: proj.cssCode || BOILERPLATE.css,
        js: proj.jsCode || BOILERPLATE.js,
        main: proj.code || (type === "cpp" ? BOILERPLATE.cpp : BOILERPLATE.java)
      });

    } catch (err) {
      console.error("Fetch error", err);
    }
  };


  const handleSave = useCallback(async () => {
    const isWeb = projectType === "html";
    const endpoint = isWeb ? "/saveWebProject" : "/saveCompilerProject";

    const payload = isWeb
      ? {
        userId: localStorage.getItem("userId"),
        projId: projectID,
        htmlCode: codes.html,
        cssCode: codes.css,
        jsCode: codes.js
      }
      : {
        userId: localStorage.getItem("userId"),
        projId: projectID,
        code: codes.main
      };

    try {
      const res = await axios.post(`${api_based_url}${endpoint}`, payload);
      if (res.data.success) alert("Project saved successfully!");
    } catch (err) {
      console.error("Save error", err);
      alert("Failed to save project");
    }
  }, [codes, projectID, projectType]);


  const handleDownload = () => {
    let content = "";
    let filename = "";

    if (projectType === "html") {
      content = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Codify Project</title>
<style>
${codes.css}
</style>
</head>
<body>
${codes.html}
<script>
${codes.js}
</script>
</body>
</html>`;
      filename = "project.html";
    } else {
      content = codes.main;
      filename = projectType === "cpp" ? "main.cpp" : "Main.java";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);


  const handleRunCompiler = async () => {
    try {
      setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));

      const res = await axios.post(`${api_based_url}/compiler/run`, {
        code: btoa(unescape(encodeURIComponent(codes.main))),
        language_id: projectType === "cpp" ? 54 : 62,
        userInput: btoa(unescape(encodeURIComponent(terminal.input || ""))),
      });

      if (res.data.token) {
        pollStatus(res.data.token);
      } else {
        throw new Error("No token received");
      }

    } catch (err) {
      setTerminal(prev => ({
        ...prev,
        isRunning: false,
        output: "Error: Compiler service unavailable."
      }));
    }
  };

  const pollStatus = async (token) => {
    try {
      const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
      const data = res.data.data;

      if (data.status.id <= 2) {
        return setTimeout(() => pollStatus(token), 1000);
      }

      const finalOutput = data.stdout || data.stderr || data.compile_output || "";

      setTerminal(prev => ({
        ...prev,
        isRunning: false,
        output: finalOutput ? atob(finalOutput) : "No Output"
      }));

    } catch (err) {
      setTerminal(prev => ({
        ...prev,
        isRunning: false,
        output: "Error fetching result"
      }));
    }
  };


  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${s.bg} ${s.text}`}>

      <header className={`h-[70px] flex justify-between items-center px-8 border-b shadow-sm ${s.surface} ${s.border}`}>

        <EditorNavbar />

        <div className="flex items-center gap-5">

          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-emerald-600 hover:bg-emerald-500"
          >
            SAVE
          </button>

          {projectType !== "html" && (
            <button
              onClick={handleRunCompiler}
              className="px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500"
            >
              {terminal.isRunning ? "Running..." : "RUN"}
            </button>
          )}

          <FiDownload
            className="text-2xl cursor-pointer hover:scale-110 transition-transform"
            onClick={handleDownload}
          />

          <MdOutlineLightMode
            className={`text-2xl cursor-pointer hover:scale-110 transition-transform ${isLightMode ? "text-orange-500" : ""}`}
            onClick={() => setIsLightMode(!isLightMode)}
          />

          <BiExpand
            className="text-2xl cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">

        {projectType === "html" ? (
          <WebEditor
            codes={codes}
            setCodes={setCodes}
            tab={tab}
            setTab={setTab}
            isLightMode={isLightMode}
          />
        ) : (
          <>
            <div className={`flex flex-col transition-all duration-500 ${isExpanded ? "w-full" : "w-1/2"}`}>

              <div className={`h-10 flex items-center px-4 text-xs font-bold uppercase ${s.surface} ${s.border} border-b`}>
                {projectType} Editor
              </div>

              <CodeEditor
                theme={s.editor}
                language={projectType === "cpp" ? "cpp" : "java"}
                value={codes.main}
                onChange={(v) => setCodes(prev => ({ ...prev, main: v }))}
              />
            </div>

            {!isExpanded && (
              <aside className={`w-1/2 border-l ${s.border}`}>
                
                <OutputTerminal
                  userInput={terminal.input}
                  setUserInput={(v) =>
                    setTerminal((prev) => ({ ...prev, input: v }))
                  }
                  output={terminal.output}
                  isLightMode={isLightMode}
                />
              </aside>
            )}
          </>
        )}
      </main>
    </div>
  );
}






















































