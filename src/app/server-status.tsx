"use client";

import React, { useEffect, useState } from "react";

interface ServerData {
  online: boolean;
  players: {
    online: number;
    max: number;
    sample: { name: string }[];
  };
  motd: string;
  version: string;
  ping: number;
}

export default function ServerStatus() {
  const [data, setData] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshLabel, setRefreshLabel] = useState("Refresh Status");

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (e) {
      setData(null);
    }
    setLoading(false);
    setRefreshLabel("Refreshed!");
    setTimeout(() => setRefreshLabel("Refresh Status"), 2000);
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-neutral-900 text-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Server Status</h1>

      <div className="mb-4 text-center">
        <button
          onClick={fetchStatus}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold"
        >
          {refreshLabel}
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && data && (
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className={data.online ? "text-green-400" : "text-red-500"}>
              {data.online ? "Online" : "Offline"}
            </span>
          </p>

          <p>
            <span className="font-semibold">MOTD:</span>{" "}
            {data.motd || "No MOTD"}
          </p>

          <p>
            <span className="font-semibold">Version:</span> {data.version}
          </p>

          <p>
            <span className="font-semibold">Ping:</span> {data.ping} ms
          </p>

          <p>
            <span className="font-semibold">Players Online:</span>{" "}
            {data.players.online} / {data.players.max}
          </p>

          {data.players.sample.length > 0 && (
            <p>
              <span className="font-semibold">Sample Players:</span>{" "}
              {data.players.sample.map((p) => p.name).join(", ")}
            </p>
          )}

          {lastUpdated && (
            <p className="text-sm text-neutral-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      )}

      {!loading && !data && (
        <p className="text-center text-red-500">Failed to fetch status.</p>
      )}
    </div>
  );
}
