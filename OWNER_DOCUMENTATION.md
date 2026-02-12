# SAHAHR Website - Owner & Maintenance Guide

This document is designed to help site owners manage the content of the SAHAHR website and assist future developers in maintaining the technical codebase.

For a general overview of the website's features and goals, please see [WEBSITE_INTRODUCTION.md](./WEBSITE_INTRODUCTION.md).

---

## 🟢 Part 1: For Content Managers (Admin Panel)

The website is powered by **Sanity.io**, a content management system (CMS) that allows you to update text, images, and events without touching the code.

### 1. Accessing the Admin Panel (Studio)
- **URL**: Go to `https://<your-domain>/studio` (e.g., `sahahr.org/studio`).
- **Login**: Log in with your authorized email/provider.

### 2. Managing Events
The "Upcoming Events" section on the homepage automatically shows future events.
- **Add an Event**:
  1. Go to **Content** -> **Event**.
  2. Click **Create** (pencil icon).
  3. Fill in the Title, Slug (click "Generate"), Date/Time, and Summary.
  4. **Key Features**:
     - **Featured**: Toggle this ON to make the event appear at the start of the list.
     - **Image**: Upload a high-quality image.
  5. Click **Publish**.
- **Important Notes**:
  - Events with a date in the *past* are automatically hidden from the homepage.
  - If no upcoming events exist, the "Upcoming Events" section on the homepage will be hidden.

### 3. Managing Board Members
The **About** page displays the Board of Directors.
- **Add a Member**:
  1. Go to **Content** -> **Board Member**.
  2. Enter Name, Role (e.g., President, Board Member), and Bio.
  3. **Ordering**: Use the "Order" number field to control their position in the list (1 is first).
  4. **Images**: Upload a photo. **Note**: The website will display the full photo without cropping, so ensure the headshot is centered.
  5. **Social Links**: Add URLs for Facebook, LinkedIn, etc. Leave blank if not applicable.
  6. Click **Publish**.

### 4. Site Settings
Global settings like the navigation menu can be managed here.
- **Navigation**: Update the links in the header menu.

---

## 🔵 Part 2: For Developers (Technical Handover)

This project is built with **Next.js 15**, **React 19**, and **Sanity v3**.

### 1. Prerequisites
- **Node.js**: Version 18 or higher.
- **Accounts**: Access to the Sanity project (`ps1r2kj3`) and the Vercel deployment.

### 2. Installation
The project uses `npm` with legacy peer dependency resolution due to React 19 / Sanity compatibility.

```bash
# Clone the repository
git clone <repo-url>
cd sahahr

# Install dependencies
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="ps1r2kj3"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-05"
```

### 4. Running Locally
```bash
npm run dev
```
Visit `http://localhost:3000`. The Studio is at `http://localhost:3000/studio`.

### 5. Project Structure
To resolve Next.js/Sanity conflicts, the app uses **Route Groups**:
- `src/app/(website)/`: Contains the main public website (Home, About, Events). Uses the main `layout.tsx` (Navbar/Footer).
- `src/app/(studio)/`: Contains the Sanity Studio. Uses a dedicated `layout.tsx` (Full screen, no Navbar).
- `src/components/board/BoardMembersFeature.tsx`: Main component for the Board section on the About page.

### 6. Deployment
The site is configured for **Vercel**.
- **Build Command**: `next build` (Do NOT use `next build --turbo` for production).
- **Environment**: Ensure the env vars above are added to Vercel.

### ❓ Troubleshooting

**Issue: "ENOENT: no such file or directory" during `npm run dev`**
- **Cause**: This usually happens if you rename/move files while the dev server is running, or if the `.next` cache gets corrupted.
- **Fix**:
  ```bash
  rm -rf .next
  npm run dev
  ```

**Issue: Sanity CORS Error**
- **Cause**: The Studio or website cannot fetch data.
- **Fix**: Go to [sanity.io/manage](https://www.sanity.io/manage), select the project, go to **API** -> **CORS Origins**, and ensure your domain (e.g., `http://localhost:3000` or `https://your-domain.com`) is allowed with credentials.

**Issue: Dependency Conflicts**
- **Fix**: Always use `--legacy-peer-deps` when installing new packages due to the mix of Next.js 15 and Sanity dependencies.
