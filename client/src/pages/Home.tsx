import { AccountSearch } from "@/components/AccountSearch";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ApiUsageHeatmap } from "@/components/ApiUsageHeatmap";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { useState } from "react";
import { SiX, SiTelegram } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Sparkles, Twitter, Github, Copy, Check, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const contractAddress = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // Solana contract address placeholder

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <InteractiveBackground />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-16">
        {/* Header Section with enhanced gradient */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/3 to-transparent rounded-3xl -z-10" />
          <div className="flex items-center justify-center mb-6 gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-background rounded-lg p-3">
                <SiX className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              xScanner
            </h1>
          </div>

          {/* Social Links with improved spacing */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="hover:bg-primary/5" asChild>
                <a href="https://twitter.com/xScannerSOL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary/5" asChild>
                <a href="https://t.me/xScannerSOL_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <SiTelegram className="h-4 w-4" />
                  Telegram
                </a>
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary/5" asChild>
                <a href="https://github.com/xScannerSOL/xScanner" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>

            {/* Contract Address with enhanced style */}
            <div className="flex items-center gap-3 max-w-md bg-muted/50 rounded-lg p-2">
              <code className="px-3 py-1.5 rounded bg-background font-mono text-sm">
                {contractAddress}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className={cn(
                  "h-8 w-8 transition-colors",
                  copied ? "text-green-500" : "hover:text-primary"
                )}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your comprehensive social media intelligence platform. Track and analyze crypto influencers, 
            corporate accounts, and industry leaders with real-time insights and advanced analytics.
          </p>
        </div>

        {/* Features Section with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative flex flex-col items-center gap-4 p-6 h-full rounded-lg bg-background/95 backdrop-blur-sm">
              <Shield className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Track username changes and detect potential account compromises instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative flex flex-col items-center gap-4 p-6 h-full rounded-lg bg-background/95 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h3 className="font-semibold mb-2">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered verification system with deep pattern recognition.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
            <div className="relative flex flex-col items-center gap-4 p-6 h-full rounded-lg bg-background/95 backdrop-blur-sm">
              <BarChart2 className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive insights and detailed reporting tools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Search Card */}
        <Card className="max-w-2xl mx-auto border-2 shadow-lg bg-background/95 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Analyze Account</h2>
              <p className="text-muted-foreground">
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
        <div className="max-w-4xl mx-auto mt-16">
          <ApiUsageHeatmap />
        </div>
      </div>
    </div>
  );
}