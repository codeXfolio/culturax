import app from './app';
import { config } from './config';
import { ensureUploadDirectories } from './utils/fileUtils';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Ensure upload directories exist
    await ensureUploadDirectories();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
