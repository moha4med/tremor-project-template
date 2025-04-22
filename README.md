# Tremor Project Template

This is a **Tremor-based project template** bootstrapped with [Next.js](https://nextjs.org). It provides a modern and scalable starting point for building web applications with authentication, reusable components, and state management.

## Features

- **Authentication**:
  - Login, Register, Forgot Password and Reset Password pages.
  - Integrated with [Firebase Authentication](https://firebase.google.com).
  - Input validation using [Zod](https://github.com/colinhacks/zod) for type safety.

- **Reusable Components**:
  - Pre-built, reusable UI components like `Button`, `Input`, `Label`, and `Divider`.

- **State Management**:
  - Lightweight state management using [Zustand](https://github.com/pmndrs/zustand).

- **Custom Hooks**:
  - Custom React hooks for reusable logic.

- **Project Structure**:
  - Modular structure for scalability and maintainability.

- **Utility Functions**:
  - General utility functions to simplify development.

- **Styling**:
  - Component-specific and global styles managed via Tailwind CSS.

- **TypeScript Support**:
  - Full type safety with TypeScript.

## Folder Structure

```plaintext
src/
├── app/                     # Next.js app directory
│   ├── auth/                # Authentication-related pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   ├── verify-code/
│   │   │   └── verify-email/
├── components/              # Reusable UI components
│   ├── custom/              # Custom reusable components
│   ├── Button.tsx           # Button component
│   ├── Input.tsx            # Input component
│   ├── Label.tsx            # Label component
│   └── Divider.tsx          # Divider component
├── hooks/                   # Custom React hooks
├── schemas/                 # Zod schemas for validation
├── services/                # API calls and business logic
├── store/                   # State management (Zustand)
├── styles/                  # Global and component-specific styles
├── utils/                   # Utility functions
└── types/                   # TypeScript types and interfaces
```

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Firebase Project](https://firebase.google.com/) for authentication setup.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moha4med/tremor-project-template.git
   cd tremor-project-template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure Firebase:
   - Add your Firebase configuration in the `.env.local` file in the root directory:

     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Built With

- [Next.js](https://nextjs.org) - React Framework
- [Firebase Authentication](https://firebase.google.com) - Firebase services for user authentication.
- [Zod](https://github.com/colinhacks/zod) - Input validation library.
- [Zustand](https://github.com/pmndrs/zustand) - State management library.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript.

## Available Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Analyze code for potential issues with ESLint.

## Features to Add

This template can be extended with the following features:
- Unit and integration tests using Jest and React Testing Library.
- CI/CD pipeline using GitHub Actions.
- Example protected routes for authenticated users.