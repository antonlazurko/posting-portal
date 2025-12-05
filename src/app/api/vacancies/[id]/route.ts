import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const body = await request.json();

    // Handle linkedIds update specifically
    if (body.linkedIds) {
      // First disconnect all existing links
      await prisma.vacancy.update({
        where: { id },
        data: {
          linkedTo: { set: [] },
        },
      });

      // Then connect new links
      const updatedVacancy = await prisma.vacancy.update({
        where: { id },
        data: {
          linkedTo: {
            connect: body.linkedIds.map((lid: string) => ({ id: lid })),
          },
        },
        include: {
          client: true,
          recruiter: true,
          atsStatus: true,
          postingStatus: true,
          country: true,
          city: true,
          linkedTo: { select: { id: true } },
        },
      });

      const transformedVacancy = {
        ...updatedVacancy,
        linkedIds: updatedVacancy.linkedTo.map((l: any) => l.id),
        mainJbPosted: updatedVacancy.mainJbPosted.toISOString(),
        dateCreated: updatedVacancy.dateCreated.toISOString(),
      };

      return NextResponse.json(transformedVacancy);
    }

    // Handle other updates
    const updatedVacancy = await prisma.vacancy.update({
      where: { id },
      data: body,
      include: {
        client: true,
        recruiter: true,
        atsStatus: true,
        postingStatus: true,
        country: true,
        city: true,
        linkedTo: { select: { id: true } },
      },
    });

    const transformedVacancy = {
      ...updatedVacancy,
      linkedIds: updatedVacancy.linkedTo.map((l: any) => l.id),
      mainJbPosted: updatedVacancy.mainJbPosted.toISOString(),
      dateCreated: updatedVacancy.dateCreated.toISOString(),
    };

    return NextResponse.json(transformedVacancy);
  } catch (error) {
    console.error('Error updating vacancy:', error);
    return NextResponse.json({ error: 'Failed to update vacancy' }, { status: 500 });
  }
}
