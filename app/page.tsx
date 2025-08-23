'use client';

import { abi } from '@/lib/erc721-abi';
import { useState } from 'react';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Loading } from '@/components/loading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';

interface MemoryResult {
  image: string;
  title: string;
  caption: string;
}

export default function Home() {
  const { isConnected, address } = useAccount();

  const [memoryText, setMemoryText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MemoryResult | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: hash,
    isPending: isMinting,
    writeContract,
    error: mintError,
    reset: resetMint,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleGenerateMemory = async () => {
    if (!memoryText.trim()) return;
    setError(null);
    setResult(null);
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memoryText }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image.');
      }
      const data: MemoryResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMint = async () => {
    if (!result || !address) return;
    setIsUploading(true);
    setError(null);
    try {
      const response = await fetch('/api/upload-to-ipfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: `data:image/png;base64,${result.image}`,
          title: result.title,
          caption: result.caption,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload metadata.');
      }
      const { metadataUri } = await response.json();
      setIsUploading(false);
      writeContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi,
        functionName: 'mintTo',
        args: [address, metadataUri],
      });
    } catch (err: any) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  const handleStartNewMemory = () => {
    setResult(null);
    setError(null);
    setMemoryText('');
    resetMint();
  };

  const isLoading = isGenerating || isUploading || isMinting || isConfirming;

  const renderContent = () => {
    if (!isConnected) {
      return (
        <div className="animate-in fade-in-50 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Connect your wallet to your memories to relive the past.
          </h1>
        </div>
      );
    }

    if (isLoading) {
      let loadingText = '';
      if (isGenerating) loadingText = 'Generating your memory...';
      if (isUploading) loadingText = 'Uploading to IPFS...';
      if (isMinting) loadingText = 'Waiting for wallet confirmation...';
      if (isConfirming) loadingText = 'Confirming transaction...';
      return (
        <div className="flex flex-col items-center gap-4 text-center">
          <Loading text={loadingText} />
          <p className="text-muted-foreground text-sm">(This can take a moment)</p>
        </div>
      );
    }

    if (error || mintError) {
      return (
        <div className="animate-in fade-in-50 w-full max-w-md">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || mintError?.message}</AlertDescription>
          </Alert>
          <Button onClick={handleStartNewMemory} variant="secondary" className="mt-4 w-full">
            Start Over
          </Button>
        </div>
      );
    }

    if (isConfirmed) {
      return (
        <Card className="animate-in fade-in-50 w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Mint Successful!</CardTitle>
            <CardDescription>Your memory is now an NFT on the blockchain.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary rounded-lg p-4">
              <Link
                href={`https://sepolia.shapescan.xyz/tx/${hash}`}
                target="_blank"
                className="text-primary underline hover:opacity-80"
              >
                View Transaction on ShapeScan
              </Link>{' '}
              {}
            </div>
            <Button onClick={handleStartNewMemory} className="w-full">
              Create Another Memory
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (result) {
      return (
        <Card className="animate-in fade-in-50 w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{result.title}</CardTitle>
            <CardDescription>{result.caption}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={`data:image/png;base64,${result.image}`}
                alt={result.title}
                width={1024}
                height={1024}
                className="aspect-square object-cover"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button onClick={handleMint} className="w-full" size="lg" disabled={isLoading}>
                Mint as NFT
              </Button>
              <Button
                onClick={handleGenerateMemory}
                variant="secondary"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                Regenerate
              </Button>
              <Button
                onClick={handleStartNewMemory}
                variant="outline"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                New Memory
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="animate-in fade-in-50 w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Make a New Memory</CardTitle>
          <CardDescription>
            Write down today's memory. It can be up to 2000 characters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={memoryText}
            onChange={(e) => setMemoryText(e.target.value)}
            placeholder="Write down your memory from today..."
            maxLength={2000}
            className="min-h-[180px] resize-none text-base"
            disabled={isLoading}
          />
          <Button
            onClick={handleGenerateMemory}
            size="lg"
            className="w-full"
            disabled={isLoading || !memoryText.trim()}
          >
            Make a memory!
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-8 p-4 text-center">
      {renderContent()}
    </div>
  );
}
