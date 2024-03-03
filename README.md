# Appinio

Welcome to Appinio, an innovative application with backend and frontend components. This tutorial will guide you through the setup process, including installing dependencies, configuring the environment, and running the application.

## Step 1: Prerequisites

Before you begin, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (required for npm)
- [Taskfile](https://taskfile.dev/#/installation) (installed via npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Ensure Docker Desktop is installed and running for hosting the MySQL database in a Docker container)

## Step 2: Clone the Repository

```bash
git clone https://github.com/your-username/appinio.git
cd appinio
```

## Step 3: Install Taskfile

```bash
npm install -g taskfile
```

## Step 4: Configure Backend

Adjust the `.env` file inside the `appinio-backend` directory and include the following:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

## Step 5: Database Setup

### 5.1 Start Database (MySQL in Docker)

During this step, a Docker container will be started to host a MySQL instance.

```bash
task run-db
```

### 5.2 Shape Database

```bash
task shape-db
```

During this step, Prisma applies the initial migration to create tables.

To access the database through a client, use the following credentials:

- **Username:** user
- **Password:** password
- **Database:** db

## Step 6: Backend Setup

### 6.1 Install Backend Dependencies

```bash
task install-backend-deps
```

### 6.2 Run Backend

```bash
task run-backend
```

The backend will be accessible at http://localhost:8080, and the OpenAPI Swagger documentation is available at http://localhost:8080/api.

### 6.3 Run Backend Tests

To run backend tests, use the following command:

```bash
task run-backend-tests
```

## Step 7: Frontend Setup

### 7.1 Frontend Installation

```bash
task install-frontend
```

### 7.2 Run Frontend

```bash
task run-frontend
```

### 7.3 Run Frontend Tests

To run frontend tests, use the following command:

```bash
task run-frontend-tests
```

The frontend will be accessible at http://localhost:3000.

Appinio is also available at https://appinio.thedevbar.com running on my Kubernetes internal cluster.
