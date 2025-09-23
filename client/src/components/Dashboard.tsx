import { useState } from "react";
import Header from "./Header";
import ClientSelector from "./ClientSelector";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";
import ThemeToggle from "./ThemeToggle";

interface Client {
  id: string;
  name: string;
  createdAt: string;
}

interface Measurement {
  id: string;
  clientId: string;
  height: string;
  width: string;
  createdAt: string;
}

export default function Dashboard() {
  // todo: remove mock functionality
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Johnson Construction', createdAt: '2024-03-15T10:30:00Z' },
    { id: '2', name: 'Smith Renovations', createdAt: '2024-03-14T14:20:00Z' },
    { id: '3', name: 'Davis Home Builders', createdAt: '2024-03-13T09:15:00Z' },
  ]);

  // todo: remove mock functionality  
  const [measurements, setMeasurements] = useState<Measurement[]>([
    { id: '1', clientId: '1', height: '84.50', width: '36.25', createdAt: '2024-03-15T14:30:00Z' },
    { id: '2', clientId: '1', height: '96.00', width: '48.75', createdAt: '2024-03-15T15:45:00Z' },
    { id: '3', clientId: '2', height: '80.25', width: '32.00', createdAt: '2024-03-15T16:20:00Z' },
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleAddClient = (name: string) => {
    const newClient: Client = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
    };
    setClients([...clients, newClient]);
  };

  const handleSaveMeasurement = (height: number, width: number) => {
    if (!selectedClient) return;

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      clientId: selectedClient.id,
      height: height.toFixed(2),
      width: width.toFixed(2),
      createdAt: new Date().toISOString(),
    };
    setMeasurements([newMeasurement, ...measurements]);
  };

  const clientMeasurements = selectedClient 
    ? measurements.filter(m => m.clientId === selectedClient.id)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Header />
        <div className="ml-auto p-4">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto p-4 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ClientSelector
              selectedClient={selectedClient}
              onClientSelect={setSelectedClient}
              clients={clients}
              onAddClient={handleAddClient}
            />
            
            <MeasurementForm
              clientName={selectedClient?.name || null}
              onSaveMeasurement={handleSaveMeasurement}
            />
          </div>
          
          <div>
            <MeasurementList
              measurements={clientMeasurements}
              clientName={selectedClient?.name || null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}