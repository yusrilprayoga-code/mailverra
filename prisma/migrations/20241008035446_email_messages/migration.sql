-- CreateEnum
CREATE TYPE "EmailLabel" AS ENUM ('inbox', 'sent', 'draft');

-- CreateEnum
CREATE TYPE "Sensitivity" AS ENUM ('normal', 'private', 'personal', 'confidential');

-- CreateEnum
CREATE TYPE "MeetingMessageMethod" AS ENUM ('request', 'reply', 'cancel', 'counter', 'other');

-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "lastMessageDate" TIMESTAMP(3) NOT NULL,
    "participantIds" TEXT[],
    "accountId" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "inboxStatus" BOOLEAN NOT NULL DEFAULT true,
    "draftStatus" BOOLEAN NOT NULL DEFAULT false,
    "sentStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL,
    "lastModifiedTime" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "internetMessageId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sysLabels" TEXT[],
    "keywords" TEXT[],
    "sysClassifications" TEXT[],
    "sensitivity" "Sensitivity" NOT NULL DEFAULT 'normal',
    "meetingMessageMethod" "MeetingMessageMethod",
    "fromId" TEXT NOT NULL,
    "hasAttachments" BOOLEAN NOT NULL,
    "body" TEXT,
    "bodySnippet" TEXT,
    "inReplyTo" TEXT,
    "references" TEXT,
    "threadIndex" TEXT,
    "internetHeaders" JSONB[],
    "nativeProperties" JSONB,
    "folderId" TEXT,
    "omitted" TEXT[],
    "emailLabel" "EmailLabel" NOT NULL DEFAULT 'inbox',

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "raw" TEXT,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailAttachment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "inline" BOOLEAN NOT NULL,
    "contentId" TEXT,
    "content" TEXT,
    "contentLocation" TEXT,
    "emailId" TEXT NOT NULL,

    CONSTRAINT "EmailAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ToEmails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CcEmails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BccEmails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReplyToEmails" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Thread_accountId_idx" ON "Thread"("accountId");

-- CreateIndex
CREATE INDEX "Thread_done_idx" ON "Thread"("done");

-- CreateIndex
CREATE INDEX "Thread_inboxStatus_idx" ON "Thread"("inboxStatus");

-- CreateIndex
CREATE INDEX "Thread_draftStatus_idx" ON "Thread"("draftStatus");

-- CreateIndex
CREATE INDEX "Thread_sentStatus_idx" ON "Thread"("sentStatus");

-- CreateIndex
CREATE INDEX "Thread_lastMessageDate_idx" ON "Thread"("lastMessageDate");

-- CreateIndex
CREATE INDEX "Email_threadId_idx" ON "Email"("threadId");

-- CreateIndex
CREATE INDEX "Email_emailLabel_idx" ON "Email"("emailLabel");

-- CreateIndex
CREATE INDEX "Email_sentAt_idx" ON "Email"("sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailAddress_accountId_address_key" ON "EmailAddress"("accountId", "address");

-- CreateIndex
CREATE UNIQUE INDEX "_ToEmails_AB_unique" ON "_ToEmails"("A", "B");

-- CreateIndex
CREATE INDEX "_ToEmails_B_index" ON "_ToEmails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CcEmails_AB_unique" ON "_CcEmails"("A", "B");

-- CreateIndex
CREATE INDEX "_CcEmails_B_index" ON "_CcEmails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BccEmails_AB_unique" ON "_BccEmails"("A", "B");

-- CreateIndex
CREATE INDEX "_BccEmails_B_index" ON "_BccEmails"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReplyToEmails_AB_unique" ON "_ReplyToEmails"("A", "B");

-- CreateIndex
CREATE INDEX "_ReplyToEmails_B_index" ON "_ReplyToEmails"("B");

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "EmailAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailAddress" ADD CONSTRAINT "EmailAddress_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailAttachment" ADD CONSTRAINT "EmailAttachment_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ToEmails" ADD CONSTRAINT "_ToEmails_A_fkey" FOREIGN KEY ("A") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ToEmails" ADD CONSTRAINT "_ToEmails_B_fkey" FOREIGN KEY ("B") REFERENCES "EmailAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CcEmails" ADD CONSTRAINT "_CcEmails_A_fkey" FOREIGN KEY ("A") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CcEmails" ADD CONSTRAINT "_CcEmails_B_fkey" FOREIGN KEY ("B") REFERENCES "EmailAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BccEmails" ADD CONSTRAINT "_BccEmails_A_fkey" FOREIGN KEY ("A") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BccEmails" ADD CONSTRAINT "_BccEmails_B_fkey" FOREIGN KEY ("B") REFERENCES "EmailAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReplyToEmails" ADD CONSTRAINT "_ReplyToEmails_A_fkey" FOREIGN KEY ("A") REFERENCES "Email"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReplyToEmails" ADD CONSTRAINT "_ReplyToEmails_B_fkey" FOREIGN KEY ("B") REFERENCES "EmailAddress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
