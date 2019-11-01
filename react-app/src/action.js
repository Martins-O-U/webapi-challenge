import React, { useEffect, useState } from 'react';
import axios from "axios";



function Project() {
  const [ projects, setProjects ] = useState([]);
  const [ newProject, setNewProject ] = useState({ name: "", description: "", completed: false}) 


  const getProjects = () => {
    axios.get("http://localhost:3500/api/projects")
      .then(res => {
        console.log(res);
        setProjects(res.data);})
  }
  useEffect(() => {
    getProjects();
  }, [])

  const handleChange = event => {
    setNewProject({...newProject, [event.target.name]: event.target.value});
  }

  const handleSubmit = (e, project) => {
    e.preventDefault();
    axios.post("http://localhost:3500/api/projects", project)
      .then(result => {
        getProjects()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <h1>List of All Projects</h1>
      <form onSubmit={(e) => handleSubmit(e, newProject)}>
        <h5>Add projects</h5>
          <input 
            placeholder="Enter Project's Name"
            name="name"
            value={newProject.name}
            onChange={handleChange}
          />
          <input 
            placeholder="Enter Project's Description"
            name="description"
            value={newProject.description}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>

        {projects.map(project => {
        return (
          <div key={project.id} className='project-div'>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
}


export default Project;
