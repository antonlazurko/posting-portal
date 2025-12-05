import { PrismaClient } from '@prisma/client';
import {
  mockVacancies,
  mockClients,
  mockRecruiters,
  mockAtsStatuses,
  mockPostingStatuses,
  mockCountries,
  mockCities,
} from '../src/entities/vacancy/model/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Seed Dictionaries
  for (const client of mockClients) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: {},
      create: client,
    });
  }

  for (const recruiter of mockRecruiters) {
    await prisma.recruiter.upsert({
      where: { id: recruiter.id },
      update: {},
      create: {
        id: recruiter.id,
        firstName: recruiter.firstName,
        lastName: recruiter.lastName,
        email: recruiter.email,
        avatarUrl: recruiter.avatarUrl,
        isActive: recruiter.isActive,
      },
    });
  }

  for (const status of mockAtsStatuses) {
    await prisma.atsStatus.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    });
  }

  for (const status of mockPostingStatuses) {
    await prisma.postingStatus.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    });
  }

  for (const country of mockCountries) {
    await prisma.country.upsert({
      where: { id: country.id },
      update: {},
      create: country,
    });
  }

  for (const city of mockCities) {
    await prisma.city.upsert({
      where: { id: city.id },
      update: {},
      create: city,
    });
  }

  // Seed Vacancies
  for (const vacancy of mockVacancies) {
    await prisma.vacancy.upsert({
      where: { id: vacancy.id },
      update: {},
      create: {
        id: vacancy.id,
        atsId: vacancy.atsId,
        title: vacancy.title,
        mainJbUrl: vacancy.mainJbUrl,
        isRepeating: vacancy.isRepeating,
        comment: vacancy.comment,
        specificProject: vacancy.specificProject,
        mainJbPosted: new Date(vacancy.mainJbPosted),
        isPosted: vacancy.isPosted,
        dateCreated: new Date(vacancy.dateCreated),
        isMain: vacancy.isMain,
        clientId: vacancy.client.id,
        recruiterId: vacancy.recruiter.id,
        atsStatusId: vacancy.atsStatus.id,
        postingStatusId: vacancy.postingStatus.id,
        countryId: vacancy.country.id,
        cityId: vacancy.city.id,
      },
    });
  }

  // Link Vacancies (Second pass to ensure all vacancies exist)
  for (const vacancy of mockVacancies) {
    if (vacancy.linkedIds && vacancy.linkedIds.length > 0) {
      await prisma.vacancy.update({
        where: { id: vacancy.id },
        data: {
          linkedTo: {
            connect: vacancy.linkedIds.map((id) => ({ id })),
          },
        },
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
