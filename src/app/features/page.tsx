'use client';

import { useState } from 'react';
import {
  FiHeart,
  FiShield,
  FiZap,
  FiUsers,
  FiAward,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

const features = [
  {
    icon: <FiHeart className="w-8 h-8 text-yellow-400" />,
    title: 'Lifesteal Mechanics',
    description:
      'Gain hearts by defeating other players and lose them when you die — high stakes create thrilling PvP encounters.',
  },
  {
    icon: <FiShield className="w-8 h-8 text-yellow-400" />,
    title: 'Balanced Combat',
    description:
      'Carefully tuned PvP settings to ensure fair fights — no overpowered gear or unfair pay-to-win mechanics.',
  },
  {
    icon: <FiZap className="w-8 h-8 text-yellow-400" />,
    title: 'Custom Abilities',
    description:
      'Unlock unique kits, powers, or effects that add spice to the battlefield while keeping things competitive.',
  },
  {
    icon: <FiUsers className="w-8 h-8 text-yellow-400" />,
    title: 'Active Player Base',
    description:
      'Jump into a lively server where duels, raids, and alliances are happening around the clock.',
  },
  {
    icon: <FiAward className="w-8 h-8 text-yellow-400" />,
    title: 'Weekly Events & Rewards',
    description:
      'Participate in custom events, challenges, and seasonal competitions with real rewards for top players.',
  },
];

const benefits = [
  'Crossplay support — join from Java or Bedrock.',
  'No pay-to-win kits or unfair perks.',
  'Fast anti-cheat system to stop hackers instantly.',
  'Earn ranks through gameplay, not just purchases.',
  'Tight-knit PvP-focused community.',
];

const faqs = [
  {
    question: 'Can I play on both Java and Bedrock editions?',
    answer:
      'Yes! JavaPVP supports crossplay, allowing players from Java and Bedrock to play together seamlessly.',
  },
  {
    question: 'What happens when I lose all my hearts?',
    answer:
      'You’ll be temporarily banned for a short period (e.g. 24 hours), after which you can rejoin with a fresh start or buy back in-game.',
  },
  {
    question: 'Are there any pay-to-win features?',
    answer:
      'No. All competitive aspects are strictly fair. Cosmetic perks may be available, but no gameplay advantages.',
  },
  {
    question: 'How often are events held?',
    answer:
      'We host weekly events such as kill races, team battles, and loot hunts — often with seasonal leaderboards.',
  },
];

export default function Features() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  }

  return (
    <main className="min-h-screen text-white px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-yellow-400">
        Features & Benefits
      </h1>

      <p className="max-w-3xl mx-auto mb-12 text-center text-gray-300 leading-relaxed text-lg">
        JavaPVP is a competitive Lifesteal Minecraft server built for serious PvPers and casual grinders alike. Every fight matters, every heart counts.
      </p>

      {/* Features Grid */}
      <section className="grid gap-10 md:grid-cols-2 mb-16">
        {features.map(({ icon, title, description }) => (
          <div key={title} className="flex items-start gap-5 p-4 rounded-md hover:bg-gray-800 transition">
            <div>{icon}</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Why Choose Us?</h2>
        <ul className="max-w-xl mx-auto list-disc list-inside space-y-3 text-gray-300 text-lg">
          {benefits.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-yellow-400 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, idx) => {
            const isOpen = idx === openFaqIndex;
            return (
              <div
                key={idx}
                className="bg-gray-800 rounded-md p-4 cursor-pointer select-none"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{question}</h3>
                  {isOpen ? (
                    <FiChevronUp className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 text-yellow-400" />
                  )}
                </div>
                {isOpen && (
                  <p className="mt-3 text-gray-300 leading-relaxed">{answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-yellow-400">
          Ready to join?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Connect to JavaPVP today and dive into the most intense Lifesteal PvP experience out there.
        </p>
        <a
          href="minecraft://play.javapvp.xyz"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 transition text-white font-semibold px-8 py-3 rounded-lg"
        >
          Join Now
        </a>
      </section>
    </main>
  );
}