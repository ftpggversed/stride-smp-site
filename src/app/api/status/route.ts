import { NextResponse } from 'next/server';
import { status } from 'minecraft-server-util';

const SERVER_HOST = 'play.stridesmp.xyz'; // change to your Java server IP
const SERVER_PORT = 19132; // default Java port

export async function GET() {
  try {
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
  } catch (e) {
    return NextResponse.json({ online: false }, { status: 503 });
  }
}
