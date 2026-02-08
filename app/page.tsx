import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Engineer-Grok
          </h1>
          <p className="text-gray-400">
            Professional AI Engineering Assistant
          </p>
        </header>
        <ChatInterface />
      </div>
    </main>
  );
}
