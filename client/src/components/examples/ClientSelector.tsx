import { useState } from 'react'
import ClientSelector from '../ClientSelector'

export default function ClientSelectorExample() {
  // todo: remove mock functionality
  const [clients, setClients] = useState([
    { id: '1', name: 'Johnson Construction', createdAt: '2024-03-15T10:30:00Z' },
    { id: '2', name: 'Smith Renovations', createdAt: '2024-03-14T14:20:00Z' },
    { id: '3', name: 'Davis Home Builders', createdAt: '2024-03-13T09:15:00Z' },
  ]);
  
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddClient = (name: string) => {
    const newClient = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
    };
    setClients([...clients, newClient]);
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
  };

  return (
    <ClientSelector
      selectedClient={selectedClient}
      onClientSelect={setSelectedClient}
      clients={clients}
      onAddClient={handleAddClient}
      onDeleteClient={handleDeleteClient}
    />
  )
}