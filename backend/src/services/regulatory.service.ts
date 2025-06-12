import {prisma} from '../../prisma/prisma.service';

export const uploadDocument = async (
  title: string,
  fileName: string,
  fileType: string,
  version: string
) => {
  return prisma.regulatoryDocument.create({
    data: { title, fileName, fileType, version }
  });
};

export const getAllDocuments = async () => {
  return prisma.regulatoryDocument.findMany({
    orderBy: { uploadedAt: 'desc' }
  });
};
