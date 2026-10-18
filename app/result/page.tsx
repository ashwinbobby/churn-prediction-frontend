import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  const payload = {
    ...params,
    SeniorCitizen: Number(params.SeniorCitizen),
    tenure: Number(params.tenure),
    MonthlyCharges: Number(params.MonthlyCharges),
    TotalCharges: Number(params.TotalCharges),
  };

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Prediction failed");
  const result = await res.json();

  const prediction: string = String(result.churn_prediction ?? "Unknown");
  const probability: number | null =
    result.churn_probability != null ? Number(result.churn_probability) : null;

  const isChurn =
    prediction.toLowerCase().includes("yes") ||
    prediction.toLowerCase().includes("true");

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-gray-200 rounded-2xl shadow-xl text-center flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-900">Prediction Result</h2>
      <div
        className={`p-6 rounded-xl ${
          isChurn
            ? "bg-red-50 text-red-700 border border-red-200"
            : "bg-green-50 text-green-700 border border-green-200"
        }`}
      >
        <p className="text-sm font-semibold uppercase tracking-wider mb-1">
          Customer Churn Status:
        </p>
        <p className="text-sm font-semibold uppercase tracking-wider mb-1">
          {prediction}
        </p>
        {probability !== null && !Number.isNaN(probability) && (
          <p className="text-sm mt-2">
            Probability: {(probability * 100).toFixed(1)}%
          </p>
        )}
        <p className="text-3xl font-extrabold">
          {isChurn ? "Call this customer!" : "No action required"}
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