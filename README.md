# YumQuick - React Native Food Delivery App

## Overview

Welcome to YumQuick - a modern food delivery mobile app built with React Native. This project demonstrates practical React Native development including splash/onboarding flows, authentication, food browsing, cart management, and a multi-step checkout process.

Key Features:

1. **Splash & Onboarding**

   - Splash screen displayed only on the first app launch (tracked via AsyncStorage)
   - Swipeable onboarding slides with skip, next, and get started controls

2. **Authentication**

   - Sign In with email and password, including validation and error handling
   - Sign Up with username, email, and password registration with validation
   - Fingerprint / biometric login screen
   - Auth token stored in Zustand and persisted with AsyncStorage

3. **Food Menu**

   - Display food categories as horizontal tabs
   - Food list filtered by the selected category
   - Search bar to find items by name

4. **Food Details**

   - Show product image, name, description, and price
   - Select toppings via RadioController and quantity via QuantityController
   - Add product to cart

5. **Cart & Checkout**

   - Empty state message when no items are in the cart
   - List all products added to cart with image, name, price, and quantity
   - Edit item quantity or remove items from cart
   - Display order total and a Proceed to Checkout button
   - Multi-step checkout: Delivery Time -> Payment -> Order Confirmed
   - Bottom navigation bar to navigate between screens

6. **Profile**

   - View and manage user profile information

7. **Backend API**
   - Local Hono server with Drizzle ORM and Neon (PostgreSQL)
   - REST endpoints for categories, food items, and promo banners
   - Better Auth for session management

## Timeline

- **Estimation time**: 5 days (1 developer)

## Technical Stacks

- **React Native** v0.84.0
- **React** v19.2.3
- **TypeScript** v5.8.3
- **React Navigation** v7
- **React Query (@tanstack/react-query)** v5
- **Zustand** v5
- **NativeWind** v4 (Tailwind CSS for React Native)
- **TailwindCSS** v3
- **React Hook Form** v7
- **Zod** v4
- **Better Auth** v1.5
- **Drizzle ORM** v0.45
- **Hono** v4 (local API server)
- **Storybook** v10 (on-device + web)
- **Jest** v29
- **React Testing Library (@testing-library/react-native)** v13
- **Husky** v9
- **Commitlint**
- **Prettier** v2
- **ESLint** v8

## Target

- Understand and apply navigation in a React Native application
- Get familiar with the way to debug a React Native application
- Building an APK (Android Package) as a valuable part of practice
- Unit test coverage greater than 80%
- Apply Zustand for state management

## Prerequisites

- **Visual Studio Code** v1.105.1 or later
- **Node.js** v22.11.0 or later
- **pnpm** v9.0.0 or later
- **Git** for version control
- **Android Studio** (for Android development / APK build)
- **Xcode** (for iOS development - macOS only)

## Folder Structure

```
YumQuick/
|-- android/                    # Android native project
|-- ios/                        # iOS native project
|-- db/                         # Database schema, migrations, and seed files
|   |-- schema.ts
|   |-- migrations/
|   `-- seed.cjs
|-- server/                     # Local Hono API server
|   |-- index.ts
|   |-- auth.ts
|   |-- db.ts
|   `-- routes/
|       |-- categories.ts
|       |-- foodItems.ts
|       `-- promoBanners.ts
|-- src/
|   |-- assets/                 # Fonts, images, bootsplash assets
|   |-- components/             # Shared UI components
|   |   |-- Badge/
|   |   |-- Button/
|   |   |-- CategoryPill/
|   |   |-- Divider/
|   |   |-- FormTextInput/
|   |   |-- Heading/
|   |   |-- LoadingIndicator/
|   |   |-- QuantityController/
|   |   |-- RadioController/
|   |   |-- StarburstBadge/
|   |   |-- TextInput/
|   |   |-- Toast/
|   |   `-- Typography/
|   |-- constants/              # App-wide constants
|   |-- features/               # Feature modules
|   |   |-- auth/               # Splash, Onboarding, Login, Register, Fingerprint
|   |   |-- cart/               # Cart, Confirm Order, Delivery Time, Payment, Order Confirmed
|   |   |-- food-menu/          # Food Menu, Food Detail
|   |   |-- home/               # Home screen
|   |   `-- profile/            # Profile screen
|   |-- hooks/                  # Shared custom hooks
|   |-- icons/                  # SVG icon components
|   |-- lib/                    # Utility libraries
|   |-- navigation/             # React Navigation setup
|   |   |-- RootNavigator.tsx
|   |   |-- AppNavigator.tsx
|   |   `-- AuthNavigator.tsx
|   |-- services/               # API service functions
|   |-- store/                  # Zustand stores
|   |   |-- authStore.ts
|   |   `-- cartStore.ts
|   |-- theme/                  # Design tokens and theme config
|   |-- types/                  # Shared TypeScript types
|   `-- utils/                  # Utility functions
|-- __tests__/                  # Root-level test files
|-- App.tsx
|-- index.js
|-- package.json
|-- tsconfig.json
|-- tailwind.config.js
|-- metro.config.js
|-- jest.config.js
`-- README.md
```

## Step by Step to Run This App Locally

| Command                                                                       | Action                                    |
| ----------------------------------------------------------------------------- | ----------------------------------------- |
| `git clone https://gitlab.asoft-python.com/luan.vu/react-native-training.git` | Download the source code                  |
| `cd react-native`                                                             | Move to project folder                    |
| `pnpm install`                                                                | Install JS dependencies                   |
| `cp .env.example .env`                                                        | Create environment variables file         |
| _Configure your `.env` file_                                                  | Add required environment variables        |
| `bundle install`                                                              | Install Ruby gems (iOS only, first time)  |
| `bundle exec pod install`                                                     | Install CocoaPods dependencies (iOS only) |
| `pnpm api:dev`                                                                | Start the local API server                |
| `pnpm start`                                                                  | Start the Metro bundler                   |
| `pnpm android`                                                                | Build and run on Android                  |
| `pnpm ios`                                                                    | Build and run on iOS                      |

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Neon Database
DATABASE_URL=your_neon_database_url

# Better Auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# API
API_BASE_URL=http://10.0.2.2:3000
```

Contact for env

> **Note:** Use `10.0.2.2` as the host when connecting from the Android emulator to your local machine. Use `localhost` for the iOS simulator.

## Available Scripts

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `pnpm start`             | Start Metro bundler                      |
| `pnpm start:fresh`       | Start Metro with a clean cache           |
| `pnpm android`           | Build and run on Android emulator/device |
| `pnpm ios`               | Build and run on iOS simulator/device    |
| `pnpm api`               | Start the local Hono API server          |
| `pnpm api:dev`           | Start the API server in watch mode       |
| `pnpm test`              | Run unit tests                           |
| `pnpm lint`              | Lint the codebase                        |
| `pnpm clean`             | Clean the React Native build cache       |
| `pnpm clean:android`     | Clean the Android Gradle build           |
| `pnpm storybook`         | Run Storybook on-device (Metro)          |
| `pnpm storybook:android` | Run Storybook on Android                 |
| `pnpm storybook:ios`     | Run Storybook on iOS                     |
| `pnpm storybook:web`     | Run Storybook on web at port 6006        |
| `pnpm db:generate`       | Generate Drizzle ORM migrations          |
| `pnpm db:migrate`        | Run database migrations                  |
| `pnpm db:studio`         | Open Drizzle Studio                      |

## Testing

This project uses Jest and React Testing Library for unit testing.

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Generate coverage report
pnpm test --coverage
```

> Test coverage target: **>= 80%**

## Building an APK (Android)

```bash
cd android
./gradlew assembleRelease
```

The output APK will be located at `android/app/build/outputs/apk/release/app-release.apk`.

## Helpful Links

- [React Native Training Plan](https://docs.google.com/document/d/1MZp0ACBxqbX4YAxDdO8_Tjpj3AroPsuRz5bcV00ScHw/edit?tab=t.0)
- [React Navigation Practice Plan (Basic)](https://docs.google.com/document/d/1BFWxZoDs8pE3eVNVKRu-bl8zinUeIoTIF0w13oMAA_4/edit?tab=t.0)
- [Figma design](https://www.figma.com/design/OCnhD9XjnuVxxO6a7CcyMQ/Food-Delivery-App-UI-Kit-Food-App-Design-Food-Mobile-App-Delivery-UI--Community-?node-id=1-423&p=f&t=kSSIyJqacWSD4SX1-0)
