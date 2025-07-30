import ServerStatus from "./server-status";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 max-w-3xl mx-auto text-center">
      <h1 className="text-6xl font-extrabold mb-6 tracking-wide">
        Stride <span className="text-yellow-400">SMP</span>
      </h1>

      <p className="text-xl text-gray-300 mb-10 max-w-lg">
        A custom Lifesteal Minecraft server with a vibrant community, unique
        gameplay mechanics, epic plugins, and engaging events.
      </p>

      <ServerStatus />

      {/* How to Connect */}
      <section className="mt-14 max-w-xl mx-auto text-left text-gray-300 space-y-5">
        <h2 className="text-3xl font-semibold mb-4 text-white">🎮 Ready to Join?</h2>

        <p>Use the IP address and port below to connect — we can’t wait to see you online!</p>

        <p>
          <strong>Java Edition:</strong> Compatible with Minecraft Java Edition 1.15 and above.
        </p>

        <p>
          <strong>Bedrock Edition:</strong> Supports crossplay via bridging for Windows 10, Xbox, mobile, and other devices.
        </p>

        <p className="text-gray-500 text-sm italic mt-3">
          Note: Some plugins or features may be limited on Bedrock edition.
        </p>

        {/* Server Info */}
        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-300 text-lg text-left">
          <dt className="font-semibold text-yellow-400">IP Address:</dt>
          <dd className="font-mono select-all cursor-text">play.stridesmp.xyz</dd>

          <dt className="font-semibold text-yellow-400">Port:</dt>
          <dd className="font-mono select-all cursor-text">19132</dd>
        </dl>
      </section>
    </section>
  );
}