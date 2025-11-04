# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenSesame Frontend is a React-based user management and authentication interface that connects to the opensesame-back API. It provides role-based access control with user, admin roles and permission-based actions.

## Development Commands

```bash
# Development server (runs on port 3000)
yarn start

# Production build
yarn build

# Run all tests
yarn test

# Lint and fix code
yarn lint

# Format code with Prettier
yarn prettify

# TypeScript type checking
yarn types

# Complete verification pipeline (lint, format, types, audit, test, build)
yarn verify

# Security scan with gitleaks
yarn gitleaks
```

## Architecture Overview

### Core Structure
- **React Router v7** with lazy loading for all routes
- **Context-based state management** using UserContext and ToastContext
- **Axios-based API client** with cookie-based authentication
- **TypeScript** throughout with strict type checking
- **Webpack** custom configuration for bundling
- **Jest + Testing Library** for testing with MSW for API mocking

### Key Directories
- `src/pages/` - Main application pages (Login, MainPage, ManageUsers, NewUser)
- `src/components/` - Reusable UI components with co-located tests and types
- `src/context/` - React contexts for global state (User, Toast)
- `src/common/types/` - TypeScript type definitions
- `src/mocks/` - MSW handlers and mock data for testing
- `src/api.ts` - Axios instance configuration

### Authentication Flow
- Cookie-based authentication with `withCredentials: true`
- Protected routes wrapped with ProtectedRoute component
- User state managed through UserContext
- BASE_URL_API environment variable for API endpoint configuration

### Component Organization
Each component follows a consistent pattern:
- Component.tsx (main component)
- Component.test.tsx (tests)
- Component.types.ts (TypeScript interfaces)
- Co-located with related sub-components

### State Management
- UserContext: Manages logged-in user data and authentication state
- ToastContext: Handles application-wide notifications and status messages
- No external state management library (Redux, Zustand) - uses React Context

### Testing Strategy
- Jest with jsdom environment
- React Testing Library for component testing
- MSW (Mock Service Worker) for API mocking
- Test setup includes polyfills and custom matchers
- Tests co-located with components

## Environment Configuration

Create `.env` from `.example.env`:
```bash
NODE_ENV=development
BASE_URL_API=http://localhost:8080/api
```

## Type System

The app uses strict TypeScript with:
- User types defining roles ('user' | 'admin') and permissions
- API response types for backend integration
- Component prop types for all interfaces
- Strict null checks enabled

## Important Notes

- Requires Node.js 24 (Krypton) or higher
- Requires opensesame-back API running on configured BASE_URL_API
- Uses React 19 with modern React Router v7
- Webpack dev server includes history API fallback for client-side routing
- ESLint configuration includes React, TypeScript, accessibility, and testing rules
- Import sorting is enforced with specific grouping rules (React imports first)