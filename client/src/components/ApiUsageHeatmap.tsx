import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function ApiUsageHeatmap() {
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ["/api/usage"],
    refetchInterval: 60000, // Refresh every minute
  });

  if (isLoading) {
    return (
      <Card className="border-2">
        <CardContent className="pt-6 flex items-center justify-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-destructive">
            <Activity className="h-5 w-5" />
            <p>Failed to load API usage data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentHour = new Date().getHours();

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          API Usage Today ({currentHour > 0 ? "Last " + currentHour + " hours" : "This hour"})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="h-[300px] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={usageData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="usage" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor="hsl(var(--primary))" 
                    stopOpacity={0.3}
                  />
                  <stop 
                    offset="95%" 
                    stopColor="hsl(var(--primary))" 
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <linearGradient id="usageLine" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor="hsl(var(--primary))" 
                    stopOpacity={1}
                  />
                  <stop 
                    offset="95%" 
                    stopColor="hsl(var(--primary))" 
                    stopOpacity={0.5}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted/30" 
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                tickFormatter={(hour) => `${hour.toString().padStart(2, '0')}:00`}
                className="text-xs text-muted-foreground"
                tickLine={false}
                axisLine={false}
                dy={10}
                domain={[0, currentHour]}
                type="number"
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                className="text-xs text-muted-foreground"
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-card p-3 shadow-xl animate-in fade-in-0 zoom-in-95">
                        <p className="text-sm font-medium mb-1">
                          {payload[0].payload.hour.toString().padStart(2, '0')}:00 - {(payload[0].payload.hour + 1).toString().padStart(2, '0')}:00
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          API Utilization
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="url(#usageLine)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#usage)"
                animationDuration={1000}
                dot={false}
                activeDot={{
                  r: 4,
                  className: "fill-primary stroke-background stroke-2"
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}