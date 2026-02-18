import React, { useState } from 'react';
import codeimg from "../images/code.png";
import DeleteImg from "../images/delete.png"; 
import { useNavigate } from 'react-router-dom';
import { api_based_url } from '../helper';

export default function GridCard({ item }) {
  const navigate = useNavigate();
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const typeStyles = {
    html: { badge: "bg-blue-500/20 text-blue-400 border-blue-500/30", glow: "hover:shadow-blue-500/20" },
    java: { badge: "bg-red-500/20 text-red-400 border-red-500/30", glow: "hover:shadow-red-500/20" },
    cpp: { badge: "bg-yellow-200/20 text-yellow-400 border-yellow-500/30", glow: "hover:shadow-yellow-500/20" },
    python: { badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", glow: "hover:shadow-yellow-500/20" }
  };

  const currentStyle = typeStyles[item.projectType] || typeStyles.html;

  const deleteProj = (id) => {
    fetch(api_based_url + "/deleteProject", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsDeleteModel(false);
        window.location.reload();
      } else {
        alert(data.message);
        setIsDeleteModel(false);
      }
    });
  };

  return (
    <>
      <div className={`group relative p-6 rounded-2xl transition-all hover:-translate-y-2 
        shadow-xl border border-white/5 ${currentStyle.glow} 
        hover:border-white/20 w-[320px] h-[260px] flex flex-col justify-between`}>

        <div onClick={() => navigate(`/editor/${item._id}`)} className="cursor-pointer">

          <div className='flex justify-between items-start mb-5'>
            <div className='w-16 h-16 bg-[#1e1e1e] rounded-xl flex items-center justify-center'>
              <img className="w-10 opacity-70 group-hover:scale-110 transition" src={codeimg} alt="" />
            </div>

            <span className={`px-3 py-1 text-xs rounded-full border font-semibold ${currentStyle.badge}`}>
              {item.projectType?.toUpperCase()}
            </span>
          </div>

          <h3 className='text-xl font-bold tracking-tight line-clamp-1 group-hover:text-white transition'>
            {item.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-gray-400 text-sm">
            {new Date(item.date).toDateString()}
          </p>

          <button 
            onClick={() => setIsDeleteModel(true)} 
            className="p-2 hover:bg-red-500/10 rounded-lg transition"
          >
            <img className="w-5 opacity-60 hover:opacity-100" src={DeleteImg} alt="" />
          </button>
        </div>
      </div>

      {isDeleteModel && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000]">
          <div className="bg-[#111] rounded-2xl p-8 border border-white/10 w-[400px]">
            <h1 className='text-xl font-bold mb-3'>Delete Project?</h1>
            <p className='text-gray-400 mb-6'>
              This action cannot be undone.
            </p>
            <div className='flex gap-4'>
              <button 
                onClick={() => deleteProj(item._id)} 
                className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold"
              >
                Delete
              </button>
              <button 
                onClick={() => setIsDeleteModel(false)} 
                className="flex-1 bg-[#222] py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
