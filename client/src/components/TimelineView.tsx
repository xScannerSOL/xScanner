import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";

interface TimelineProps {
  data: Array<{
    name: string;
    timestamp: string;
  }>;
}

export function TimelineView({ data }: TimelineProps) {
  const numberOfChanges = data.length - 1; // Subtract 1 as the first entry is current name
  const mostRecentChange = data[1] ? new Date(data[1].timestamp) : null;
  const timeAgo = mostRecentChange 
    ? formatDistanceToNow(mostRecentChange, { addSuffix: true })
    : 'No recent changes';

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Username Timeline</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Username changes:</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <InfoIcon className="h-4 w-4" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Username History</h4>
              <div className="text-sm">
                <p>Number of changes: {numberOfChanges}</p>
                <p>Last changed: {timeAgo}</p>
              </div>
              {numberOfChanges > 0 && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Previous names:</p>
                  <ul className="text-xs mt-1 space-y-1">
                    {data.slice(1).map((item, index) => (
                      <li key={index}>@{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </Card>
  );
}