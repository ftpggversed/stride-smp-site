import { NextResponse } from 'next/server';
import { status } from 'minecraft-server-util';

const SERVER_HOST = 'play.stridesmp.xyz';
const SERVER_PORT = 25565;

export async function GET() {
  try {
    const res = await status(SERVER_HOST, SERVER_PORT, { timeout: 3000 });

    const fullVersionName = res.version.name || 'Unknown';
    const softwareName = fullVersionName.split(' ')[0];

    // Extract version number (e.g. "1.20.1") from fullVersionName
    // Assuming the version number is the first substring matching x.y or x.y.z etc.
    const versionMatch = fullVersionName.match(/\d+(\.\d+)+/);
    const versionNumber = versionMatch ? versionMatch[0] : 'Unknown';

    return NextResponse.json({
      online: true,
      players: {
        online: res.players.online,
        max: res.players.max,
        list: res.players.sample?.map(p => ({ name: p.name })) || [],
      },
      motd: res.motd.clean || '',
      version: versionNumber,   // just the version number part
      software: softwareName,   // software name only
      protocolVersion: res.version.protocol,
      ping: res.roundTripLatency,
      ip: SERVER_HOST,
      port: SERVER_PORT,
    });
  } catch {
    return NextResponse.json({ online: false }, { status: 503 });
  }
}
