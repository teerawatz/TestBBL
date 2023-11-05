-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "catchPhrase" TEXT,
    "bs" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("bs", "catchPhrase", "id", "name", "userId") SELECT "bs", "catchPhrase", "id", "name", "userId" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");
CREATE TABLE "new_Geo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" TEXT,
    "lng" TEXT,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "Geo_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Geo" ("addressId", "id", "lat", "lng") SELECT "addressId", "id", "lat", "lng" FROM "Geo";
DROP TABLE "Geo";
ALTER TABLE "new_Geo" RENAME TO "Geo";
CREATE UNIQUE INDEX "Geo_addressId_key" ON "Geo"("addressId");
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT,
    "suite" TEXT,
    "city" TEXT,
    "zipcode" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "id", "street", "suite", "userId", "zipcode") SELECT "city", "id", "street", "suite", "userId", "zipcode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
