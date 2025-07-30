'use client';

import { useEffect, useState, useRef } from 'react';
import {
  FiServer,
  FiUsers,
  FiActivity,
  FiClock,
  FiWifi,
  FiRefreshCw,
} from 'react-icons/fi';

interface Player {
  name: string;
}

interface ServerStatusData {
  online: boolean;
  players: { online: number; max: number; list?: Player[] };
  motd: string;
  version: string;
  software: string;
  protocolVersion?: number;
  ping?: number;
  ip?: string;
  port?: number;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const uptimeInterval = useRef<NodeJS.Timeout | null>(null);

  async function fetchStatus() {
    setRefreshing(true);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStatus(data);
      setLastUpdated(new Date());
    } catch {
      setStatus(null);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  if (!status) {
    return (
      <div className="max-w-6xl mx-auto bg-red-900 rounded-xl p-6 mt-8 text-red-300 text-center font-semibold">
        Server is currently offline or unreachable.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Status Card */}
      <section className="bg-gray-900 rounded-xl p-6 flex flex-col text-white h-full">
        {/* Refresh button top right */}
        <button
          onClick={fetchStatus}
          aria-label="Refresh Server Status"
          className={`absolute top-4 right-4 p-2 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-colors focus:outline-none focus:ring-0 ${
            refreshing ? 'animate-spin' : ''
          }`}
          title="Refresh Status"
          disabled={refreshing}
        >
          <FiRefreshCw size={20} />
        </button>

        <header className="flex items-center gap-3 mb-5">
          <FiServer
            className={`w-8 h-8 ${status.online ? 'text-blue-500' : 'text-red-600'}`}
          />
          <h2
            className={`text-xl font-bold ${
              status.online ? 'text-blue-400' : 'text-red-500'
            }`}
          >
            {status.online ? 'Server Online' : 'Server Offline'}
          </h2>
        </header>

        <p
          className="italic text-blue-300 mb-8 text-center break-words leading-relaxed text-lg flex-grow"
          dangerouslySetInnerHTML={{ __html: status.motd }}
        />

        {/* Software and Version side by side */}
        <div className="flex justify-between border-t border-gray-700 pt-4 mb-6 text-gray-300 font-semibold text-sm sm:text-base">
          <div className="flex flex-col items-center w-1/2">
            <div className="text-blue-400 font-semibold mb-1">Software</div>
            <div className="font-mono text-center">{status.software}</div>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <div className="text-blue-400 font-semibold mb-1">Version</div>
            <div className="font-mono text-center">{status.version}</div>
          </div>
        </div>

        {/* Ping and Players side by side */}
        <div className="flex justify-between text-gray-300 font-semibold text-sm sm:text-base mb-6">
          <div className="flex flex-col items-center w-1/2">
            <div className="text-blue-400 font-semibold mb-1">Ping</div>
            <div className="font-mono">{typeof status.ping === 'number' ? `${status.ping} ms` : 'N/A'}</div>
          </div>
          <div className="flex flex-col items-center w-1/2">
            <div className="text-blue-400 font-semibold mb-1">Players</div>
            <div className="font-mono">
              {status.players.online} / {status.players.max}
            </div>
          </div>
        </div>

        {/* IP / Port / Last Updated - left-aligned */}
        <div className="bg-gray-800 rounded-lg p-5 text-gray-300 font-mono text-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <FiWifi className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <div className="text-blue-400 text-xs font-semibold">IP Address</div>
              <div>play.stridesmp.xyz</div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <FiActivity className="w-6 h-6 text-blue-500" />
            <div className="text-left">
              <div className="text-blue-400 text-xs font-semibold">Port</div>
              <div>19132</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiClock className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-blue-400 text-xs font-semibold">Last Updated</div>
              <div>{lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Player List Card */}
      <section className="bg-gray-900 rounded-xl p-6 text-white flex flex-col h-full">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-blue-400 pb-2">
          Online Players
        </h3>

        {status.players.list && status.players.list.length > 0 ? (
          <ul className="flex-1 overflow-y-auto font-mono text-sm text-gray-300 space-y-2">
            {status.players.list.map((player) => (
              <li
                key={player.name}
                className="truncate px-3 py-1 rounded hover:bg-blue-700 transition cursor-default"
                title={player.name}
              >
                {player.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center mt-10">No players online</p>
        )}
      </section>
    </div>
  );
}
