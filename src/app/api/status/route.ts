import { NextResponse } from 'next/server';
import { status } from 'minecraft-server-util';

const SERVER_HOST = 'play.stridesmp.xyz';
const SERVER_PORT = 25565; // Java server default port

export async function GET() {
  try {
    const res = await status(SERVER_HOST, SERVER_PORT,);

    return NextResponse.json({
      online: true,
      players: {
        online: res.players.online,
        max: res.players.max,
        list: res.players.sample?.map((p) => ({ name: p.name })) || [],
      },
      motd: res.motd.clean || '',
      motdRaw: res.motd.raw || '',
      version: res.version.name || 'Unknown',
      protocolVersion: res.version.protocol,
      // Removed software & onlineMode properties as they don't exist in JavaStatusResponse
      ping: res.roundTripLatency,
      ip: SERVER_HOST,
      port: SERVER_PORT,
    });
  } catch {
    return NextResponse.json({ online: false }, { status: 503 });
  }
}
