# Posting Portal

A vacancy management portal with ATS system integration. The application allows recruiters to manage vacancies, track their posting status, and synchronize data across various platforms.

## 🎯 Key Features

- **Vacancy Management** - create, edit, and delete vacancies
- **Status Tracking** - track posting status of vacancies across various platforms
- **ATS Integration** - synchronization with candidate management systems
- **Multilingual Support** - English and Ukrainian language support
- **Authentication** - authorization via Google
- **Search & Filtering** - powerful search and filtering capabilities
- **Dark Theme** - support for light and dark themes
- **Responsive Design** - optimized for mobile devices

## 🛠️ Tech Stack

### Frontend

- **Next.js 14.2** - React framework with SSR
- **React 18.3** - UI library
- **TypeScript** - static typing
- **TailwindCSS** - utility-first CSS framework
- **Radix UI** - UI components library
- **React Hook Form** - form management
- **Zod** - data validation
- **Next-intl** - internationalization
- **React Query** - server state management
- **Recharts** - data visualization

### Backend

- **Next.js API Routes** - REST API endpoints
- **Prisma ORM** - database management
- **PostgreSQL** - relational database
- **JWT** - authentication
- **bcryptjs** - password hashing
- **jose** - JWT handling

### DevOps & Quality

- **ESLint** - code analysis
- **Prettier** - code formatting
- **Husky** - Git hooks
- **Lint-staged** - staged files checking

## 📋 Requirements

- **Node.js** >= 18
- **npm** or **yarn**
- **PostgreSQL** >= 12
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/antonlazurko/posting-portal.git
cd posting-portal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/posting_portal"

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# JWT
JWT_SECRET=your_jwt_secret_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Initialize the Database

```bash
# Run migrations
npx prisma migrate dev

# Seed database with initial data (optional)
npx prisma db seed
```

### 5. Start the Application

```bash
# Development mode
npm run dev

# Application will be available at http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── auth/          # Authentication
│   │   ├── vacancies/     # Vacancies API
│   │   └── dictionaries/  # Reference data
│   ├── login/             # Login page
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── pages/            # Page components
│   └── ui/               # UI components (Radix UI)
├── entities/              # Business entities
│   └── vacancy/          # Vacancy models and types
├── features/              # Application features
│   ├── auth/             # Authentication
│   ├── vacancy-filters/  # Vacancy filtering
│   ├── vacancy-form/     # Vacancy form
│   └── vacancy-link/     # Vacancy linking
├── hooks/                 # React hooks
├── layouts/               # Layout components
├── lib/                   # Utilities and configs
├── shared/                # Shared code
│   ├── api/              # API client functions
│   └── types/            # TypeScript types
└── widgets/               # Complex components
    ├── sidebar/          # Sidebar
    ├── stats-cards/      # Statistics cards
    └── vacancy-table/    # Vacancies table

prisma/
├── schema.prisma         # Database schema
├── migrations/           # Database migrations
└── seed.ts              # Database seeding script
```

## 🔧 Available Commands

```bash
# Development
npm run dev           # Start development server

# Production
npm run build         # Build the project
npm run start         # Start production server

# Quality Control
npm run lint          # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Create a migration
npx prisma db seed   # Seed the database
```

## 🗄️ Data Model

### Main Entities

- **Vacancy** - job vacancy/position
- **User** - user/recruiter
- **Client** - client/company
- **AtsStatus** - ATS system status
- **PostingStatus** - posting status
- **Country** - country
- **City** - city

## 🔐 Authentication

The application uses Google OAuth 2.0 for authentication. Users can sign in with their Google account. Sessions are managed using JWT tokens.

## 🌍 Internationalization

The application supports multiple languages:

- **en** - English
- **uk** - Ukrainian

Translations are stored in the `messages/` directory.

## 🎨 Themes

The application supports light and dark themes. Theming is managed via `next-themes`.

## 📦 Deployment

### Heroku / Railway / Vercel

1. Configure environment variables in your platform
2. Run database migrations
3. Deploy the application

```bash
git push heroku main
# or use the appropriate command for your platform
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is private.

## 👤 Author

**Anton Lazurko**

- GitHub: [@antonlazurko](https://github.com/antonlazurko)

## 📧 Contact

For questions and suggestions, please contact the author via GitHub.

---

**Last Updated:** December 2025
