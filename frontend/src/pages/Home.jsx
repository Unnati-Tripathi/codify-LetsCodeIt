import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import CreateProjectModal from '../components/CreateProjectModal.jsx';
import { useHomeLogic } from '../hooks/useHomeLogic';
import axios from 'axios';
import { api_based_url } from '../helper';

function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const {
    filteredData,
    loading,
    isGridLayout,
    setGridLayout,
    isLightMode,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    navigate,
    handleCreateProject
  } = useHomeLogic();


  const runCodeSnippet = async (code, langId, input = "") => {
    setIsRunning(true);
    setOutput("Running...");
    try {
      const res = await axios.post(`${api_based_url}/compiler/run`, {
        code: btoa(code),
        language_id: langId,
        userInput: btoa(input)
      });

      if (res.data.success) {
        pollStatus(res.data.token);
      }
    } catch (err) {
      setOutput("Compiler Error: " + err.message);
      setIsRunning(false);
    }
  };

  const pollStatus = async (token) => {
    try {
      const res = await axios.get(`${api_based_url}/compiler/status/${token}`);
      const statusId = res.data.data.status.id;

      if (statusId <= 2) {
        setTimeout(() => pollStatus(token), 1000);
        return;
      }

      setIsRunning(false);
      const data = res.data.data;
      const stdout = data.stdout ? atob(data.stdout) : "";
      const stderr = data.stderr ? atob(data.stderr) : "";
      const compileErr = data.compile_output ? atob(data.compile_output) : "";

      setOutput(compileErr || stderr || stdout || "Executed successfully.");
    } catch (err) {
      setOutput("Error fetching result.");
      setIsRunning(false);
    }
  };


  const recentProjects = [...filteredData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const starredProjects = filteredData.filter(p => p.starred); // works if you add starred field

  return (
    <div className={`min-h-screen transition-all duration-500 ${isLightMode ? 'bg-gray-50 text-gray-900' : 'bg-[#050505] text-white'}`}>

      <Navbar isLightMode={isLightMode} />


      <header className="px-6 md:px-[100px] pt-10 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-center">

          <div>
            <h1 className="text-3xl font-bold">My Workspace</h1>
            <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} mt-2`}>
              Organize, build and run your projects.
            </p>
          </div>

          <div className="flex gap-4 items-center">

            <div className={`flex p-1 rounded-xl border ${isLightMode ? 'bg-gray-200 border-gray-300' : 'bg-[#111] border-white/5'}`}>
              <button
                onClick={() => setGridLayout(true)}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${isGridLayout ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
                Grid
              </button>
              <button
                onClick={() => setGridLayout(false)}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${!isGridLayout ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
                List
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-[#111] border border-white/10">
              {isLightMode ? "🌙" : "☀️"}
            </button>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 px-6 py-3 rounded-xl font-bold">
              + New
            </button>

          </div>
        </div>
      </header>

      <section className="px-6 md:px-[100px] mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          className={`w-full py-4 px-6 rounded-2xl outline-none border ${isLightMode ? 'bg-white border-gray-200' : 'bg-[#111] border-white/10'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="px-6 md:px-[100px] mb-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Projects</h2>
        </div>

        {recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProjects.map(item => (
              <GridCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent projects.</p>
        )}
      </section>

      {starredProjects.length > 0 && (
        <section className="px-6 md:px-[100px] mb-14">
          <h2 className="text-2xl font-bold mb-6">Starred Projects ⭐</h2>

          <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-4"}>
            {starredProjects.map(item =>
              isGridLayout ?
                <GridCard key={item._id} item={item} /> :
                <ListCard key={item._id} item={item} />
            )}
          </div>
        </section>
      )}

      <section className="px-6 md:px-[100px] pb-20">
        <h2 className="text-2xl font-bold mb-6">All Projects</h2>

        {loading ? (
          <div className="grid grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[200px] bg-white/5 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-5"}>
            {filteredData.length > 0 ? (
              filteredData.map(item =>
                isGridLayout ?
                  <GridCard key={item._id} item={item} onClick={() => navigate(`/editor/${item._id}`)} /> :
                  <ListCard key={item._id} item={item} onClick={() => navigate(`/editor/${item._id}`)} />
              )
              
            ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
              <p className="text-gray-500 text-lg">
                Your workspace is empty.
              </p>
            </div>
            )}
          </div>
        )}
      </section>

      {output && (
        <section className="px-6 md:px-[100px] mb-10">
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-orange-400">
                Console Output
              </span>
              <button onClick={() => setOutput("")}>✕</button>
            </div>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </section>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}

export default Home;


























































