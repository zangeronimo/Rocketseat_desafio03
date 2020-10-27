import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));    
  }, []);

  async function handleAddRepository() {
    const repository = {
      "title": `new repository ${Date.now()}`,
      "url": "https://github.com/zangeronimo/webeditor",
      "techs": ["javascript", "reactjs"]
    }
    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories;
    if (id) {
      await api.delete(`repositories/${id}`);

      const repositoryIndex = newRepositories.findIndex(repository => repository.id === id);

      if (repositoryIndex < 0) {
        return;
      }
      newRepositories.splice(repositoryIndex, 1);
    }
    setRepositories([...newRepositories]);
  }

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
