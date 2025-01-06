import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface AnalysisResultsProps {
  data: {
    username: string;
    verified?: boolean;
    created_at?: string;
    name?: string;
    description?: string;
    note?: string;
    confidence: number;
  };
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const accountAge = data.created_at 
    ? formatDistanceToNow(new Date(data.created_at), { addSuffix: true })
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">@{data.username}</h2>
            {data.verified && (
              <BadgeCheck className="h-5 w-5 text-primary" />
            )}
          </div>
          {data.name && (
            <p className="text-sm text-muted-foreground">{data.name}</p>
          )}
        </div>
        {data.verified && (
          <Badge variant="secondary">Verified Account</Badge>
        )}
      </div>

      {data.description && (
        <p className="text-sm text-muted-foreground">{data.description}</p>
      )}

      {accountAge && (
        <p className="text-sm text-muted-foreground">
          Account created {accountAge}
        </p>
      )}

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Account Information</AlertTitle>
        <div className="space-y-1">
          <div>Recent name changes: None</div>
          <div>Confidence score: {data.confidence}%</div>
        </div>
        {data.note && (
          <AlertDescription className="mt-2">
            <p className="text-sm text-muted-foreground">
              Note: {data.note}
            </p>
          </AlertDescription>
        )}
      </Alert>
    </div>
  );
}