import { NextResponse } from 'next/server';
import { status } from 'minecraft-server-util';

const SERVER_HOST = 'play.stridesmp.xyz';
const SERVER_PORT = 25565; // Java server default port

export async function GET() {
  try {
    // Query server status with a 3-second timeout
    const res = await status(SERVER_HOST, SERVER_PORT, { timeout: 3000 });

    return NextResponse.json({
      online: true,
      players: {
        online: res.players.online,
        max: res.players.max,
        sample: res.players.sample?.map(p => ({ name: p.name })) || [],
      },
      motd: res.motd.clean || '',
      version: res.version.name || 'Unknown',
      ping: res.roundTripLatency,
    });
  } catch {
    return NextResponse.json({ online: false }, { status: 503 });
  }
}
