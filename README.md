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
cd SnipSnap
```

### 2. Install dependencies

```bash
npm install
```

This will install dependencies for both the root workspace and all packages.

### 3. Start the database

```bash
npm run db:up
npm run migration:run
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
- `npm run dev:client` - Start only the client development server
- `npm run dev:server` - Start only the server development server
- `npm run build` - Build both client and server
- `npm run build:client` - build only the client
- `npm run build:server` - build only the server
- `npm run db:up` - Starts the db
- `npm run db:down` - Stops the container running the db
- `npm run migration:generate` - Create a new migration file
- `npm run migration:run` - Runs all non applied migrations
- `npm run migration:revert` - Reverts last migrations run 
- `npm run schema:drop` - Removes the schema from the db
- `npm run lint` - Run ESLint on all packages
- `npm run lint:fix` - Run ESLint with auto-fix on all packages
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run lint-and-format` - Run linting and formatting together

## 🐳 Docker Support

Both client and server have Docker support, they run behind a reverse proxy with Nginx:

### Build Docker Image

```bash
npm run build:docker
```

### Run with Docker

```bash
# Runs both services; client and server behind a reverse proxy
npm run dev:docker

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
npm run db:up

# Stop database
npm run db:down
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
│   │   └── package.json
│   └── server/                 # NestJS backend
│       ├── src/
│       ├── test/
│       └── package.json
├── docker-compose.yml          # Database configuration
├── Dockerfile                  # Docker image with reverse proxy for both services
├── package.json                # Root workspace configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create environment files as needed:

#### Server (.env)

```env
# Application Configuration
PORT=3000
NODE_ENV=development
DEFAULT_REDIRECT = 'http://localhost:5173/not-found'

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=dev
DB_SYNCHRONIZE=true
DB_LOGGING=false


# Rate limiting
SHORT_THROTTLE = 3
MEDIUM_THROTTLE = 10
LONG_THROTTLE = 100


# Auth
PASSWORD_SALT= 'mySaltCode'
JWT_SECRET = 'myJWTSecret'
JWT_TTL = '1h'
```

#### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3000/api/graphql
VITE_BASE_URL=http://localhost:3000

```


## 📝 License

This project is licensed under the MIT license.
