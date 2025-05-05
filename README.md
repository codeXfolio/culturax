# CulturaX Platform

A decentralized platform connecting creators and audiences through blockchain technology, enabling direct content monetization and community engagement.

## Overview

CulturaX is a comprehensive Web3 platform consisting of three main components:

-  A modern web application for creators and users
-  A robust backend API service
-  Smart contracts for blockchain interactions

The platform enables creators to tokenize their content, engage with their community, and monetize their work directly through blockchain technology.

## Tech Stack

### Frontend (Web Application)

-  **Next.js** - React framework for production
-  **TailwindCSS** - Utility-first CSS framework
-  **ethers.js** - Ethereum wallet integration

### Backend API

-  **Node.js** - Runtime environment
-  **TypeScript** - Programming language
-  **Express.js** - Web application framework
-  **Prisma** - Next-generation ORM
-  Development Tools:
   -  tsx
   -  nodemon
   -  prettier

### Blockchain / Smart Contracts

-  **Solidity** - Smart contract development
-  **Hardhat** - Development environment
-  **OpenZeppelin** - Contract standards & security
-  Testing & Deployment:
   -  Ethers.js
   -  Hardhat Test

### Infrastructure

-  **Digital Ocean** - Cloud provider
-  **PostgreSQL** - Primary database
-  **IPFS/Filecoin** - Decentralized storage
-  **Soneium Network** - Layer 2 blockchain solution

## Architecture

The platform follows a microservices architecture with:

-  Decentralized content storage
-  On-chain ownership verification
-  Secure API endpoints
-  Responsive frontend interface

## Local Development

### Running the Web Frontend

1. Navigate to the web application directory:

```bash
cd apps/web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The web application will be available at `http://localhost:3000`

### Running the API Backend

1. Navigate to the API directory:

```bash
cd apps/api
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The API server will be available at `http://localhost:5555`

### API Documentation

To view the API documentation:

1. Navigate to the API directory:

```bash
cd apps/api
```

2. Run the Swagger documentation server:

```bash
npm run specs
```

The API documentation will be available at `http://localhost:3333`

### Environment Setup

Both the web and API applications require environment variables to be set up. Copy the example environment files and configure them:

For the web application:

```bash
cd apps/web
cp .env.example .env
```

For the API:

```bash
cd apps/api
cp .env.example .env
```

Make sure to fill in the required environment variables in both `.env` files before starting the applications.
