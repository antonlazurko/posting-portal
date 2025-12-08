import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

const countries = [
  'Ukraine',
  'Poland',
  'Germany',
  'France',
  'United Kingdom',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Belgium',
  'Austria',
  'Switzerland',
  'Portugal',
  'Czech Republic',
  'Hungary',
  'Romania',
  'Ireland',
];

const cities = [
  'Kyiv',
  'Lviv',
  'Kharkiv',
  'Odesa',
  'Warsaw',
  'Krakow',
  'Berlin',
  'Munich',
  'Paris',
  'London',
  'Madrid',
  'Barcelona',
  'Rome',
  'Milan',
  'Amsterdam',
  'Stockholm',
  'Oslo',
  'Copenhagen',
  'Helsinki',
  'Brussels',
];

const clients = [
  'TechCorp',
  'GlobalSoft',
  'Innovate Ltd',
  'Future Systems',
  'DataDriven',
  'CloudNine',
  'SmartSolutions',
  'EcoTech',
  'FinServe',
  'MediaGroup',
];
const atsStatuses = ['New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected', 'On Hold'];
const postingStatuses = ['Draft', 'Published', 'Closed', 'Archived'];
const titles = [
  'Frontend Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'QA Specialist',
  'Data Scientist',
  'HR Manager',
  'Sales Representative',
];

async function main() {
  console.log('Start seeding ...');

  // Cleanup existing data (except users to preserve admin if needed, but for clean seed we might want to ensure fresh dictionaries)
  // We will delete vacancies first due to foreign keys
  await prisma.vacancy.deleteMany();
  await prisma.client.deleteMany();
  await prisma.atsStatus.deleteMany();
  await prisma.postingStatus.deleteMany();
  await prisma.country.deleteMany();
  await prisma.city.deleteMany();

  // Create Dictionaries
  console.log('Seeding dictionaries...');
  const countryRecords = await Promise.all(
    countries.map((name) => prisma.country.create({ data: { name } }))
  );
  const cityRecords = await Promise.all(
    cities.map((name) => prisma.city.create({ data: { name } }))
  );
  const clientRecords = await Promise.all(
    clients.map((name) => prisma.client.create({ data: { name } }))
  );
  const atsStatusRecords = await Promise.all(
    atsStatuses.map((name) => prisma.atsStatus.create({ data: { name } }))
  );
  const postingStatusRecords = await Promise.all(
    postingStatuses.map((name) => prisma.postingStatus.create({ data: { name } }))
  );

  // Create Recruiters
  console.log('Seeding users...');
  const password = await hash('password123', 12);
  const recruiters = [];

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lovable.dev' },
    update: {
      password, // Ensure password is correct
      role: 'hr-recruiter',
    },
    create: {
      email: 'admin@lovable.dev',
      firstName: 'Admin',
      lastName: 'User',
      password,
      role: 'hr-recruiter',
      avatarUrl: 'https://github.com/shadcn.png',
    },
  });
  recruiters.push(admin);

  // Extra recruiters
  const extraRecruitersData = [
    { email: 'anna@lovable.dev', first: 'Anna', last: 'Smith' },
    { email: 'john@lovable.dev', first: 'John', last: 'Doe' },
    { email: 'maria@lovable.dev', first: 'Maria', last: 'Garcia' },
    { email: 'alex@lovable.dev', first: 'Alex', last: 'Johnson' },
  ];

  for (const r of extraRecruitersData) {
    const user = await prisma.user.upsert({
      where: { email: r.email },
      update: {
        password,
        role: 'hr-recruiter',
      },
      create: {
        email: r.email,
        firstName: r.first,
        lastName: r.last,
        password,
        role: 'hr-recruiter',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.first}`,
      },
    });
    recruiters.push(user);
  }

  // Create Vacancies
  console.log('Seeding vacancies...');
  for (let i = 0; i < 50; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const client = clientRecords[Math.floor(Math.random() * clientRecords.length)];
    const recruiter = recruiters[Math.floor(Math.random() * recruiters.length)];
    const atsStatus = atsStatusRecords[Math.floor(Math.random() * atsStatusRecords.length)];
    const postingStatus =
      postingStatusRecords[Math.floor(Math.random() * postingStatusRecords.length)];
    const country = countryRecords[Math.floor(Math.random() * countryRecords.length)];
    const city = cityRecords[Math.floor(Math.random() * cityRecords.length)];
    const isPosted = Math.random() > 0.3;

    await prisma.vacancy.create({
      data: {
        atsId: `ATS-${1000 + i}`,
        title: `${title} at ${client.name}`,
        specificProject: Math.random() > 0.5 ? 'Core Platform' : 'Mobile App',
        mainJbPosted: new Date().toISOString(),
        isPosted: isPosted,
        isMain: Math.random() > 0.8,
        clientId: client.id,
        recruiterId: recruiter.id,
        atsStatusId: atsStatus.id,
        postingStatusId: postingStatus.id,
        countryId: country.id,
        cityId: city.id,
        comment: Math.random() > 0.7 ? 'Urgent hiring' : null,
        dateCreated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      },
    });
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
