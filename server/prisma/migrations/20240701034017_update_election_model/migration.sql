-- AlterTable
ALTER TABLE "Elections" ADD COLUMN     "result_status" TEXT NOT NULL DEFAULT 'Pending',
ALTER COLUMN "status" SET DEFAULT 'Pending';
