'use client';

export default function Rules() {
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 text-center">
        Server Rules
      </h1>

      <section className="mb-8">
        <p className="text-gray-300 leading-relaxed text-lg">
          JavaPVP is a competitive Lifesteal server, but that doesn’t mean chaos. These rules ensure fair gameplay and a good time for everyone. Breaking them may lead to kicks, tempbans, or permanent bans depending on severity.
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-500 pb-1">
            1. No Hacking or Cheating
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Absolutely no hacked clients or unfair modifications.</li>
            <li>Autoclickers, x-ray, kill aura, or any external advantages are strictly forbidden.</li>
            <li>Use of ghost clients or macros is not allowed.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-500 pb-1">
            2. No Duping or Exploits
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Item duplication or economy exploits will result in instant bans.</li>
            <li>Report bugs or unintended mechanics to staff—don’t abuse them.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-500 pb-1">
            3. PvP Ethics
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Trapping is allowed, but must be escapable. No inescapable kill traps.</li>
            <li>Combat logging (disconnecting to avoid death) is not tolerated.</li>
            <li>Spawn camping or unfair teaming can result in warnings or punishment.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-500 pb-1">
            4. Chat Behavior
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>No hate speech, slurs, or harassment of any kind.</li>
            <li>Trash talk is okay—but keep it within reason. No doxxing, threats, or personal attacks.</li>
            <li>No excessive spam, advertisement, or self-promotion.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3 border-b border-yellow-500 pb-1">
            5. Respect the Staff & Community
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Staff decisions are final. If you have an issue, report it calmly.</li>
            <li>Do not impersonate staff or attempt to deceive players.</li>
            <li>Toxicity toward staff will lead to punishment. Don't test it.</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 p-6 bg-gray-800 rounded-lg text-center border border-yellow-600">
        <h3 className="text-xl font-bold text-red-400 mb-3">Consequences</h3>
        <p className="text-gray-300 max-w-xl mx-auto leading-relaxed">
          Depending on the offense, you may receive a warning, kick, tempban, or permanent ban. This is a hardcore PvP server—but it’s still a community. Don’t ruin it for others.
        </p>
      </section>
    </main>
  );
}