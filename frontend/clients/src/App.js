import React, { useState } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import './App.css';

function App() {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientSaved = () => {
    setSelectedClient(null); // Limpa a seleção após salvar
  };

  return (
    <div className="App">
      <h1>Gerenciamento de Clientes</h1>
      <ClientForm selectedClient={selectedClient} onClientSaved={handleClientSaved} />
      <ClientList onClientSelected={setSelectedClient} />
    </div>
  );
}

export default App;
