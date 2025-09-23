import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ruler, Clock } from "lucide-react";

interface Measurement {
  id: string;
  height: string;
  width: string;
  createdAt: string;
}

interface MeasurementListProps {
  measurements: Measurement[];
  clientName: string | null;
}

export default function MeasurementList({ measurements, clientName }: MeasurementListProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Ruler className="w-4 h-4" />
          Measurement History
          {measurements.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {measurements.length}
            </Badge>
          )}
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
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Select a client to view measurement history
            </p>
          </div>
        ) : measurements.length === 0 ? (
          <div className="text-center py-8">
            <Ruler className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No measurements recorded yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Add your first measurement above
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {measurements.map((measurement) => (
              <div 
                key={measurement.id} 
                className="p-3 bg-muted/50 rounded-md border"
                data-testid={`measurement-${measurement.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">W:</span>
                        <span className="font-mono text-sm" data-testid={`text-width-${measurement.id}`}>
                          {measurement.width}"
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">H:</span>
                        <span className="font-mono text-sm" data-testid={`text-height-${measurement.id}`}>
                          {measurement.height}"
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span data-testid={`text-timestamp-${measurement.id}`}>
                        {formatDateTime(measurement.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}