import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, Save } from "lucide-react";

interface MeasurementFormProps {
  clientName: string | null;
  onSaveMeasurement: (height: number, width: number) => void;
  disabled?: boolean;
}

export default function MeasurementForm({ 
  clientName, 
  onSaveMeasurement, 
  disabled = false 
}: MeasurementFormProps) {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const heightNum = parseFloat(height);
    const widthNum = parseFloat(width);
    
    if (heightNum > 0 && widthNum > 0) {
      onSaveMeasurement(heightNum, widthNum);
      setHeight("");
      setWidth("");
      console.log('Measurement saved:', { height: heightNum, width: widthNum });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Ruler className="w-4 h-4" />
          Add Measurement
        </CardTitle>
        {clientName && (
          <p className="text-sm text-muted-foreground">
            For {clientName}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {!clientName ? (
          <div className="text-center py-8">
            <Ruler className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Select a client to add measurements
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.01"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="0.00"
                  disabled={disabled}
                  data-testid="input-height"
                />
              </div>
              <div>
                <Label htmlFor="width">Width (inches)</Label>
                <Input
                  id="width"
                  type="number"
                  step="0.01"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="0.00"
                  disabled={disabled}
                  data-testid="input-width"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={disabled || !height || !width || parseFloat(height) <= 0 || parseFloat(width) <= 0}
              data-testid="button-save-measurement"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Measurement
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}