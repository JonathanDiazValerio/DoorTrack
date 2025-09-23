import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, Save } from "lucide-react";
import { parseFraction } from "@/utils/fractionParser";

interface MeasurementFormProps {
  clientName: string | null;
  onSaveMeasurement: (width: number, height: number) => void;
  disabled?: boolean;
}

export default function MeasurementForm({ 
  clientName, 
  onSaveMeasurement, 
  disabled = false 
}: MeasurementFormProps) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [widthError, setWidthError] = useState("");
  const [heightError, setHeightError] = useState("");

  const validateInput = (value: string, setError: (error: string) => void) => {
    if (!value.trim()) {
      setError("");
      return null;
    }
    
    const parsed = parseFraction(value);
    if (parsed === null) {
      setError("Invalid format");
      return null;
    }
    
    if (parsed <= 0) {
      setError("Must be greater than 0");
      return null;
    }
    
    setError("");
    return parsed;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const widthNum = validateInput(width, setWidthError);
    const heightNum = validateInput(height, setHeightError);
    
    if (widthNum !== null && heightNum !== null && widthNum > 0 && heightNum > 0) {
      onSaveMeasurement(widthNum, heightNum);
      setWidth("");
      setHeight("");
      setWidthError("");
      setHeightError("");
      console.log('Measurement saved:', { width: widthNum, height: heightNum });
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
                <Label htmlFor="width">Width (inches)</Label>
                <Input
                  id="width"
                  type="text"
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                    if (e.target.value.trim()) {
                      validateInput(e.target.value, setWidthError);
                    } else {
                      setWidthError("");
                    }
                  }}
                  placeholder="e.g. 36, 36.5, 36 1/2"
                  disabled={disabled}
                  data-testid="input-width"
                  className={widthError ? "border-destructive" : ""}
                />
                {widthError && (
                  <p className="text-xs text-destructive mt-1">{widthError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="text"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    if (e.target.value.trim()) {
                      validateInput(e.target.value, setHeightError);
                    } else {
                      setHeightError("");
                    }
                  }}
                  placeholder="e.g. 84, 84.5, 84 1/4"
                  disabled={disabled}
                  data-testid="input-height"
                  className={heightError ? "border-destructive" : ""}
                />
                {heightError && (
                  <p className="text-xs text-destructive mt-1">{heightError}</p>
                )}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Formats: whole numbers (36), decimals (36.5), or fractions (36 1/2, 3/4)
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={disabled || !width.trim() || !height.trim() || widthError !== "" || heightError !== ""}
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