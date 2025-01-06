import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function AssetsDownload() {
  const assets = [
    {
      name: "Logo (Vector)",
      description: "Animated 400x400 SVG with scanning effect",
      file: "/assets/logo.svg",
      preview: "/assets/logo.svg",
      dimensions: "400x400"
    },
    {
      name: "Banner (Vector)",
      description: "Animated 1500x500 SVG with scanning effect",
      file: "/assets/banner.svg",
      preview: "/assets/banner.svg",
      dimensions: "1500x500"
    }
  ];

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Twitter Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          {assets.map((asset) => (
            <motion.div
              key={asset.file}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors">
                {/* Asset Preview */}
                <div className="relative mb-4">
                  <div className="aspect-video rounded-md overflow-hidden border bg-white">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={asset.preview}
                        alt={`Preview of ${asset.name}`}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                  </div>
                  {/* Dimensions Badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-mono">
                    {asset.dimensions}
                  </div>
                </div>

                {/* Asset Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {asset.description}
                    </p>
                  </div>

                  {/* Download Button */}
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={asset.file}
                      download
                      className="flex items-center justify-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Asset
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}