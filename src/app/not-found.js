"use client";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Page not found</h1>
      <p className="text-gray-700">The page could not be loaded. Please check the URL or contact support.</p>
    </div>
  );
}
