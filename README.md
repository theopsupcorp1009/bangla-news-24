# 📰 Bangla News 24

A Bengali-language news portal built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It pulls live headlines and articles from an external news API, organizes them into sections and categories, and includes full user authentication with email verification and password reset.

🔗 **Live App:** [bangla-news-24-woad.vercel.app](https://bangla-news-24-woad.vercel.app/)
📦 **Repository:** [theopsupcorp1009/bangla-news-24](https://github.com/theopsupcorp1009/bangla-news-24)

---

## ✨ Features

- **Live news feed** fetched from an external news API, rendered as a homepage with main headlines, sectioned stories, and a "Most Read" sidebar
- **Category pages** (`/category/[categoryId]`) listing articles by topic
- **Article detail pages** (`/news/[newsId]`) with full article body, images, and source attribution
- **Authentication** via [better-auth](https://www.better-auth.com/):
  - Email & password sign-up / sign-in
  - Google OAuth sign-in
  - Email verification (sent via Resend) before account access
  - Forgot password / reset password flow with emailed reset links
  - Auto sign-in after email verification
- **Protected routes**: `/profile` and `/news/*` require an authenticated session (enforced via middleware/proxy)
- **User profile** page showing account info
- Scrolling news **marquee**, responsive header/navigation (with mobile nav), and footer
- Pagination for category/article listings
- Bengali-localized transactional emails (verification + password reset)

---

## 🖥️ Tech Stack

| Layer              | Technology                                         |
|--------------------|-----------------------------------------------------|
| Framework          | [Next.js](https://nextjs.org/) 16 (App Router)      |
| Language           | TypeScript                                          |
| Styling            | Tailwind CSS v4, daisyUI                            |
| Authentication     | better-auth + `@better-auth/mongo-adapter`          |
| Database           | MongoDB                                             |
| Transactional Email | [Resend](https://resend.com/)                      |
| Icons              | lucide-react, react-icons                           |
| Notifications      | react-toastify                                      |
| News Data Source   | External News API (`news-api-v2.vercel.app`)        |
| Deployment         | Vercel                                              |

---

## 📂 Project Structure

```
bangla-news-24/
├── public/                                # Static assets (logo, icons)
├── src/
│   ├── app/
│   │   ├── page.tsx                       # Home page (live news feed)
│   │   ├── layout.tsx                     # Root layout
│   │   ├── loading.tsx / not-found.tsx
│   │   ├── category/[categoryId]/page.tsx # Category listing page
│   │   ├── news/[newsId]/page.tsx         # Article details page
│   │   ├── sign-in/page.tsx               # Sign-in page
│   │   ├── sign-up/page.tsx               # Sign-up page
│   │   ├── forgot-password/page.tsx       # Request password reset
│   │   ├── reset-password/page.tsx        # Set new password
│   │   ├── profile/page.tsx               # Authenticated user profile
│   │   └── api/auth/[...all]/route.ts     # better-auth API route handler
│   ├── components/
│   │   ├── Header.tsx / MobileNav.tsx / Navlinks.tsx
│   │   ├── Footer.tsx
│   │   ├── MainNews.tsx                   # Hero headline section
│   │   ├── NewsCard.tsx                   # Article preview card
│   │   ├── MostRead.tsx                   # Sidebar "most read" list
│   │   ├── Marquee.tsx                    # Scrolling news ticker
│   │   ├── Pagination.tsx
│   │   └── UserInfo.tsx
│   ├── lib/
│   │   ├── auth.ts                        # better-auth server config
│   │   └── auth-client.ts                 # better-auth client hooks
│   ├── types/
│   │   ├── Headline.ts
│   │   ├── Sections.ts
│   │   └── cateogry.ts
│   └── proxy.ts                           # Auth-gated route middleware
├── .env                                   # Environment variables (not committed)
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm (or yarn / pnpm / bun)
- A MongoDB database (for auth)
- A [Resend](https://resend.com/) API key (for transactional emails)
- Google OAuth credentials (for Google sign-in)

### Installation

```bash
# Clone the repository
git clone https://github.com/theopsupcorp1009/bangla-news-24.git
cd bangla-news-24

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```env
MONGO_DB_URL=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🎛️ How to Use

1. Visit the **Home** page to see the latest headlines and sectioned news.
2. Click any article to read the **full story**.
3. Browse a **category** to see all articles under that topic.
4. **Sign up** with email/password or **Google**, then verify your email to activate the account.
5. **Sign in** to access protected pages like your **Profile** and individual **news articles**.
6. Use **Forgot Password** to receive a reset link by email if needed.

---

## 🌐 Deployment

This app is deployed on **Vercel**. Any push to the connected branch triggers an automatic build and deployment.

To deploy your own copy:

1. Push this repository to your GitHub account.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add the required environment variables (MongoDB, Resend, Google OAuth, better-auth URL) in the Vercel project settings.
4. Vercel auto-detects the Next.js framework, so no extra configuration is needed.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- Authentication powered by [better-auth](https://www.better-auth.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/)
- Transactional emails via [Resend](https://resend.com/)
- Hosted on [Vercel](https://vercel.com/)

---

## 📝 Project Summary

**Bangla News 24** is a full-stack Bengali news portal that combines a dynamic, API-driven news reading experience with a complete authentication system. Built on Next.js App Router with TypeScript, it fetches live headlines, sections, and full articles from an external news API and presents them through a responsive, categorized layout with a scrolling ticker and a "most read" sidebar. On the backend, better-auth with a MongoDB adapter powers secure email/password and Google OAuth login, backed by Resend-delivered, Bengali-localized verification and password-reset emails; route-level middleware gates sensitive pages like article details and the user profile behind an authenticated session. The project demonstrates practical experience with server-rendered data fetching, third-party API integration, full authentication flows, and modern, utility-first UI design, all deployed on Vercel.
