# Appinio

Welcome to Appinio, an innovative application with backend and frontend components. This tutorial will guide you through the setup process, including installing dependencies, configuring the environment, and running the application.

## Step 1: Prerequisites

Before you begin, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org/) (required for npm)
- [Taskfile](https://taskfile.dev/#/installation) (installed via npm)

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

### 5.1 Run Database

```bash
task run-db
```

### 5.2 Shape Database

```bash
task shape-db
```

## Step 6: Backend Setup

### 6.1 Install Backend Dependencies

```bash
task install-backend-deps
```

### 6.2 Run Backend

```bash
task run-backend
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

## CI/CD Workflows

In the `workflows` directory, GitHub Actions workflows automate the deployment of both backend and frontend components. These workflows are tailored for self-customized CI/CD environments.

Appinio is also available at https://appinio.thedevbar.com running on my Kubernetes internal cluster.
