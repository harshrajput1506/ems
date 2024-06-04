-- CreateTable
CREATE TABLE "Candidates" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "political_party" TEXT NOT NULL,
    "consistuency" TEXT NOT NULL,
    "electionId" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Elections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Upcoming',
    "startdate" TIMESTAMP(3) NOT NULL,
    "enddate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Elections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidates" ADD CONSTRAINT "Candidates_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
