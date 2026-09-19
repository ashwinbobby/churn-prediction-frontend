'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const prediction = searchParams.get('prediction') || 'Unknown';
  const probability = searchParams.get('probability') || 'N/A';

  const isChurn = prediction.toLowerCase().includes('yes') || prediction.toLowerCase().includes('true');

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-gray-200 rounded-2xl shadow-xl text-center flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-900">Prediction Result</h2>
      
      <div className={`p-6 rounded-xl ${isChurn ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
        <p className="text-sm font-semibold uppercase tracking-wider mb-1">Customer Churn Status:</p>
        <p className="text-sm font-semibold uppercase tracking-wider mb-1">{prediction}</p>
        {probability !== 'N/A' && (
          <p className="text-sm mt-2">Probability: {(parseFloat(probability) * 100).toFixed(1)}%</p>
        )}
        <p className="text-3xl font-extrabold">
            {isChurn ? 'Call this customer!' : 'No action required'}
        </p>
        
      </div>

      <Link
        href="/"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200 shadow-md inline-block"
      >
        Make Another Prediction
      </Link>
    </div>
  );
}

// Wrap in Suspense as required by Next.js when using useSearchParams in client components
export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading results...</div>}>
      <ResultContent />
    </Suspense>
  );
}