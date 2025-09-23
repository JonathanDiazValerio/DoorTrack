import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, User, Trash2, Search } from "lucide-react";
import { formatPhoneNumber, isValidPhoneNumber } from "@/utils/phoneFormatter";

interface Client {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface ClientSelectorProps {
  selectedClient: Client | null;
  onClientSelect: (client: Client) => void;
  clients: Client[];
  onAddClient: (name: string, phone: string) => void;
  onDeleteClient: (clientId: string) => void;
}

export default function ClientSelector({ 
  selectedClient, 
  onClientSelect, 
  clients, 
  onAddClient,
  onDeleteClient
}: ClientSelectorProps) {
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleAddClient = () => {
    if (newClientName.trim() && isValidPhoneNumber(newClientPhone)) {
      onAddClient(newClientName.trim(), newClientPhone);
      setNewClientName("");
      setNewClientPhone("");
      setPhoneError("");
      setIsDialogOpen(false);
      console.log('Client added:', newClientName, newClientPhone);
    }
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) {
      setPhoneError("");
      return;
    }
    
    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else {
      setPhoneError("");
    }
  };

  // Filter clients based on search query (name or phone)
  const filteredClients = clients.filter(client => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const nameMatch = client.name.toLowerCase().includes(query);
    
    // Only do phone matching if the query contains digits
    const queryDigits = query.replace(/\D/g, '');
    const phoneMatch = queryDigits.length > 0 ? 
      client.phone.replace(/\D/g, '').includes(queryDigits) : false;
    
    return nameMatch || phoneMatch;
  });

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">Select Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-clients"
          />
        </div>
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
          {filteredClients.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {searchQuery.trim() ? 'No clients found matching your search' : 'No clients added yet'}
            </div>
          ) : (
            filteredClients.map((client) => (
              <div key={client.id} className="flex items-center gap-2">
                <Button
                  variant={selectedClient?.id === client.id ? "secondary" : "ghost"}
                  className="flex-1 justify-start p-3 h-auto"
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
                      {client.phone} • Added {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    data-testid={`button-delete-client-${client.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Client</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{client.name}" ({client.phone})? This will also remove all measurements for this client. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid={`button-cancel-delete-${client.id}`}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDeleteClient(client.id);
                        console.log('Client deleted:', client.name);
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      data-testid={`button-confirm-delete-${client.id}`}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
          )}
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
                    if (e.key === 'Enter' && !phoneError) {
                      handleAddClient();
                    }
                  }}
                  data-testid="input-client-name"
                />
              </div>
              
              <div>
                <Label htmlFor="client-phone">Phone Number</Label>
                <Input
                  id="client-phone"
                  value={newClientPhone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setNewClientPhone(formatted);
                    validatePhone(formatted);
                  }}
                  placeholder="(555) 123-4567"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !phoneError) {
                      handleAddClient();
                    }
                  }}
                  data-testid="input-client-phone"
                  className={phoneError ? "border-destructive" : ""}
                />
                {phoneError && (
                  <p className="text-xs text-destructive mt-1">{phoneError}</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setNewClientName("");
                    setNewClientPhone("");
                    setPhoneError("");
                  }}
                  data-testid="button-cancel-client"
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleAddClient}
                  disabled={!newClientName.trim() || !isValidPhoneNumber(newClientPhone)}
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