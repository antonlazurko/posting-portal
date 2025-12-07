import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const body = await request.json();

    const {
      title,
      atsId,
      clientId,
      specificProject,
      recruiterId,
      atsStatusId,
      countryId,
      cityId,
      postingStatusId,
      mainJbUrl,
      comment,
      isPosted,
      isRepeating,
      isMain,
      linkedIds,
    } = body;

    const updateData: any = {
      title,
      atsId,
      clientId,
      specificProject,
      recruiterId,
      atsStatusId,
      countryId,
      cityId,
      postingStatusId,
      mainJbUrl,
      comment,
      isPosted,
      isRepeating,
      isMain,
    };

    if (linkedIds) {
      updateData.linkedTo = {
        set: linkedIds.map((id: string) => ({ id })),
      };
    }

    const updatedVacancy = await prisma.vacancy.update({
      where: { id },
      data: updateData,
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
