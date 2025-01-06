import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search, Loader2 } from "lucide-react";

type SearchFormData = {
  username: string;
};

interface AccountSearchProps {
  onAnalysisComplete: (data: any) => void;
}

export function AccountSearch({ onAnalysisComplete }: AccountSearchProps) {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>();

  const analyzeMutation = useMutation({
    mutationFn: async (username: string) => {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      
      if (!res.ok) {
        throw new Error('Failed to analyze account');
      }
      
      return res.json();
    },
    onSuccess: (data) => {
      onAnalysisComplete(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to analyze account. Please try again.",
        variant: "destructive"
      });
    }
  });

  return (
    <form onSubmit={handleSubmit((data) => analyzeMutation.mutate(data.username))} 
          className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            {...register("username", { required: "Username is required" })}
            placeholder="Enter Twitter username"
            className="w-full"
          />
          {errors.username && (
            <p className="text-sm text-destructive mt-1">{errors.username.message}</p>
          )}
        </div>
        <Button 
          type="submit" 
          disabled={analyzeMutation.isPending}
        >
          {analyzeMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Analyze
        </Button>
      </div>
    </form>
  );
}
