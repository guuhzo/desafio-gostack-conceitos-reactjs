import React, { useState, useEffect } from "react";
import api from './services/api'
import crypto from 'crypto'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${ await crypto.randomBytes(10).toString('hex') }`,
      techs: ["React", "Node.js"],
    })

    setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    const newArray = repositories
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    newArray.splice(repositoryIndex, 1)
    
    setRepositories([ ...newArray ])
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
