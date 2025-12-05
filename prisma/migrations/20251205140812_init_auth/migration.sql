/*
  Warnings:

  - You are about to drop the `Recruiter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Recruiter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vacancy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "atsId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mainJbUrl" TEXT,
    "isRepeating" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "specificProject" TEXT NOT NULL,
    "mainJbPosted" DATETIME NOT NULL,
    "isPosted" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "atsStatusId" TEXT NOT NULL,
    "postingStatusId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    CONSTRAINT "Vacancy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacancy_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacancy_atsStatusId_fkey" FOREIGN KEY ("atsStatusId") REFERENCES "AtsStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacancy_postingStatusId_fkey" FOREIGN KEY ("postingStatusId") REFERENCES "PostingStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacancy_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vacancy_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vacancy" ("atsId", "atsStatusId", "cityId", "clientId", "comment", "countryId", "dateCreated", "id", "isMain", "isPosted", "isRepeating", "mainJbPosted", "mainJbUrl", "postingStatusId", "recruiterId", "specificProject", "title") SELECT "atsId", "atsStatusId", "cityId", "clientId", "comment", "countryId", "dateCreated", "id", "isMain", "isPosted", "isRepeating", "mainJbPosted", "mainJbUrl", "postingStatusId", "recruiterId", "specificProject", "title" FROM "Vacancy";
DROP TABLE "Vacancy";
ALTER TABLE "new_Vacancy" RENAME TO "Vacancy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
