import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientForm = ({ selectedClient, onClientSaved }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.name);
      setCpf(selectedClient.cpf);
      setBirthDate(selectedClient.birth_date);
      setEmail(selectedClient.email);
    }
  }, [selectedClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { name, cpf, birth_date: birthDate, email };

    try {
      if (selectedClient) {
        await axios.put(`http://18.191.176.148:3000/clients/${selectedClient.id}`, clientData);
      } else {
        await axios.post('http://18.191.176.148:3000/clients', clientData);
      }
      onClientSaved();
      setName('');
      setCpf('');
      setBirthDate('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao salvar o cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Data de Nascimento"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ClientForm;
