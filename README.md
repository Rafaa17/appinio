# Appinio

Welcome to Appinio, an innovative application with backend and frontend components. This tutorial will guide you through the setup process, including installing dependencies, configuring the environment, and running the application.

## Assumptions

- We always want to reach to OpenAI to summarize the content, thus is always an `OPENAI_API_KEY` in place.
- Since content can be anything, I am treating it a just a plain string and passing it to OpenAI API to get string summary and insights.
- No post can be created without summary or insights.
- We want some basic authorization.
- Users need to be logged in in order to be able to see their posts or create a new one.

## Usage

[Demo](https://github.com/Rafaa17/appinio/assets/26599209/7df75d15-d35a-42de-b889-f882c5a12faa)

## Step 1: Prerequisites

Before you begin, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) version 18.15.0 (you can use `nvm` for version management)
- [Taskfile](https://taskfile.dev/#/installation) (installed via npm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Ensure Docker Desktop is installed and running for hosting the MySQL database in a Docker container)

## Step 2: Clone the Repository

```bash
git clone https://github.com/Rafaa17/appinio.git
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

During this step, Prisma applies the initial migration to create tables.

To access the database through a client, use the following credentials:

- **Username:** user
- **Password:** password
- **Database:** db

## Step 6: Backend Setup

### 6.1 Install Backend Dependencies

```bash
# optional - if using nvm
nvm use
```

```bash
task install-backend-deps
```

### 6.2 Shape Database - init migration

```bash
task shape-db
```

### 6.3 Run Backend Tests

To run backend tests, use the following command:

```bash
task run-backend-tests
```

### 6.4 Run Backend

```bash
task run-backend
```

The backend will be accessible at http://localhost:8080, and the OpenAPI Swagger documentation is available at http://localhost:8080/api.

## Step 7: Frontend Setup

### 7.1 Frontend Installation

```bash
task install-frontend-deps
```

### 7.2 Run Frontend Tests

To run frontend tests, use the following command:

```bash
task run-frontend-tests
```

### 7.3 Run Frontend

```bash
task run-frontend
```

## Step 8: Using the App

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. On the login page click on the `Register` button.
3. Enter a simple username, password, and email in the registration form.
4. Click on the `Register` button to create your account.
5. If everything went smooth you should be in the Home page where created posts appear.
6. Click on `Add New Post` button on the top left.
7. Enter some content in the box and press summarize.
8. If everything went smooth two more boxes will appear showing the summary and insights that ChatGPT extracted from the content.
9. Click on `Create` button to create the post.
10. If everything went smooth you should be redirected to the home page viewing the newely craeted post.
11. You can press `Logout` to logout.
12. You can then log in again, using the registered credentials.

The frontend will be accessible at http://localhost:3000.

Appinio is also available at https://appinio.thedevbar.com running on my Kubernetes internal cluster.
