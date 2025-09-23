import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, User } from "lucide-react";

interface Client {
  id: string;
  name: string;
  createdAt: string;
}

interface ClientSelectorProps {
  selectedClient: Client | null;
  onClientSelect: (client: Client) => void;
  clients: Client[];
  onAddClient: (name: string) => void;
}

export default function ClientSelector({ 
  selectedClient, 
  onClientSelect, 
  clients, 
  onAddClient 
}: ClientSelectorProps) {
  const [newClientName, setNewClientName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClient = () => {
    if (newClientName.trim()) {
      onAddClient(newClientName.trim());
      setNewClientName("");
      setIsDialogOpen(false);
      console.log('Client added:', newClientName);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">Select Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedClient && (
          <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground" data-testid="text-selected-client">
                {selectedClient.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Selected client
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          {clients.map((client) => (
            <Button
              key={client.id}
              variant={selectedClient?.id === client.id ? "secondary" : "ghost"}
              className="w-full justify-start p-3 h-auto"
              onClick={() => {
                onClientSelect(client);
                console.log('Client selected:', client.name);
              }}
              data-testid={`button-select-client-${client.id}`}
            >
              <User className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  Added {new Date(client.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" data-testid="button-add-client">
              <Plus className="w-4 h-4 mr-2" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Enter client name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddClient();
                    }
                  }}
                  data-testid="input-client-name"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel-client"
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleAddClient}
                  disabled={!newClientName.trim()}
                  data-testid="button-save-client"
                >
                  Add Client
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}