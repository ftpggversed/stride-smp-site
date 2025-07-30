'use client';

import { useEffect, useState, useRef } from 'react';
import { FiServer, FiUsers, FiActivity, FiClock, FiWifi, FiRefreshCw } from 'react-icons/fi';

interface ServerStatusData {
  online: boolean;
  players: { online: number; max: number };
  motd: string;
  version: string;
  ping?: number;
  ip?: string;
  port?: number;
}

export default function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(false); // start false so info stays visible on mount
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [refreshed, setRefreshed] = useState(false);
  const uptimeInterval = useRef<NodeJS.Timeout | null>(null);
  const refreshedTimeout = useRef<NodeJS.Timeout | null>(null);

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setStatus(data);
      setLastUpdated(new Date());
      setUptimeSeconds(0);

      setRefreshed(true);
      if (refreshedTimeout.current) clearTimeout(refreshedTimeout.current);
      refreshedTimeout.current = setTimeout(() => setRefreshed(false), 2000); // show "Refreshed!" for 2 seconds
    } catch {
      setStatus(null);
    }
    setLoading(false);
  }

  // fetch on mount once
  useEffect(() => {
    fetchStatus();
  }, []);

  // uptime timer
  useEffect(() => {
    if (!lastUpdated) return;
    if (uptimeInterval.current) clearInterval(uptimeInterval.current);

    uptimeInterval.current = setInterval(() => {
      setUptimeSeconds((sec) => sec + 1);
    }, 1000);

    return () => {
      if (uptimeInterval.current) clearInterval(uptimeInterval.current);
      if (refreshedTimeout.current) clearTimeout(refreshedTimeout.current);
    };
  }, [lastUpdated]);

  function formatUptime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
  }

  if (!status) {
    return (
      <div className="max-w-md mx-auto bg-red-900 rounded-xl shadow-lg p-5 mt-8 text-red-300 text-center font-semibold">
        Server is currently offline or unreachable.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg p-5 mt-8 text-white">
      {/* Server Status */}
      <div className="flex items-center gap-3 mb-5">
        <FiServer className={`w-9 h-9 ${status.online ? 'text-blue-500' : 'text-red-600'}`} />
        <h2 className={`text-xl font-extrabold ${status.online ? 'text-blue-400' : 'text-red-500'}`}>
          {status.online ? 'Server Online' : 'Server Offline'}
        </h2>
        <div className="ml-auto text-gray-400 font-mono text-xs sm:text-sm">
          {typeof status.ping === 'number' ? `Ping: ${status.ping} ms` : 'Ping N/A'}
        </div>
      </div>

      {/* MOTD */}
      <p
        className="mb-6 italic text-blue-300 text-center break-words leading-relaxed text-base sm:text-lg"
        dangerouslySetInnerHTML={{ __html: status.motd }}
      />

      {/* Version & Player Count */}
      <div className="flex justify-between text-gray-300 font-semibold text-base mb-6 border-t border-gray-700 pt-3">
        <div className="flex items-center gap-2">
          <FiActivity className="w-5 h-5 text-blue-400" />
          <span>Version:</span>
          <span className="ml-1 font-mono">{status.version}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-blue-400" />
          <span>Players:</span>
          <span className="ml-1 font-mono">{status.players.online} / {status.players.max}</span>
        </div>
      </div>

      {/* Server Connection & Uptime Info */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-4 text-gray-300">
        <div className="flex items-center gap-2 text-blue-500 font-semibold break-all font-mono">
          <FiWifi className="w-6 h-6" />
          {status.ip ?? 'play.stridesmp.xyz'}
          {status.port ? `:${status.port}` : ''}
        </div>

        <div className="flex justify-between text-xs sm:text-sm font-mono">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4 text-blue-400" />
            <span>Last updated:</span>
            <span className="ml-1">{lastUpdated ? lastUpdated.toLocaleTimeString() : '—'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiRefreshCw className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span>Uptime:</span>
            <span className="ml-1">{formatUptime(uptimeSeconds)}</span>
          </div>
        </div>

        {/* Refresh Button */}
       <button
  onClick={fetchStatus}
  disabled={loading}
  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md py-2 text-white font-semibold transition"
  aria-label="Refresh server status"
>
  {loading ? 'Refresh Status' : refreshed ? 'Refreshed!' : 'Refresh Status'}
</button>

      </div>
    </div>
  );
}
