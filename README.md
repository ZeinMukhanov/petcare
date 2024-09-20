<img src="https://github.com/ZeinMukhanov/petcare/blob/master/public/Demo.png">

# PetCare
Welcome to PetCare, a full-featured pet daycare app offering an intuitive and seamless user experience for both users and pet daycare owners. This app includes payment integration through Stripe, user authentication, and an user-friendly user dashboard for managing pet daycare services.

## Live Application

You can check out the live version of the app here:

[petcare-cura.vercel.app](https://petcare-cura.vercel.app)

## Description:
PetCare is designed to make managing pet daycare services simple and efficient. The app offers:

- User Authentication: Secure login and registration for users and daycare owners.
- Comprehensive Routing: Navigating through different pages is smooth and user-friendly.
- User Dashboard: A personalized dashboard that provides users and daycare owners with their account and service details.
- Optimistic UI Hooks: Enjoy a faster, more responsive experience as the UI reflects changes instantly before backend confirmations.
- Persistent Data: All data is saved and restored between sessions, ensuring no loss of information.

## Database

PetCare uses Prisma ORM for interacting with a PostgreSQL database. During development, an SQLite database is used for ease of use and testing. All user and service-related data is stored securely in the database.

## Stripe Payment Integration

Use Stripe for secure and reliable payment processing. The app supports a one-time $99 lifetime payment for PetCare services. Users can add or update their payment methods through their account page, and subscriptions are handled via Stripe's robust API.

PetCare uses Stripe's developer testing mode:
- Card Number: 4242 4242 4242 4242
- DD/MM: 4/44
- CVV: 444

## Libraries:
A few key libraries used in PetCare include:

- Zod: Used for input validation, ensuring data correctness across the app.
- ngrok: Enables local development to expose the local server to the internet.
- bcryptjs: Provides secure password hashing for user authentication.
- sonner: A lightweight library for toast notifications and error handling.
- Stripe: Used for processing payments.

## Technologies used:
- TypeScript
- TailwindCSS
- Next.js
- PostgreSQL
- Prisma ORM
- Vercel



