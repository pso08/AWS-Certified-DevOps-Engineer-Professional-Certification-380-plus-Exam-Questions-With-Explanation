FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN pnpm build

# Create necessary directories
RUN mkdir -p uploads data

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
