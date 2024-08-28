import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientForm = ({ selectedClient, onClientSaved, onClearSelection }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.name);
      setCpf(selectedClient.cpf);
      setBornDate(selectedClient.born_date);
      setEmail(selectedClient.email);
    } else {
      clearForm();
    }
  }, [selectedClient]);

  const clearForm = () => {
    setName('');
    setCpf('');
    setBornDate('');
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { name, cpf, born_date: bornDate, email };

    try {
      if (selectedClient) {
        await axios.put(`http://18.191.176.148:5000/clients/${selectedClient.id}`, clientData);
      } else {
        await axios.post('http://18.191.176.148:5000/clients', clientData);
      }
      onClientSaved();
      clearForm();
    } catch (error) {
      console.error('Erro ao salvar o cliente:', error);
    }
  };

  const handleClear = () => {
    clearForm();
    onClearSelection(); // Notifica o App para resetar a seleção do cliente
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
        value={bornDate}
        onChange={(e) => setBornDate(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleClear}>Limpar</button>
      </div>
    </form>
  );
};

export default ClientForm;
