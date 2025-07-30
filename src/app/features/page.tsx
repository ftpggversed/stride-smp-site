'use client';

import { useState } from 'react';
import { FiCheckCircle, FiLayers, FiLock, FiTrendingUp, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const features = [
  {
    icon: <FiCheckCircle className="w-8 h-8 text-blue-500" />,
    title: 'Reliable Uptime',
    description:
      'Our servers guarantee maximum uptime and consistent performance to keep you connected at all times. Experience minimal latency and no unexpected downtime.',
  },
  {
    icon: <FiUsers className="w-8 h-8 text-blue-500" />,
    title: 'Active Community',
    description:
      'Join a vibrant, friendly, and supportive player base where collaboration and competition thrive in a welcoming environment.',
  },
  {
    icon: <FiLock className="w-8 h-8 text-blue-500" />,
    title: 'Secure & Private',
    description:
      'We prioritize your privacy and security with robust encryption and strict data protection policies to keep your information safe.',
  },
  {
    icon: <FiLayers className="w-8 h-8 text-blue-500" />,
    title: 'Cross-Platform Support',
    description:
      'Seamlessly connect from both Java and Bedrock editions, so you can play with friends no matter what device you use.',
  },
  {
    icon: <FiTrendingUp className="w-8 h-8 text-blue-500" />,
    title: 'Continuous Updates',
    description:
      'Enjoy regular updates packed with new features, bug fixes, and optimizations to keep your gameplay fresh and smooth.',
  },
];

const benefits = [
  '24/7 customer support with fast response times.',
  'Custom plugins to enhance gameplay experience.',
  'Optimized server hardware for peak performance.',
  'Easy server management with intuitive control panels.',
  'Community events, giveaways, and exclusive content.',
];

const faqs = [
  {
    question: 'Can I play on both Java and Bedrock editions?',
    answer:
      'Yes! Our server supports both editions seamlessly, allowing players across platforms to connect and play together.',
  },
  {
    question: 'What is the server uptime guarantee?',
    answer:
      'We maintain a 99.9% uptime guarantee, with constant monitoring and fast issue resolution to keep the server live.',
  },
  {
    question: 'How often do you release updates?',
    answer:
      'We release major updates quarterly, with minor patches and fixes rolled out as needed.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'Absolutely. We adhere to strict security standards and encrypt sensitive data to protect your privacy.',
  },
];

export default function Features() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  }

  return (
    <main className="min-h-screen text-white px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-400">
        Features & Benefits
      </h1>

      <p className="max-w-3xl mx-auto mb-12 text-center text-gray-300 leading-relaxed text-lg">
        Discover why our Minecraft server is the perfect place for players looking for reliability, community, and cutting-edge features. Whether you’re a casual gamer or a hardcore enthusiast, we have something for everyone.
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
        <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">Why Choose Us?</h2>
        <ul className="max-w-xl mx-auto list-disc list-inside space-y-3 text-gray-300 text-lg">
          {benefits.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center">Frequently Asked Questions</h2>
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
                    <FiChevronUp className="w-6 h-6 text-blue-400" />
                  ) : (
                    <FiChevronDown className="w-6 h-6 text-blue-400" />
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
        <h2 className="text-3xl font-extrabold mb-4 text-blue-400">
          Ready to join?
        </h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Connect with us today and experience a Minecraft server designed with players in mind.
        </p>
        <a
          href="minecraft://play.stridesmp.xyz"
          className="inline-block bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-8 py-3 rounded-lg"
        >
          Join Now
        </a>
      </section>
    </main>
  );
}
