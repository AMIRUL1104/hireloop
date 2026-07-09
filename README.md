# HireLoop

HireLoop is a modern job marketplace platform that connects job seekers, recruiters, and admins in one streamlined experience. The platform supports job discovery, application tracking, company registration, subscription-based upgrades, and recruiter tools for efficient hiring.

## Project Overview

HireLoop is designed to simplify the hiring lifecycle by providing:

- A polished experience for job seekers to browse and apply for jobs
- A recruiter dashboard to post jobs and manage applicants
- An admin panel for platform oversight and moderation
- Secure subscription-based access through Stripe
- Role-based authentication and dashboard experiences

## Screenshot

![HireLoop Screenshot](public/images/globe.png)

## Live Demo

- Live Demo: TBD
- Deployment Platform: Vercel / Netlify / Custom Hosting (to be configured)

## Server Repository Links

- Server Repository:

## Technologies

- Next.js 16
- React 19
- Tailwind CSS
- Better Auth
- MongoDB
- Express.js
- Stripe
- Framer Motion
- HeroUI
- Lucide React
- React Hook Form
- React Toastify

## Features

### For Job Seekers

- Browse and search jobs with filters
- Save jobs for later
- Apply for jobs through the platform
- Track application status
- Upgrade to premium plans

### For Recruiters

- Register and manage company profiles
- Post and manage job listings
- Review and update applicant status
- Monitor hiring activity from the dashboard

### For Admins

- Manage users and roles
- Approve or reject companies
- Moderate job listings
- Monitor platform activity and subscriptions

## Dependencies

Core dependencies used in this project include:

- next
- react
- react-dom
- better-auth
- mongodb
- stripe
- @heroui/react
- motion
- lucide-react
- react-hook-form
- react-toastify

## Local Setup Guide

### Prerequisites

Make sure you have the following installed:

- Node.js 18+ or newer
- npm or pnpm
- MongoDB instance
- Stripe account

### Installation

1. Clone the repository

   ```bash
   git clone <your-repository-url>
   cd hireloop
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a local environment file

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open your browser
   ```text
   http://localhost:3000
   ```

## Environment Variables

Create a `.env.local` file and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_DB_NAME=hireloop
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_image_upload_api_key_optional
```

> If you are using a different hosting setup, update the base URL and Stripe configuration accordingly.

## Author Information

- Project Name: HireLoop
- Maintainer: HireLoop Development Team
- GitHub: Add your repository link here
- Email: Add your contact email here

## License

This project is currently unlicensed. Add an appropriate license if you plan to share or deploy it publicly.
