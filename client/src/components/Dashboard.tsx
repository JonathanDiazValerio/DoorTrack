import { useState, useEffect } from "react";
import Header from "./Header";
import ClientSelector from "./ClientSelector";
import MeasurementForm from "./MeasurementForm";
import MeasurementList from "./MeasurementList";
import ThemeToggle from "./ThemeToggle";

interface Client {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface Measurement {
  id: string;
  clientId: string;
  height: string;
  width: string;
  type: string;
  createdAt: string;
}

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch("/api/me", { headers: { "x-session-id": sessionId } })
        .then(res => res.json())
        .then(data => setRole(data.role ?? null))
        .catch(() => setRole(null));
    } else {
      setRole(null);
    }
  }, []);
  // todo: remove mock functionality
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Johnson Construction', phone: '(555) 123-4567', createdAt: '2024-03-15T10:30:00Z' },
    { id: '2', name: 'Smith Renovations', phone: '(555) 234-5678', createdAt: '2024-03-14T14:20:00Z' },
    { id: '3', name: 'Davis Home Builders', phone: '(555) 345-6789', createdAt: '2024-03-13T09:15:00Z' },
  ]);

  // todo: remove mock functionality  
  const [measurements, setMeasurements] = useState<Measurement[]>([
    { id: '1', clientId: '1', height: '84.50', width: '36.25', type: 'Door', createdAt: '2024-03-15T14:30:00Z' },
    { id: '2', clientId: '1', height: '96.00', width: '48.75', type: 'Window', createdAt: '2024-03-15T15:45:00Z' },
    { id: '3', clientId: '2', height: '80.25', width: '32.00', type: 'Fixed pane', createdAt: '2024-03-15T16:20:00Z' },
  ]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleAddClient = (name: string, phone: string) => {
    const newClient: Client = {
      id: Date.now().toString(),
      name,
      phone,
      createdAt: new Date().toISOString(),
    };
    setClients([...clients, newClient]);
  };

  const handleDeleteClient = (clientId: string) => {
    // Remove client
    setClients(clients.filter(client => client.id !== clientId));
    
    // Remove all measurements for this client
    setMeasurements(measurements.filter(measurement => measurement.clientId !== clientId));
    
    // Clear selection if the deleted client was selected
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
  };

  const handleSaveMeasurement = (width: number, height: number, type: string) => {
    if (!selectedClient) return;

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      clientId: selectedClient.id,
      height: height.toFixed(2),
      width: width.toFixed(2),
      type,
      createdAt: new Date().toISOString(),
    };
    setMeasurements([newMeasurement, ...measurements]);
  };

  const handleDeleteMeasurement = (measurementId: string) => {
    setMeasurements(measurements.filter(measurement => measurement.id !== measurementId));
  };

  const clientMeasurements = selectedClient 
    ? measurements.filter(m => m.clientId === selectedClient.id)
    : [];

  if (role === "admin") {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Header />
          <div className="ml-auto p-4">
            <ThemeToggle />
          </div>
        </div>
        <div className="container max-w-6xl mx-auto p-4">
          <div className="text-lg text-center mt-10">Welcome, admin. Use the User Management page to manage users.</div>
        </div>
      </div>
    );
  }
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
              onDeleteClient={handleDeleteClient}
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
              onDeleteMeasurement={handleDeleteMeasurement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}