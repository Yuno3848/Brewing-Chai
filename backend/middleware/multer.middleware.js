import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadMul = multer({
  storage: storage,
});
