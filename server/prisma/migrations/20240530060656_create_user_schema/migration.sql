-- CreateTable
CREATE TABLE "User" (
    "uid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "aadhar_number" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "KYV" (
    "id" SERIAL NOT NULL,
    "voter_card_number" TEXT,
    "address" TEXT,
    "constituent_assembly" TEXT,
    "userId" INTEGER NOT NULL,
    "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KYV_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_aadhar_number_key" ON "User"("aadhar_number");

-- CreateIndex
CREATE UNIQUE INDEX "KYV_voter_card_number_key" ON "KYV"("voter_card_number");

-- CreateIndex
CREATE UNIQUE INDEX "KYV_userId_key" ON "KYV"("userId");

-- AddForeignKey
ALTER TABLE "KYV" ADD CONSTRAINT "KYV_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
