# News Dashboard & Payout Management Project

## Overview
This project is a responsive news dashboard built with Next.js (App Router) and Tailwind CSS. It features live news fetching from a third-party API, user authentication with NextAuth.js, an admin-only payout calculator, export functionality, dark mode, and offline support using IndexedDB.

## Features

- **News API Integration:** Fetches live news articles by category with search and filtering.
- **Responsive UI:** Modern, clean design using Tailwind CSS with a sticky navbar and responsive cards.
- **User Authentication:** NextAuth.js with Google OAuth and credentials provider for email/password login.
- **Role-Based Access:** Admin users have access to payout management features.
- **Payout Calculator:** Admins can set payout rates per author, with inline editing and localStorage persistence.
- **Export Functionality:** Export payout reports as PDF and CSV files.
- **Dark Mode:** Toggle between light and dark themes with system preference detection.
- **Offline Support:** Uses IndexedDB (Dexie.js) to cache news articles for offline viewing.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/Navpreet-Saini/dashboard-news-payout.git
    cd dashboard-news-payout
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env.local` file in the root with the following variables:
    ```
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    NEWS_API_KEY=your_newsapi_key
    ```

4. Run the development server:
    ```
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components like Navbar, NewsList, PayoutCalculator, DarkModeToggle
- `src/db/` - Dexie.js IndexedDB setup
- `src/utils/` - Utility functions for export (PDF/CSV)
- `src/types/` - TypeScript type definitions
- `src/app/api/` - API routes for news and authentication

## Usage

### Authentication
- Login with Google or email/password.
- Admin user example: `admin@example.com` / `adminpassword`.
- Admins can access the Payouts page.

### News Dashboard
- Browse news by category.
- Search news articles.
- Offline support caches news for viewing without internet.

### Payout Management (Admin Only)
- Set global and per-author payout rates.
- Inline editing of rates.
- Export payout reports as PDF or CSV.

### Dark Mode
- Toggle dark mode using the button in the navbar.
- Theme preference is saved and respects system settings.

## Development Notes

- Tailwind CSS configured with dark mode support.
- NextAuth.js configured for App Router with session provider in client components.
- IndexedDB caching implemented with Dexie.js.
- Export uses jsPDF and papaparse.

## Troubleshooting

- Ensure `.env.local` variables are set correctly.
- Restart dev server after environment changes.
- If Tailwind styles do not apply, check `tailwind.config.js` content paths.
- For authentication issues, verify Google OAuth credentials and NextAuth secret.

## Screenshots

### Filter 
/[Filter Screenshot](/public/screenshots/category.png)

### Dark Mode
/[Dark Mode Screenshot](/public/screenshots/darkmode.png)

### Login page
/[Login Screenshot](/public/screenshots/login.png)

### Offline loading IndexedDB
/[Offline Screenshot](/public/screenshots/offlinemode.png)

### Payout to admin and export files in csv and pdf Mode
/[Dark Mode Screenshot](/public/screenshots/payout&exportFiles.png)

###  search Article page
/[Search Screenshot](/ublic/screenshots/search.png)


## License

MIT License

---

For detailed instructions and code snippets, refer to the project documentation and source code.
