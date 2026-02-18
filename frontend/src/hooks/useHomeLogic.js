import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { toggleClass } from '../helper';

export const useHomeLogic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridLayout, setGridLayout] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    toggleClass("body", "lightMode");
  };

  const loadProjects = async () => {
  setLoading(true);
  try {
    const result = await projectService.fetchProjects();
    if (result.success) {
      setData(result.projects); 
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
    else loadProjects();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleCreateProject = async (title, language) => { 
  if (!title.trim()) return alert("Title is required");
  
  const result = await projectService.createProject(title, language); 
  if (result.success) {
    navigate(`/editor/${result.projectId}`);
  } else {
    alert(result.message);
  }
};

return {
  filteredData, loading, isGridLayout, setGridLayout,
  isLightMode, toggleTheme, searchQuery, setSearchQuery, 
  navigate, handleCreateProject 
};
  
};