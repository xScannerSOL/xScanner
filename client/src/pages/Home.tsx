import { AccountSearch } from "@/components/AccountSearch";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ApiUsageHeatmap } from "@/components/ApiUsageHeatmap";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { useState } from "react";
import { SiX, SiTelegram } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Twitter, Github, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type AnalysisData = {
  username: string;
  previousUsernames: Array<{
    name: string;
    timestamp: string;
  }>;
  isReused: boolean;
  confidence: number;
};

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x1234...5678"; // Replace with actual contract address

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <InteractiveBackground />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4 gap-3">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-background rounded-lg p-2">
                <SiX className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              xCheck
            </h1>
          </div>

          {/* Social Links and Contract */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {/* Social Links */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href="https://twitter.com/xCheckSOL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://t.me/xCheckSOL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <SiTelegram className="h-4 w-4" />
                  Telegram
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/xCheckSOL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Contract Address */}
            <div className="flex items-center gap-2 max-w-md">
              <code className="px-3 py-1 rounded bg-muted font-mono text-sm">
                {contractAddress}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive social media intelligence platform. Track and analyze crypto influencers, 
            corporate accounts, and industry leaders with real-time insights and advanced analytics.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="group relative h-[140px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative flex items-start gap-3 p-4 h-full rounded-lg bg-background/95 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Track username changes and detect potential account compromises as they happen. 
                  Our advanced monitoring system provides instant alerts.
                </p>
              </div>
            </div>
          </div>
          <div className="group relative h-[140px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative flex items-start gap-3 p-4 h-full rounded-lg bg-background/95 backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI-powered verification system with deep pattern recognition. 
                  Our intelligent algorithms provide comprehensive insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-2xl mx-auto border-2 shadow-lg bg-background/95 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Analyze Account</h2>
              <p className="text-sm text-muted-foreground">
                Enter a Twitter username to check its authenticity and track its history.
              </p>
            </div>

            <AccountSearch onAnalysisComplete={setAnalysisData} />

            {analysisData && (
              <div className="mt-8 pt-6 border-t">
                <AnalysisResults data={analysisData} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* API Usage Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <ApiUsageHeatmap />
        </div>
      </div>
    </div>
  );
}