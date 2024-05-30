-- CreateTable
CREATE TABLE "AadharDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "aadhar_number" TEXT NOT NULL,
    "full_address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "care_of" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "email_hash" TEXT NOT NULL,
    "mobile_harsh" TEXT NOT NULL,

    CONSTRAINT "AadharDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AadharDetails_userId_key" ON "AadharDetails"("userId");

-- AddForeignKey
ALTER TABLE "AadharDetails" ADD CONSTRAINT "AadharDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
