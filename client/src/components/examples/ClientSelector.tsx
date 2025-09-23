import { useState } from 'react'
import ClientSelector from '../ClientSelector'

export default function ClientSelectorExample() {
  // todo: remove mock functionality
  const [clients, setClients] = useState([
    { id: '1', name: 'Johnson Construction', phone: '(555) 123-4567', createdAt: '2024-03-15T10:30:00Z' },
    { id: '2', name: 'Smith Renovations', phone: '(555) 234-5678', createdAt: '2024-03-14T14:20:00Z' },
    { id: '3', name: 'Davis Home Builders', phone: '(555) 345-6789', createdAt: '2024-03-13T09:15:00Z' },
  ]);
  
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddClient = (name: string, phone: string) => {
    const newClient = {
      id: Date.now().toString(),
      name,
      phone,
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