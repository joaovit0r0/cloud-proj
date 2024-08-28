import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientList = ({ onClientSelected }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://18.191.176.148:5000/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://18.191.176.148:5000/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.email}
            <button onClick={() => onClientSelected(client)}>Editar</button>
            <button onClick={() => handleDelete(client.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientList;
