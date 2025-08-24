# SnipSnap

A modern URL shortener application built with React and NestJS, featuring a clean interface and robust API.

## 🏗️ Architecture

This project is organized as a monorepo with two main packages:

- **Client** (`packages/client`): React frontend built with Vite and TypeScript
- **Server** (`packages/server`): NestJS API backend with TypeScript
- **Database**: PostgreSQL (via Docker Compose)

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v22 or higher)
- **npm** (11 or higher)
- **Docker** and **Docker Compose** (for database)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/jose-galvan/SnipSnap.git
cd snipsnap
```

### 2. Install dependencies

```bash
npm install
```

This will install dependencies for both the root workspace and all packages.

### 3. Start the database

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432 with the following credentials:

- Database: `dev`
- Username: `user`
- Password: `password`

### 4. Start the development servers

```bash
npm run dev
```

This will start both the client and server in development mode:

- **Client**: http://localhost:5173 (React app with Vite)
- **Server**: http://localhost:3000 (NestJS API)

## 🛠️ Development

### Available Scripts

#### Root Level Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run dev-client` - Start only the client development server
- `npm run dev-server` - Start only the server development server
- `npm run lint` - Run ESLint on all packages
- `npm run lint:fix` - Run ESLint with auto-fix on all packages
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint-and-format` - Run linting and formatting together

#### Client Scripts (packages/client)

```bash
cd packages/client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint client code
npm run lint:fix     # Lint and fix client code
npm run format       # Format client code
```

#### Server Scripts (packages/server)

```bash
cd packages/server
npm run dev          # Start development server with watch mode
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
npm run lint         # Lint server code
npm run lint:fix     # Lint and fix server code
npm run format       # Format server code
```

### Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Code style preferences:

- No semicolons
- Single quotes
- 120 character line limit

## 🐳 Docker Support

Both client and server have Docker support:

### Build Docker Images

```bash
# Build server image
cd packages/server
npm run build-docker

# Build client image
cd packages/client
npm run build-docker
```

### Run with Docker

```bash
# Run server container
cd packages/server
npm run dev-docker

# Run client container
cd packages/client
npm run dev-docker
```

## 🗄️ Database

The application uses PostgreSQL as its database. The database configuration is managed through Docker Compose.

### Database Connection

Default connection details:

- **Host**: localhost
- **Port**: 5432
- **Database**: dev
- **Username**: user
- **Password**: password

### Managing the Database

```bash
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View database logs
docker-compose logs db

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

## 🧪 Testing

### Running Tests

```bash
# Run all server tests
cd packages/server
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## 📁 Project Structure

```
snipsnap/
├── packages/
│   ├── client/                 # React frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── server/                 # NestJS backend
│       ├── src/
│       ├── test/
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml          # Database configuration
├── package.json               # Root workspace configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create environment files as needed:

#### Server (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dev
PORT=3000
```

#### Client (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Production Deployment

### Building for Production

```bash
# Build both client and server
npm run build

# Or build individually
cd packages/client && npm run build
cd packages/server && npm run build
```

### Production Server

```bash
cd packages/server
npm run start:prod
```

## 📝 License

This project is licensed under the MIT license.
