import * as multer from 'multer';

// Configure multer to use memory storage
// @ts-ignore
export const upload = multer({
  storage: multer.memoryStorage(),
});
