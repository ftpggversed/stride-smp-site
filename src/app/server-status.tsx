'use client';

import { useEffect, useState, useRef } from 'react';
import {
  FiServer,
  FiUsers,
  FiActivity,
  FiClock,
  FiWifi,
  FiRefreshCw,
  FiUser,
} from 'react-icons/fi';

interface Player {
  name: string;
}

interface ServerStatusData {
  online: boolean;
  players: {
    online: number;
    max: number;
    list?: Player[];
  };
  motd: string;
  motdRaw?: string;
  version: string;
  protocolVersion?: number | string;
  software?: string;
  onlineMode?: boolean;
  ping?: number;
  ip?: string;
  port?: number;
}

export default function ServerStatus() {
  const [data, setData] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [buttonText, setButtonText] = useState('Refresh Status');
  const uptimeInterval = useRef<NodeJS.Timeout | null>(null);

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setUptimeSeconds(0);
      setButtonText('Refreshed');
      setTimeout(() => setButtonText('Refresh Status'), 2000);
    } catch {
      setData(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!lastUpdated) return;
    if (uptimeInterval.current) clearInterval(uptimeInterval.current);

    uptimeInterval.current = setInterval(() => {
      setUptimeSeconds((sec) => sec + 1);
    }, 1000);

    return () => {
      if (uptimeInterval.current) clearInterval(uptimeInterval.current);
    };
  }, [lastUpdated]);

  function formatUptime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
  }

  if (loading) {
    return (
      <div className="animate-pulse max-w-5xl mx-auto flex gap-6 p-5 mt-8">
        <div className="flex-1 bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
          <div className="h-7 bg-gray-700 rounded"></div>
          <div className="h-5 bg-gray-700 rounded"></div>
          <div className="h-5 bg-gray-700 rounded"></div>
          <div className="h-5 bg-gray-700 rounded"></div>
        </div>
        <div className="flex-[2] bg-gray-900 rounded-xl shadow-lg p-6">
          <div className="h-7 bg-gray-700 rounded mb-3"></div>
          <div className="h-5 bg-gray-700 rounded mb-2"></div>
          <div className="h-5 bg-gray-700 rounded mb-2"></div>
          <div className="h-5 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto bg-red-900 rounded-xl shadow-lg p-5 mt-8 text-red-300 text-center font-semibold">
        Server is currently offline or unreachable.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto flex gap-6 p-5 mt-8 text-white">
      {/* Status Card */}
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex-[1] shadow-md flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <FiServer
            className={`w-9 h-9 ${
              data.online ? 'text-blue-500' : 'text-red-600'
            }`}
          />
          <h2
            className={`text-xl font-extrabold ${
              data.online ? 'text-blue-400' : 'text-red-500'
            }`}
          >
            {data.online ? 'Server Online' : 'Server Offline'}
          </h2>
          <div className="ml-auto text-gray-400 font-mono text-xs sm:text-sm">
            {typeof data.ping === 'number' ? `Ping: ${data.ping} ms` : 'Ping N/A'}
          </div>
        </div>

        {/* MOTD */}
        <p
          className="mb-6 italic text-blue-300 text-center break-words leading-relaxed text-base sm:text-lg flex-grow"
          dangerouslySetInnerHTML={{ __html: data.motd }}
        />

        {/* Version & Player Count */}
        <div className="flex justify-between text-gray-300 font-semibold text-base mb-6 border-t border-gray-700 pt-3">
          <div className="flex items-center gap-2">
            <FiActivity className="w-5 h-5 text-blue-400" />
            <span>Version:</span>
            <span className="ml-1 font-mono">{data.version}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers className="w-5 h-5 text-blue-400" />
            <span>Players:</span>
            <span className="ml-1 font-mono">
              {data.players.online} / {data.players.max}
            </span>
          </div>
        </div>

        {/* Additional info */}
        <div className="text-gray-300 space-y-3 mb-6 border-t border-gray-700 pt-4 font-mono text-sm">
          <div className="flex justify-between">
            <span>Protocol Version:</span>
            <span>{data.protocolVersion ?? 'Unknown'}</span>
          </div>

          <div className="flex justify-between">
            <span>Online Mode:</span>
            <span>
              {typeof data.onlineMode === 'boolean'
                ? data.onlineMode
                  ? 'Yes'
                  : 'No'
                : 'Unknown'}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Server Software:</span>
            <span>{data.software ?? 'Unknown'}</span>
          </div>

          {data.motdRaw && (
            <div>
              <span className="block mb-1">Raw MOTD:</span>
              <pre className="bg-gray-800 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap break-all">
                {data.motdRaw}
              </pre>
            </div>
          )}
        </div>

        {/* IP and port */}
        <div className="bg-gray-800 rounded-lg p-4 space-y-4 text-gray-300">
          <div className="flex items-center gap-2 text-blue-500 font-semibold break-all font-mono">
            <FiWifi className="w-6 h-6" />
            {data.ip ?? 'play.stridesmp.xyz'}
            {data.port ? `:${data.port}` : ''}
          </div>

          <div className="flex justify-between text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4 text-blue-400" />
              <span>Last updated:</span>
              <span className="ml-1">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FiRefreshCw
                className="w-4 h-4 text-blue-400 animate-spin-slow"
                title="Uptime is approximate since last refresh"
              />
              <span>Uptime:</span>
              <span className="ml-1">{formatUptime(uptimeSeconds)}</span>
            </div>
          </div>

          <button
            onClick={fetchStatus}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold mt-4"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Player List Card */}
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex-[2] shadow-md overflow-auto max-h-[450px]">
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <FiUser /> Online Players ({data.players.online})
        </h3>

        {data.players.list && data.players.list.length > 0 ? (
          <ul className="text-gray-300 space-y-1 max-h-[400px] overflow-y-auto">
            {data.players.list.map((player) => (
              <li
                key={player.name}
                className="truncate cursor-default px-3 py-1 rounded hover:bg-blue-700 transition"
                title={player.name}
              >
                {player.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic text-center mt-8">
            No players online
          </p>
        )}
      </div>
    </div>
  );
}
