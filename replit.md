# Overview

This is a React-based AI photo processing application that specializes in generating professional portraits and ID photos. The app allows users to upload photos and generate various types of AI-enhanced images including professional headshots, black and white artistic portraits, ID photos, and WeChat avatar frames. The application features a modern design with shadcn/ui components and provides payment processing capabilities for premium features.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Build System**: ESBuild for production bundling
- **Development**: Hot module replacement with Vite middleware
- **API Design**: RESTful API structure with Express routes
- **Session Management**: Express sessions with PostgreSQL store
- **File Handling**: Static file serving for uploaded images and assets

## Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema changes
- **Data Models**: 
  - Photo processing jobs with status tracking
  - Payment records with transaction management
  - Sample images categorized by photo types
- **Storage Strategy**: In-memory fallback storage for development with interface abstraction

## Photo Processing Categories
The application supports four main photo categories:
- **Professional Photos**: Corporate headshots and business portraits
- **Black & White Art**: Artistic monochrome portraits
- **ID Photos**: Government and institutional identification photos with specific sizing requirements
- **WeChat Portraits**: Social media avatar frames and decorative borders

## Payment Integration
- **Provider**: Stripe integration for payment processing
- **Workflow**: Job-based payment system where users pay for high-resolution downloads
- **Status Tracking**: Payment status linked to photo generation jobs

## File Management
- **Upload Handling**: Client-side file selection with preview capabilities
- **Asset Serving**: Static file serving for sample images and generated content
- **Privacy Protection**: Original photos are automatically deleted after processing

# External Dependencies

## Core Technologies
- **Neon Database**: Serverless PostgreSQL database hosting
- **Stripe**: Payment processing and subscription management
- **Vite**: Frontend build tool and development server

## UI and Design
- **Radix UI**: Unstyled, accessible UI component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Typography with DM Sans, Fira Code, and Geist Mono

## Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code formatting and linting
- **Replit Plugins**: Development environment integration for cartographer and dev banner

## Image Processing
The application appears designed to integrate with external AI image processing services, though the specific providers are not explicitly configured in the current codebase. The architecture supports async job processing for photo generation workflows.