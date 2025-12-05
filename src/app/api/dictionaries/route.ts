import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    return NextResponse.json({
      clients,
      recruiters,
      atsStatuses,
      postingStatuses,
      countries,
      cities,
    });
  } catch (error) {
    console.error('Error fetching dictionaries:', error);
    return NextResponse.json({ error: 'Failed to fetch dictionaries' }, { status: 500 });
  }
}
