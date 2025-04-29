import express from 'express';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import aiDocs from './docs/ai.json';
// @ts-ignore
import collectionDocs from './docs/collection.json';
// @ts-ignore
import creatorDocs from './docs/creator.json';
// @ts-ignore
import userDocs from './docs/user.json';

const app = express();

// Combine API documentation
const openApiDocs = {
  openapi: '3.0.0',
  info: {
    title: 'CulturaX API',
    version: '1.0.0',
    description: 'API for managing entire platform',
  },
  servers: [
    {
      url: 'http://localhost:5555',
      description: 'Local Development',
    },
  ],
  tags: [
    {
      name: 'Creator',
      description: 'Operations related to creators',
    },
    {
      name: 'User',
      description: 'Operations related to users',
    },
    {
      name: 'AI',
      description: 'Operations related to AI',
    },
    {
      name: 'Collection',
      description: 'Operations related to collections',
    },
  ],
  paths: {
    ...aiDocs,
    ...collectionDocs,
    ...creatorDocs,
    ...userDocs,
  },
};

// Serve Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(openApiDocs));

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
