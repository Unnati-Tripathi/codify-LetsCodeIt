// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { api_based_url } from '../helper';

// import EditorNavbar from '../components/EditorNavbar';
// import CodeEditor from '../components/CodeEditor';
// import OutputTerminal from '../components/OutputTerminal';
// import { MdOutlineLightMode } from "react-icons/md";
// import { BiExpand } from "react-icons/bi";

// export default function EditorPage() {
//   const { projectID } = useParams();
//   const [projectType, setProjectType] = useState("html");
//   const [tab, setTab] = useState("html");
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   // Data States
//   const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
//   const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

//   useEffect(() => {
//     fetchProject();
//   }, [projectID]);

//   const fetchProject = async () => {
//     try {
//       const res = await axios.post(`${api_based_url}/getProject`, {
//         userId: localStorage.getItem("userId"),
//         projId: projectID,
//       });
//       const proj = res.data.project;
//       setProjectType(proj.projectType);
//       setCodes({
//         html: proj.htmlCode || "",
//         css: proj.cssCode || "",
//         js: proj.jsCode || "",
//         main: proj.code || ""
//       });
//     } catch (err) { console.error("Fetch error", err); }
//   };

//   const handleRunCompiler = async () => {
//     setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));
//     try {
//       const res = await axios.post(`${api_based_url}/compiler/run`, {
//         code: btoa(codes.main),
//         language_id: projectType === "cpp" ? 54 : 62,
//         userInput: btoa(terminal.input)
//       });
//       pollStatus(res.data.token);
//     } catch (err) { setTerminal(prev => ({ ...prev, isRunning: false, output: "Error" })); }
//   };

//   const pollStatus = async (token) => {
//     const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
//     const data = res.data.data;
//     if (data.status.id <= 2) return setTimeout(() => pollStatus(token), 1000);
    
//     setTerminal(prev => ({
//       ...prev,
//       isRunning: false,
//       output: atob(data.compile_output || "") || atob(data.stderr || "") || atob(data.stdout || "")
//     }));
//   };

//   return (
//     <div className={isLightMode ? "lightMode" : ""}>
//       <EditorNavbar />
//       <div className="flex">
//         <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
//           <div className="tabs flex justify-between items-center bg-[#1A1919] h-[50px] px-10">
//             <div className="flex gap-2">
//               {projectType === "html" ? (
//                 ['html', 'css', 'js'].map(t => (
//                   <button key={t} onClick={() => setTab(t)} className={`p-2 uppercase text-xs ${tab === t ? "bg-[#333]" : ""}`}>{t}</button>
//                 ))
//               ) : <span className="uppercase text-blue-400 font-bold">{projectType}</span>}
//             </div>
//             <div className="flex items-center gap-4 text-white">
//               {projectType !== "html" && (
//                 <button onClick={handleRunCompiler} className="bg-blue-600 px-4 py-1 rounded text-xs font-bold">
//                   {terminal.isRunning ? "..." : "RUN"}
//                 </button>
//               )}
//               <MdOutlineLightMode className="cursor-pointer" onClick={() => setIsLightMode(!isLightMode)} />
//               <BiExpand className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
//             </div>
//           </div>

//           <CodeEditor 
//             theme={isLightMode ? 'vs-light' : 'vs-dark'}
//             language={projectType === "html" ? tab : (projectType === "cpp" ? "cpp" : "java")}
//             value={projectType === "html" ? codes[tab] : codes.main}
//             onChange={(v) => setCodes(prev => ({ ...prev, [projectType === "html" ? tab : "main"]: v }))}
//           />
//         </div>

//         {!isExpanded && (
//           <div className="w-1/2 h-[83vh] border-l border-white/10">
//             {projectType === "html" ? (
//               <iframe 
//                 title="preview"
//                 srcDoc={`${codes.html}<style>${codes.css}</style><script>${codes.js}</script>`}
//                 className="w-full h-full bg-white"
//               />
//             ) : (
//               <OutputTerminal 
//                 userInput={terminal.input} 
//                 setUserInput={(v) => setTerminal(prev => ({ ...prev, input: v }))} 
//                 output={terminal.output} 
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















































































// export default function EditorPage() {
//   const { projectID } = useParams();
//   const [projectType, setProjectType] = useState("html");
//   const [tab, setTab] = useState("html");
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
//   const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

//   useEffect(() => {
//     fetchProject();
//   }, [projectID]);

//   const fetchProject = async () => {
//     try {
//       const res = await axios.post(`${api_based_url}/getProject`, {
//         userId: localStorage.getItem("userId"),
//         projId: projectID,
//       });
//       const proj = res.data.project;
//       const type = proj.projectType || "html";
      
//       setProjectType(type);
      
//       // If it's a compiler project, set the tab to match the language
//       if (type !== "html") setTab(type);

//       // Logic: Use database code if it exists, otherwise use the boilerplate
//       setCodes({
//         html: proj.htmlCode || BOILERPLATES.html,
//         css: proj.cssCode || BOILERPLATES.css,
//         js: proj.jsCode || BOILERPLATES.js,
//         main: proj.code || (type === "cpp" ? BOILERPLATES.cpp : BOILERPLATES.java)
//       });
//     } catch (err) { 
//       console.error("Fetch error", err); 
//     }
//   };

//   const handleRunCompiler = async () => {
//     setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));
//     try {
//       const res = await axios.post(`${api_based_url}/compiler/run`, {
//         code: btoa(codes.main),
//         language_id: projectType === "cpp" ? 54 : 62,
//         userInput: btoa(terminal.input)
//       });
//       pollStatus(res.data.token);
//     } catch (err) { 
//         setTerminal(prev => ({ ...prev, isRunning: false, output: "Error calling compiler" })); 
//     }
//   };

//   const pollStatus = async (token) => {
//     const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
//     const data = res.data.data;
//     if (data.status.id <= 2) return setTimeout(() => pollStatus(token), 1000);
    
//     setTerminal(prev => ({
//       ...prev,
//       isRunning: false,
//       output: atob(data.compile_output || "") || atob(data.stderr || "") || atob(data.stdout || "")
//     }));
//   };

//   return (
//     // Dynamic background and text color for the whole page
//     <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white text-black' : 'bg-[#0f0f0f] text-white'}`}>
//       <EditorNavbar isLightMode={isLightMode} />
      
//       <div className="flex">
//         <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
//           {/* Header/Tabs bar color update */}
//           <div className={`tabs flex justify-between items-center h-[50px] px-10 transition-colors ${isLightMode ? 'bg-gray-200 border-b border-gray-300' : 'bg-[#1A1919]'}`}>
//             <div className="flex gap-2">
//               {projectType === "html" ? (
//                 ['html', 'css', 'js'].map(t => (
//                   <button 
//                     key={t} 
//                     onClick={() => setTab(t)} 
//                     className={`p-2 uppercase text-xs font-bold ${tab === t ? (isLightMode ? "bg-white text-blue-600 shadow-sm" : "bg-[#333] text-white") : "text-gray-500"}`}
//                   >
//                     {t}
//                   </button>
//                 ))
//               ) : <span className="uppercase text-blue-500 font-black tracking-widest">{projectType}</span>}
//             </div>
            
//             <div className={`flex items-center gap-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
//               {projectType !== "html" && (
//                 <button onClick={handleRunCompiler} className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded text-xs font-black text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
//                   {terminal.isRunning ? "..." : "RUN"}
//                 </button>
//               )}
//               <MdOutlineLightMode className="cursor-pointer text-lg" onClick={() => setIsLightMode(!isLightMode)} />
//               <BiExpand className="cursor-pointer text-lg" onClick={() => setIsExpanded(!isExpanded)} />
//             </div>
//           </div>

//           <CodeEditor 
//             theme={isLightMode ? 'vs-light' : 'vs-dark'}
//             language={projectType === "html" ? tab : (projectType === "cpp" ? "cpp" : "java")}
//             value={projectType === "html" ? codes[tab] : codes.main}
//             onChange={(v) => setCodes(prev => ({ ...prev, [projectType === "html" ? tab : "main"]: v }))}
//           />
//         </div>

//         {!isExpanded && (
//           <div className={`w-1/2 h-[83vh] border-l ${isLightMode ? 'border-gray-300' : 'border-white/10'}`}>
//             {projectType === "html" ? (
//               <iframe 
//                 title="preview"
//                 srcDoc={`${codes.html}<style>${codes.css}</style><script>${codes.js}</script>`}
//                 className="w-full h-full bg-white"
//               />
//             ) : (
//               <OutputTerminal 
//                 isLightMode={isLightMode} // Pass theme to terminal
//                 userInput={terminal.input} 
//                 setUserInput={(v) => setTerminal(prev => ({ ...prev, input: v }))} 
//                 output={terminal.output} 
//               />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





































































































































































// // src/pages/EditorPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { api_based_url } from '../helper';

// import EditorNavbar from '../components/EditorNavbar';
// import CodeEditor from '../components/CodeEditor';
// import OutputTerminal from '../components/OutputTerminal';
// import { MdOutlineLightMode } from "react-icons/md";
// import { BiExpand } from "react-icons/bi";

// const BOILERPLATES = {
//   cpp: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello World from C++!\" << std::endl;\n    return 0;\n}",
//   java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World from Java!\");\n    }\n}",
//   html: "<h1>Hello World</h1>",
//   css: "body {\n  background-color: aqua;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  margin: 0;\n}",
//   js: "console.log('Hello World from JS');"
// };

// export default function EditorPage() {
//   const { projectID } = useParams();
//   const [projectType, setProjectType] = useState("html");
//   const [tab, setTab] = useState("html");
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
//   const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

//   useEffect(() => {
//     fetchProject();
//   }, [projectID]);

//   const fetchProject = async () => {
//     try {
//       const res = await axios.post(`${api_based_url}/getProject`, {
//         userId: localStorage.getItem("userId"),
//         projId: projectID,
//       });
      
//       const proj = res.data.project;
//       const type = proj.projectType || "html";
//       setProjectType(type);

//       setCodes({
//         html: proj.htmlCode || BOILERPLATES.html,
//         css: proj.cssCode || BOILERPLATES.css,
//         js: proj.jsCode || BOILERPLATES.js,
//         main: proj.code || (type === "cpp" ? BOILERPLATES.cpp : BOILERPLATES.java)
//       });

//       if (type !== "html") setTab(type);
//     } catch (err) { console.error("Fetch error", err); }
//   };

//   const handleRunCompiler = async () => {
//     setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));
//     try {
//       const res = await axios.post(`${api_based_url}/compiler/run`, {
//         code: btoa(codes.main),
//         language_id: projectType === "cpp" ? 54 : 62,
//         userInput: btoa(terminal.input)
//       });
//       if (res.data.success) pollStatus(res.data.token);
//     } catch (err) { setTerminal(prev => ({ ...prev, isRunning: false, output: "Error" })); }
//   };

//   const pollStatus = async (token) => {
//     const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
//     const data = res.data.data;
//     if (data.status.id <= 2) return setTimeout(() => pollStatus(token), 1000);
    
//     setTerminal(prev => ({
//       ...prev,
//       isRunning: false,
//       output: atob(data.compile_output || "") || atob(data.stderr || "") || atob(data.stdout || "")
//     }));
//   };

//   return (
//     <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white text-black' : 'bg-[#0f0f0f] text-white'}`}>
//       <EditorNavbar isLightMode={isLightMode} />
//       <div className="flex">
//         <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
//           <div className={`tabs flex justify-between items-center h-[50px] px-10 transition-colors ${isLightMode ? 'bg-gray-200 border-b border-gray-300' : 'bg-[#1A1919]'}`}>
//             <div className="flex gap-2">
//               {projectType === "html" ? (
//                 ['html', 'css', 'js'].map(t => (
//                   <button 
//                     key={t} 
//                     onClick={() => setTab(t)} 
//                     className={`p-2 uppercase text-xs font-bold transition-all ${tab === t ? (isLightMode ? "bg-white text-blue-600 shadow-sm" : "bg-[#333] text-white") : "text-gray-500"}`}
//                   >
//                     {t}
//                   </button>
//                 ))
//               ) : <span className="uppercase text-blue-500 font-black tracking-widest">{projectType}</span>}
//             </div>
            
//             <div className={`flex items-center gap-4 ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
//               {projectType !== "html" && (
//                 <button onClick={handleRunCompiler} className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded text-xs font-black text-white active:scale-95 transition-all">
//                   {terminal.isRunning ? "..." : "RUN"}
//                 </button>
//               )}
//               <MdOutlineLightMode className="cursor-pointer text-lg" onClick={() => setIsLightMode(!isLightMode)} />
//               <BiExpand className="cursor-pointer text-lg" onClick={() => setIsExpanded(!isExpanded)} />
//             </div>
//           </div>

//           <CodeEditor 
//             theme={isLightMode ? 'vs-light' : 'vs-dark'}
//             language={projectType === "html" ? tab : (projectType === "cpp" ? "cpp" : "java")}
//             value={projectType === "html" ? codes[tab] : codes.main}
//             onChange={(v) => setCodes(prev => ({ ...prev, [projectType === "html" ? tab : "main"]: v }))}
//           />
//         </div>

//         {!isExpanded && (
//           <div className={`w-1/2 h-[83vh] border-l ${isLightMode ? 'border-gray-300' : 'border-white/10'}`}>
//             {projectType === "html" ? (
//               <iframe title="preview" srcDoc={`${codes.html}<style>${codes.css}</style><script>${codes.js}</script>`} className="w-full h-full bg-white" />
//             ) : (
//               <OutputTerminal isLightMode={isLightMode} userInput={terminal.input} setUserInput={(v) => setTerminal(prev => ({ ...prev, input: v }))} output={terminal.output} />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

































































































// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { api_based_url } from '../helper';

// import EditorNavbar from '../components/EditorNavbar';
// import WebEditor from '../components/WebEditor';
// import CompilerEditor from '../components/CompilerEditor';
// import { MdOutlineLightMode } from "react-icons/md";
// import { BiExpand } from "react-icons/bi";

// const BOILERPLATES = {
//   cpp: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello World from C++!\";\n    return 0;\n}",
//   java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World from Java!\");\n    }\n}",
//   html: "<h1>Hello World</h1>",
//   css: "body { background-color: aqua; }",
//   js: "console.log('Hello World');"
// };

// export default function Editor() {
//   const { projectID } = useParams();
//   const [projectType, setProjectType] = useState(null);
//   const [tab, setTab] = useState("html");
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
//   const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.post(`${api_based_url}/getProject`, {
//           userId: localStorage.getItem("userId"),
//           projId: projectID,
//         });
//         const proj = res.data.project;
//         const type = proj.projectType || "html";
//         setProjectType(type);
//         setCodes({
//           html: proj.htmlCode || BOILERPLATES.html,
//           css: proj.cssCode || BOILERPLATES.css,
//           js: proj.jsCode || BOILERPLATES.js,
//           main: proj.code || (type === "cpp" ? BOILERPLATES.cpp : BOILERPLATES.java)
//         });
//       } catch (err) { console.error(err); }
//     };
//     fetchProject();
//   }, [projectID]);

//   const handleRunCompiler = async () => {
//     setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));
//     const res = await axios.post(`${api_based_url}/compiler/run`, {
//       code: btoa(codes.main),
//       language_id: projectType === "cpp" ? 54 : 62,
//       userInput: btoa(terminal.input)
//     });
//     pollStatus(res.data.token);
//   };

//   const pollStatus = async (token) => {
//     const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
//     const data = res.data.data;
//     if (data.status.id <= 2) return setTimeout(() => pollStatus(token), 1000);
//     setTerminal(prev => ({ ...prev, isRunning: false, output: atob(data.compile_output || "") || atob(data.stderr || "") || atob(data.stdout || "") }));
//   };

//   if (!projectType) return <div className="p-10 text-white">Loading Project...</div>;

//   return (
//     <div className={`min-h-screen ${isLightMode ? 'bg-white' : 'bg-[#0f0f0f]'}`}>
//       <div className="flex justify-between items-center pr-10">
//         <EditorNavbar isLightMode={isLightMode} />
//         <div className="flex gap-4">
//            <MdOutlineLightMode className="cursor-pointer text-xl" onClick={() => setIsLightMode(!isLightMode)} />
//            <BiExpand className="cursor-pointer text-xl" onClick={() => setIsExpanded(!isExpanded)} />
//         </div>
//       </div>

//       <div className="flex">
//         {projectType === "html" ? (
//           <WebEditor 
//             codes={codes} setCodes={setCodes} 
//             tab={tab} setTab={setTab} 
//             isLightMode={isLightMode} 
//           />
//         ) : (
//           <CompilerEditor 
//             projectType={projectType}
//             code={codes.main} setCode={(v) => setCodes(p => ({...p, main: v}))}
//             terminal={terminal} setTerminal={setTerminal}
//             handleRun={handleRunCompiler}
//             isLightMode={isLightMode}
//           />
//         )}
//       </div>
//     </div>
//   );
// }














































































// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { api_based_url } from '../helper';

// import EditorNavbar from '../components/EditorNavbar';
// import WebEditor from '../components/WebEditor';
// import CompilerEditor from '../components/CompilerEditor';
// import { MdOutlineLightMode, MdSave } from "react-icons/md";
// import { BiExpand } from "react-icons/bi";

// const BOILERPLATES = {
//   cpp: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello World from C++!\";\n    return 0;\n}",
//   java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World from Java!\");\n    }\n}",
//   html: "<h1>Hello World</h1>",
//   css: "body { background-color: aqua; }",
//   js: "console.log('Hello World');"
// };

// export default function EditorPage() {
//   const { projectID } = useParams();
//   const [projectType, setProjectType] = useState(null);
//   const [tab, setTab] = useState("html");
//   const [isLightMode, setIsLightMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [codes, setCodes] = useState({ html: "", css: "", js: "", main: "" });
//   const [terminal, setTerminal] = useState({ input: "", output: "", isRunning: false });

//   // 1. Fetch Project Data
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await axios.post(`${api_based_url}/getProject`, {
//           userId: localStorage.getItem("userId"),
//           projId: projectID,
//         });
//         const proj = res.data.project;
//         const type = proj.projectType || "html";
//         setProjectType(type);
//         setCodes({
//           html: proj.htmlCode || BOILERPLATES.html,
//           css: proj.cssCode || BOILERPLATES.css,
//           js: proj.jsCode || BOILERPLATES.js,
//           main: proj.code || (type === "cpp" ? BOILERPLATES.cpp : BOILERPLATES.java)
//         });
//       } catch (err) { console.error("Fetch error", err); }
//     };
//     fetchProject();
//   }, [projectID]);

//   // 2. Separate Save Logic
//   const handleSave = async () => {
//     const isWeb = projectType === "html";
//     const endpoint = isWeb ? "/saveWebProject" : "/saveCompilerProject";
    
//     const payload = isWeb ? {
//       userId: localStorage.getItem("userId"),
//       projId: projectID,
//       htmlCode: codes.html,
//       cssCode: codes.css,
//       jsCode: codes.js
//     } : {
//       userId: localStorage.getItem("userId"),
//       projId: projectID,
//       code: codes.main
//     };

//     try {
//       const res = await axios.post(`${api_based_url}${endpoint}`, payload);
//       if (res.data.success) {
//         alert("Project saved successfully!");
//       }
//     } catch (err) {
//       console.error("Save error", err);
//       alert("Failed to save project");
//     }
//   };

//   // 3. Keyboard Shortcut (Ctrl + S)
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.ctrlKey && e.key === 's') {
//         e.preventDefault();
//         handleSave();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [codes, projectType, projectID]);

//   // 4. Compiler Logic
//   const handleRunCompiler = async () => {
//     setTerminal(prev => ({ ...prev, isRunning: true, output: "Running..." }));
//     try {
//       const res = await axios.post(`${api_based_url}/compiler/run`, {
//         code: btoa(codes.main),
//         language_id: projectType === "cpp" ? 54 : 62,
//         userInput: btoa(terminal.input)
//       });
//       pollStatus(res.data.token);
//     } catch (err) { setTerminal(prev => ({ ...prev, isRunning: false, output: "Error" })); }
//   };

//   const pollStatus = async (token) => {
//     const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
//     const data = res.data.data;
//     if (data.status.id <= 2) return setTimeout(() => pollStatus(token), 1000);
//     setTerminal(prev => ({ 
//       ...prev, 
//       isRunning: false, 
//       output: atob(data.compile_output || "") || atob(data.stderr || "") || atob(data.stdout || "") 
//     }));
//   };

//   if (!projectType) return <div className="p-10 text-white">Loading...</div>;

//   return (
//     <div className={`min-h-screen transition-all ${isLightMode ? 'bg-white' : 'bg-[#0f0f0f]'}`}>
//       <div className="flex justify-between items-center pr-10">
//         <EditorNavbar isLightMode={isLightMode} />
//         <div className="flex gap-4 items-center">
//           {/* Dedicated Save Button */}
//           <button 
//             onClick={handleSave}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg"
//           >
//             <MdSave className="text-lg" />
//             Save
//           </button>
//           <MdOutlineLightMode className={`cursor-pointer text-xl ${isLightMode ? 'text-black' : 'text-white'}`} onClick={() => setIsLightMode(!isLightMode)} />
//           <BiExpand className={`cursor-pointer text-xl ${isLightMode ? 'text-black' : 'text-white'}`} onClick={() => setIsExpanded(!isExpanded)} />
//         </div>
//       </div>

//       <div className="flex">
//         {projectType === "html" ? (
//           <WebEditor 
//             codes={codes} 
//             setCodes={setCodes} 
//             tab={tab} 
//             setTab={setTab} 
//             isLightMode={isLightMode} 
//           />
//         ) : (
//           <CompilerEditor 
//             projectType={projectType}
//             code={codes.main} 
//             setCode={(v) => setCodes(prev => ({ ...prev, main: v }))}
//             terminal={terminal} 
//             setTerminal={setTerminal}
//             handleRun={handleRunCompiler}
//             isLightMode={isLightMode}
//           />
//         )}
//       </div>
//     </div>
//   );
// }















































































































































import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api_based_url } from "../helper";

import EditorNavbar from "../components/EditorNavbar";
import WebEditor from "../components/WebEditor";
import CompilerEditor from "../components/CompilerEditor";
import { MdOutlineLightMode, MdSave } from "react-icons/md";
import { BiExpand } from "react-icons/bi";

const BOILERPLATES = {
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello World from C++!";
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World from Java!");
    }
}`,
  html: "<h1>Hello World</h1>",
  css: "body { background-color: aqua; }",
  js: "console.log('Hello World');",
};

export default function EditorPage() {
  const { projectID } = useParams();

  const [projectType, setProjectType] = useState(null);
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
    main: "",
  });

  const [terminal, setTerminal] = useState({
    input: "",
    output: "",
    isRunning: false,
  });

  useEffect(() => {
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
          html: proj.htmlCode || BOILERPLATES.html,
          css: proj.cssCode || BOILERPLATES.css,
          js: proj.jsCode || BOILERPLATES.js,
          main:
            proj.code ||
            (type === "cpp" ? BOILERPLATES.cpp : BOILERPLATES.java),
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProject();
  }, [projectID]);

  const handleSave = useCallback(async () => {
    if (!projectType) return;

    const isWeb = projectType === "html";
    const endpoint = isWeb
      ? "/saveWebProject"
      : "/saveCompilerProject";

    const payload = isWeb
      ? {
          userId: localStorage.getItem("userId"),
          projId: projectID,
          htmlCode: codes.html,
          cssCode: codes.css,
          jsCode: codes.js,
        }
      : {
          userId: localStorage.getItem("userId"),
          projId: projectID,
          code: codes.main,
        };

    try {
      const res = await axios.post(
        `${api_based_url}${endpoint}`,
        payload
      );

      if (res.data.success) {
        alert("Project saved successfully!");
      } else {
        alert(res.data.message || "Save failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Server error while saving.");
    }
  }, [codes, projectID, projectType]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave]);

  const handleRunCompiler = async () => {
    try {
      setTerminal((prev) => ({
        ...prev,
        isRunning: true,
        output: "Running...",
      }));

      const res = await axios.post(
        `${api_based_url}/compiler/run`,
        {
          code: btoa(codes.main),
          language_id: projectType === "cpp" ? 54 : 62,
          userInput: btoa(terminal.input || ""),
        }
      );

      pollStatus(res.data.token);
    } catch (err) {
      console.error("Run error:", err);
      setTerminal((prev) => ({
        ...prev,
        isRunning: false,
        output: "Execution failed.",
      }));
    }
  };

  const pollStatus = async (token) => {
    try {
      const res = await axios.get(
        `${api_based_url}/compiler/status/${token}`
      );

      const data = res.data.data;

      if (data.status.id <= 2) {
        setTimeout(() => pollStatus(token), 1000);
        return;
      }

      const decodedOutput =
        atob(data.compile_output || "") ||
        atob(data.stderr || "") ||
        atob(data.stdout || "") ||
        "No Output";

      setTerminal((prev) => ({
        ...prev,
        isRunning: false,
        output: decodedOutput,
      }));
    } catch (err) {
      console.error("Status error:", err);
      setTerminal((prev) => ({
        ...prev,
        isRunning: false,
        output: "Error fetching result.",
      }));
    }
  };

  if (!projectType)
    return <div className="p-10 text-white">Loading...</div>;

  return (
    <div
      className={`min-h-screen transition-all ${
        isLightMode ? "bg-white" : "bg-[#0f0f0f]"
      }`}
    >
      <div className="flex justify-between items-center pr-10">
        <EditorNavbar isLightMode={isLightMode} />

        <div className="flex gap-4 items-center">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg"
          >
            <MdSave className="text-lg" />
            Save
          </button>

          <MdOutlineLightMode
            className={`cursor-pointer text-xl ${
              isLightMode ? "text-black" : "text-white"
            }`}
            onClick={() => setIsLightMode(!isLightMode)}
          />

          <BiExpand
            className={`cursor-pointer text-xl ${
              isLightMode ? "text-black" : "text-white"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>

      <div className="flex">
        {projectType === "html" ? (
          <WebEditor
            codes={codes}
            setCodes={setCodes}
            tab={tab}
            setTab={setTab}
            isLightMode={isLightMode}
          />
        ) : (
          <CompilerEditor
            projectType={projectType}
            code={codes.main}
            setCode={(v) =>
              setCodes((prev) => ({ ...prev, main: v }))
            }
            terminal={terminal}
            setTerminal={setTerminal}
            handleRun={handleRunCompiler}
            isLightMode={isLightMode}
          />
        )}
      </div>
    </div>
  );
}
