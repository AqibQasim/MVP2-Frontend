"use client";
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 mb-4">{error?.message}</pre>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => reset()}>Try again</button>
    </div>
  );
}
