import { api_based_url } from '../helper';

export const projectService = {
  fetchProjects: async () => {
    const userId = localStorage.getItem("userId"); 
    
    const res = await fetch(`${api_based_url}/getProjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }) 
    });
    return await res.json();
  },

  createProject: async (title, language) => {
  const userId = localStorage.getItem("userId");
  const res = await fetch(`${api_based_url}/createProject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      title: title, 
      userId: userId,
      projectType: language 
    })
  });
  return await res.json();
}


};





