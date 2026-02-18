import React, { useState } from 'react';
import img from "../images/code.png";
import Delete from "../images/delete.png"; 
import { api_based_url } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function ListCard({ item }) {

  const navigate = useNavigate();
  const [isDeleteModel, setIsDeleteModel] = useState(false);

  const typeStyles = {
    html: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    java: "bg-red-500/20 text-red-400 border-red-500/30",
    cpp: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    python: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  };

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
      <div className="flex items-center justify-between p-5 bg-[#141414] 
        rounded-xl hover:bg-[#1c1c1c] transition border border-white/5">

        <div onClick={() => navigate(`/editor/${item._id}`)} 
             className="flex items-center gap-4 cursor-pointer flex-1">

          <img className="w-12 opacity-70" src={img} alt="" />

          <div>
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p className="text-gray-400 text-sm">
              {new Date(item.date).toDateString()}
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 text-xs rounded-full border mr-6 font-semibold 
          ${typeStyles[item.projectType]}`}>
          {item.projectType?.toUpperCase()}
        </span>

        <img 
          onClick={() => setIsDeleteModel(true)} 
          className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer" 
          src={Delete} 
          alt="" 
        />
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

