'use client';

export default function Rules() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-blue-400 text-center">
        Server Rules
      </h1>

      <section className="mb-8">
        <p className="text-gray-300 leading-relaxed text-lg">
          To keep the server fun and fair for everyone, please follow these rules at all times. Breaking these rules may result in warnings, kicks, or bans depending on the severity.
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-blue-500 pb-1">
            1. Respect Others
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>No harassment, hate speech, or discrimination.</li>
            <li>Treat all players and staff with respect.</li>
            <li>No spamming or disruptive behavior.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-blue-500 pb-1">
            2. No Cheating or Exploits
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>No use of mods, hacks, or any third-party software to gain unfair advantage.</li>
            <li>Do not abuse glitches or bugs. Report them instead.</li>
            <li>No unauthorized duplication of items or currency.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-blue-500 pb-1">
            3. Building & Griefing
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Respect other players' builds and property.</li>
            <li>No griefing, stealing, or destroying others’ creations.</li>
            <li>Ask for permission before modifying shared or public areas.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-blue-500 pb-1">
            4. Chat Rules
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Keep chat friendly and appropriate for all ages.</li>
            <li>No advertising other servers or websites.</li>
            <li>Use English primarily to help staff moderate efficiently.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-blue-500 pb-1">
            5. Follow Staff Instructions
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Staff decisions are final. Respect their requests and warnings.</li>
            <li>If you have concerns, please contact staff privately and politely.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 p-6 bg-gray-800 rounded-lg text-center border border-blue-600">
        <h3 className="text-xl font-bold text-red-400 mb-3">Consequences</h3>
        <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
          Violating the rules can result in warnings, temporary kicks, temporary or permanent bans depending on the severity of the offense. We want everyone to have a great time, so please play fair and respect the community.
        </p>
      </section>
    </main>
  );
}
