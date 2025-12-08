export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [clients, recruiters, atsStatuses, postingStatuses, countries, cities] =
      await Promise.all([
        prisma.client.findMany(),
        prisma.user.findMany({ where: { role: 'hr-recruiter' } }),
        prisma.atsStatus.findMany(),
        prisma.postingStatus.findMany(),
        prisma.country.findMany(),
        prisma.city.findMany(),
      ]);

    const safeData = {
      clients: JSON.parse(JSON.stringify(clients)),
      recruiters: JSON.parse(JSON.stringify(recruiters)),
      atsStatuses: JSON.parse(JSON.stringify(atsStatuses)),
      postingStatuses: JSON.parse(JSON.stringify(postingStatuses)),
      countries: JSON.parse(JSON.stringify(countries)),
      cities: JSON.parse(JSON.stringify(cities)),
    };

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('Error fetching dictionaries:', error);
    return NextResponse.json({ error: 'Failed to fetch dictionaries' }, { status: 500 });
  }
}
