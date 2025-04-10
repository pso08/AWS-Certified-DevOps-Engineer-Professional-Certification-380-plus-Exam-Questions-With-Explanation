# OAuth Setup Guide for AWS DevOps Quiz App

This guide provides step-by-step instructions for setting up OAuth authentication with Google and GitHub for your AWS DevOps Quiz App.

## Prerequisites

- A domain name for your application (for production use)
- Access to Google Cloud Console and GitHub Developer settings
- Your application deployed to a server with HTTPS enabled (for production)

## 1. Setting Up Google OAuth

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page and select "New Project"
3. Enter a project name (e.g., "AWS DevOps Quiz App") and click "Create"
4. Select your new project from the project dropdown

### Step 2: Configure OAuth Consent Screen

1. In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you're restricting to a Google Workspace organization)
3. Click "Create"
4. Fill in the required information:
   - App name: "AWS DevOps Quiz App"
   - User support email: Your email address
   - Developer contact information: Your email address
5. Click "Save and Continue"
6. Skip adding scopes by clicking "Save and Continue"
7. Add test users if needed, then click "Save and Continue"
8. Review your settings and click "Back to Dashboard"

### Step 3: Create OAuth Client ID

1. In the left sidebar, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: "AWS DevOps Quiz App Web Client"
5. Add Authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
6. Add Authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
7. Click "Create"
8. Note your Client ID and Client Secret (you'll need these later)

## 2. Setting Up GitHub OAuth

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "OAuth Apps" in the left sidebar
3. Click "New OAuth App"
4. Fill in the application details:
   - Application name: "AWS DevOps Quiz App"
   - Homepage URL: 
     - For development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - Application description: "Quiz application for AWS DevOps certification preparation"
   - Authorization callback URL:
     - For development: `http://localhost:3000/api/auth/callback/github`
     - For production: `https://yourdomain.com/api/auth/callback/github`
5. Click "Register application"
6. Note your Client ID
7. Click "Generate a new client secret" and note the Client Secret (you'll need these later)

## 3. Configuring Your Application

### Step 1: Set Up Environment Variables

Create or update your `.env.local` file with the following variables:

```
# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000  # Change to https://yourdomain.com for production
NEXTAUTH_SECRET=your_random_secret_key  # Generate a random string for this
```

To generate a secure random string for NEXTAUTH_SECRET, you can use:

```bash
openssl rand -base64 32
```

### Step 2: Update NextAuth Configuration

The application is already configured to use these environment variables in `src/lib/auth/auth.ts`. The relevant code looks like this:

```typescript
// OAuth providers configuration
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  // ... other providers
];
```

## 4. Testing Your OAuth Setup

### For Development:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/login`

3. Click on "Continue with Google" or "Continue with GitHub"

4. You should be redirected to the respective provider's login page

5. After successful authentication, you should be redirected back to your application

### For Production:

1. Deploy your application with the environment variables set

2. Navigate to your production URL

3. Test the OAuth login flow as described above

## 5. Troubleshooting

### Common Issues:

1. **Redirect URI Mismatch**: Ensure the redirect URIs in your OAuth provider settings exactly match the ones your application is using.

2. **Missing Environment Variables**: Double-check that all required environment variables are set correctly.

3. **CORS Issues**: If you're experiencing CORS errors, ensure your domain is properly configured in the OAuth provider settings.

4. **Callback Error**: If you see "Error: The callback URL provided is not in the list of allowed callback URLs", check your OAuth provider configuration.

5. **Invalid Client Secret**: Ensure you've copied the client secret correctly and it hasn't expired.

## 6. Security Considerations

1. **Never commit your OAuth credentials to version control**

2. **Use HTTPS in production** to protect user credentials and tokens

3. **Regularly rotate your client secrets** for enhanced security

4. **Limit the OAuth scopes** to only what your application needs

5. **Implement proper CSRF protection** (NextAuth.js handles this for you)

## 7. Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)

For any further assistance, please contact the application administrator.
