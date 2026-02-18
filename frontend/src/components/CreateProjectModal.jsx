import React, { useState } from 'react';

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [language, setLanguage] = useState("html"); 

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!projectTitle.trim()) return alert("Please enter a project title");
    
    onCreate(projectTitle, language); 
    
    setProjectTitle("");
    setLanguage("html");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100] backdrop-blur-sm">
      <div className="bg-[#141414] w-[450px] p-8 rounded-2xl border border-[#333] shadow-2xl">
        <h1 className='text-2xl mb-2 text-white font-black'>New Project</h1>
        <p className='text-gray-400 text-sm mb-6'>Choose your environment and start coding.</p>

        <div className='mb-4'>
            <label className='text-xs font-bold text-gray-500 uppercase mb-2 block'>Project Title</label>
            <input 
            className="w-full bg-[#1a1a1a] p-3 rounded-xl outline-none border border-[#333] text-white focus:border-blue-500 transition-all" 
            autoFocus 
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder='e.g. My Awesome App' 
            />
        </div>

        <div className='mb-8'>
            <label className='text-xs font-bold text-gray-500 uppercase mb-2 block'>Project Type</label>
            <select 
                className="w-full bg-[#1a1a1a] p-3 rounded-xl outline-none border border-[#333] text-white focus:border-blue-500 appearance-none cursor-pointer"
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="html">Web Development (HTML, CSS, JS)</option>
                <option value="cpp">C++ Compiler</option>
                <option value="java">Java Compiler</option>
            </select>
        </div>

        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-500 text-white flex-1 py-3 rounded-xl font-bold transition-all active:scale-95" onClick={handleSubmit}>
            Create Project
          </button>
          <button className="bg-[#222] hover:bg-[#333] text-white flex-1 py-3 rounded-xl font-bold transition-all" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;