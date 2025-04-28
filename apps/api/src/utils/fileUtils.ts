import { mkdir } from 'fs/promises';
import { join } from 'path';

export const ensureUploadDirectories = async () => {
  const baseDir = join(process.cwd(), 'uploads');
  const collectionsDir = join(baseDir, 'collections');

  try {
    await mkdir(baseDir, { recursive: true });
    await mkdir(collectionsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directories:', error);
  }
};
