# AWS DevOps Quiz Application - Deployment Guide

This guide provides detailed instructions for deploying the AWS DevOps Quiz Application in various environments.

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Self-Hosting Options](#self-hosting-options)
   - [Traditional Server Deployment](#traditional-server-deployment)
   - [Docker Deployment](#docker-deployment)
   - [Cloud Platform Deployment](#cloud-platform-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Maintenance and Updates](#maintenance-and-updates)
6. [Troubleshooting](#troubleshooting)

## Local Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm package manager
- Git

### Step-by-Step Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aws-devops-quiz-app.git
cd aws-devops-quiz-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the project root
   - Add the following variables:
   ```
   JWT_SECRET=your_jwt_secret_here
   ```

4. Initialize the database:
```bash
npx wrangler d1 execute DB --local --file=migrations/0001_initial.sql
npx wrangler d1 execute DB --local --file=migrations/0002_pdf_jobs.sql
```

5. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Self-Hosting Options

### Traditional Server Deployment

#### Prerequisites

- Node.js 18.0.0 or higher
- npm or pnpm package manager
- A server with SSH access (e.g., AWS EC2, DigitalOcean Droplet)
- Nginx or Apache (optional, for reverse proxy)

#### Deployment Steps

1. Connect to your server via SSH:
```bash
ssh user@your-server-ip
```

2. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone the repository:
```bash
git clone https://github.com/yourusername/aws-devops-quiz-app.git
cd aws-devops-quiz-app
```

4. Install dependencies:
```bash
npm install --production
# or
npm install -g pnpm
pnpm install --production
```

5. Build the application:
```bash
npm run build
# or
pnpm build
```

6. Set up environment variables:
```bash
echo "JWT_SECRET=your_jwt_secret_here" > .env.local
```

7. Initialize the database:
```bash
npx wrangler d1 execute DB --local --file=migrations/0001_initial.sql
npx wrangler d1 execute DB --local --file=migrations/0002_pdf_jobs.sql
```

8. Start the application:
```bash
npm start
# or
pnpm start
```

9. (Optional) Set up a process manager like PM2:
```bash
npm install -g pm2
pm2 start npm --name "aws-devops-quiz" -- start
pm2 save
pm2 startup
```

10. (Optional) Configure Nginx as a reverse proxy:
```bash
sudo apt-get install nginx
```

Create a new Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/aws-devops-quiz
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/aws-devops-quiz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Docker Deployment

#### Prerequisites

- Docker
- Docker Compose (optional)

#### Deployment with Docker

1. Create a Dockerfile in the project root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

2. Create a .dockerignore file:
```
node_modules
.next
.git
.env.local
```

3. Build the Docker image:
```bash
docker build -t aws-devops-quiz-app .
```

4. Run the container:
```bash
docker run -p 3000:3000 -e JWT_SECRET=your_jwt_secret_here aws-devops-quiz-app
```

#### Deployment with Docker Compose

1. Create a docker-compose.yml file:
```yaml
version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - JWT_SECRET=your_jwt_secret_here
    restart: always
```

2. Start the services:
```bash
docker-compose up -d
```

### Cloud Platform Deployment

#### AWS Deployment

1. Create an AWS EC2 instance
2. Follow the Traditional Server Deployment steps above
3. Configure security groups to allow traffic on port 80/443

#### Cloudflare Pages Deployment

1. Build the application:
```bash
npm run build
# or
pnpm build
```

2. Install Wrangler CLI:
```bash
npm install -g wrangler
```

3. Authenticate with Cloudflare:
```bash
wrangler login
```

4. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy ./.next
```

5. Configure environment variables in the Cloudflare Dashboard

## Database Setup

The application uses Cloudflare D1 database by default, but can be configured to use other databases.

### Cloudflare D1 Setup

1. Initialize the database:
```bash
npx wrangler d1 execute DB --local --file=migrations/0001_initial.sql
npx wrangler d1 execute DB --local --file=migrations/0002_pdf_jobs.sql
```

### Alternative Database Setup (PostgreSQL)

1. Install PostgreSQL:
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

2. Create a database and user:
```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE awsdevopsquiz;
CREATE USER quizuser WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE awsdevopsquiz TO quizuser;
\q
```

3. Update environment variables:
```
DATABASE_URL=postgresql://quizuser:your_password@localhost:5432/awsdevopsquiz
```

4. Run the migration scripts:
```bash
psql -U quizuser -d awsdevopsquiz -a -f migrations/postgres/0001_initial.sql
psql -U quizuser -d awsdevopsquiz -a -f migrations/postgres/0002_pdf_jobs.sql
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| JWT_SECRET | Secret key for JWT token signing | Yes | - |
| DATABASE_URL | Database connection string (for PostgreSQL) | No | - |
| PORT | Port to run the server on | No | 3000 |
| NODE_ENV | Environment (development/production) | No | development |

## Maintenance and Updates

### Updating the Application

1. Pull the latest changes:
```bash
git pull origin main
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Rebuild the application:
```bash
npm run build
# or
pnpm build
```

4. Restart the application:
```bash
npm start
# or
pnpm start
```

### Database Migrations

When new migrations are added:

```bash
npx wrangler d1 migrations apply DB --local
```

### Backup and Restore

For Cloudflare D1:
```bash
# Backup
npx wrangler d1 backup DB --local backup.sqlite

# Restore
npx wrangler d1 restore DB --local backup.sqlite
```

For PostgreSQL:
```bash
# Backup
pg_dump -U quizuser awsdevopsquiz > backup.sql

# Restore
psql -U quizuser -d awsdevopsquiz -f backup.sql
```

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check if all dependencies are installed
   - Verify environment variables are set correctly
   - Check for errors in the logs

2. **Database connection issues**
   - Verify database credentials
   - Check if database service is running
   - Ensure firewall allows database connections

3. **PDF parsing errors**
   - Verify PDF file format is compatible
   - Check if PDF is encrypted or password-protected
   - Ensure sufficient memory for large PDF files

### Logs

Check application logs:
```bash
# If using PM2
pm2 logs aws-devops-quiz

# If using Docker
docker logs aws-devops-quiz-app

# If using systemd
journalctl -u aws-devops-quiz.service
```

### Getting Help

If you encounter issues not covered in this guide, please:
1. Check the GitHub repository issues section
2. Open a new issue with detailed information about your problem
3. Include relevant logs and environment details
