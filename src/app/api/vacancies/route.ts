import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const atsStatusId = searchParams.get('atsStatusId');
  const postingStatusId = searchParams.get('postingStatusId');
  const clientId = searchParams.get('clientId');
  const recruiterId = searchParams.get('recruiterId');
  const countryId = searchParams.get('countryId');
  const cityId = searchParams.get('cityId');

  const where: any = {};

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { client: { name: { contains: search } } },
    ];
  }

  if (atsStatusId && atsStatusId !== 'all') where.atsStatusId = atsStatusId;
  if (postingStatusId && postingStatusId !== 'all') where.postingStatusId = postingStatusId;
  if (clientId && clientId !== 'all') where.clientId = clientId;
  if (recruiterId && recruiterId !== 'all') where.recruiterId = recruiterId;
  if (countryId && countryId !== 'all') where.countryId = countryId;
  if (cityId && cityId !== 'all') where.cityId = cityId;

  try {
    const vacancies = await prisma.vacancy.findMany({
      where,
      include: {
        client: true,
        recruiter: true,
        atsStatus: true,
        postingStatus: true,
        country: true,
        city: true,
        linkedTo: { select: { id: true } }, // We only need IDs for now
      },
      orderBy: { dateCreated: 'desc' },
    });

    // Transform linkedTo to linkedIds to match frontend interface
    const transformedVacancies = vacancies.map((v: any) => ({
      ...v,
      linkedIds: v.linkedTo.map((l: any) => l.id),
      mainJbPosted: v.mainJbPosted.toISOString(),
      dateCreated: v.dateCreated.toISOString(),
    }));

    return NextResponse.json(transformedVacancies);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return NextResponse.json({ error: 'Failed to fetch vacancies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const vacancy = await prisma.vacancy.create({
      data: {
        ...body,
        dateCreated: new Date(),
        mainJbPosted: body.mainJbPosted ? new Date(body.mainJbPosted) : new Date(),
      },
      include: {
        client: true,
        recruiter: true,
        atsStatus: true,
        postingStatus: true,
        country: true,
        city: true,
      },
    });
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('Error creating vacancy:', error);
    return NextResponse.json({ error: 'Failed to create vacancy' }, { status: 500 });
  }
}
