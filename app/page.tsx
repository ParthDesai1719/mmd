export default function HomePage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to MeltMagic Drive</h1>
      <p className="mb-6">A lightweight file sharing app using UploadThing + Cloudflare R2.</p>
      <a href="/upload" className="text-blue-600 underline">Go to Upload Page</a>
    </main>
  );
}