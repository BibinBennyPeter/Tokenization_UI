-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fullName" TEXT,
    "dob" TIMESTAMP(3),
    "gender" TEXT,
    "nationality" TEXT,
    "occupation" TEXT,
    "avgIncome" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kyc_documents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "panNumber" TEXT,
    "panImageUrl" TEXT,
    "aadhaarNumber" TEXT,
    "aadhaarImageUrl" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "addressProofUrl" TEXT,
    "drivingLicenseNo" TEXT,
    "drivingLicenseUrl" TEXT,
    "passportNo" TEXT,
    "passportUrl" TEXT,
    "voterIdNo" TEXT,
    "voterIdUrl" TEXT,
    "selfieUrl" TEXT,

    CONSTRAINT "kyc_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_details" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountHolderName" TEXT,
    "accountNumber" TEXT,
    "ifscCode" TEXT,
    "bankName" TEXT,
    "bankProofUrl" TEXT,

    CONSTRAINT "bank_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebaseId_key" ON "users"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_userId_key" ON "kyc_documents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_panNumber_key" ON "kyc_documents"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_aadhaarNumber_key" ON "kyc_documents"("aadhaarNumber");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_drivingLicenseNo_key" ON "kyc_documents"("drivingLicenseNo");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_drivingLicenseUrl_key" ON "kyc_documents"("drivingLicenseUrl");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_passportNo_key" ON "kyc_documents"("passportNo");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_passportUrl_key" ON "kyc_documents"("passportUrl");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_voterIdNo_key" ON "kyc_documents"("voterIdNo");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_voterIdUrl_key" ON "kyc_documents"("voterIdUrl");

-- CreateIndex
CREATE UNIQUE INDEX "kyc_documents_selfieUrl_key" ON "kyc_documents"("selfieUrl");

-- CreateIndex
CREATE UNIQUE INDEX "bank_details_userId_key" ON "bank_details"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bank_details_accountNumber_key" ON "bank_details"("accountNumber");

-- AddForeignKey
ALTER TABLE "kyc_documents" ADD CONSTRAINT "kyc_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_details" ADD CONSTRAINT "bank_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
