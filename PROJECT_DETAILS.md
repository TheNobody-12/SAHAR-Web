# SAHAHR Website Details

## 1. Project Overview

**Project Name:** South Asian Heritage Association Hamilton Region (SAHAHR) Website
**Client/Organization:** SAHAHR
**Live URL:** [https://sahahr.org](https://sahahr.org) (or `southasianheritage.org`)
**Repository URL:** [https://github.com/TheNobody-12/SAHAR-Web](https://github.com/TheNobody-12/SAHAR-Web)

**Purpose of the Website:**
The functional website serves as a digital community center for the SAHAHR. It is designed to be deployed on the existing domain `southasianheritage.org`. The website is easy to update with a user-friendly content management system (CMS) that is accessible and compatible across major browsers and mobile devices.

Just as a physical community center has a front desk, bulletin boards, and activity rooms, this website serves the same purpose online:
- **Home and About Us:** Tells people who we are.
- **Events, Blog, and Newsletter:** Shows upcoming events and news.
- **Resources:** Provides help for newcomers, seniors, and youth.
- **Direct Line:** Allows people to contact us and sign up for newsletters.

## 2. Tech Stack

**Frontend:**
- **Next.js 15 (App Router)**: Framework for server-side rendering and routing.
- **React 19**: JavaScript library for building user interfaces.
- **TypeScript**: Typed language for reliability.
- **Tailwind CSS 4**: Styling framework.

**Backend:**
- **Sanity v3 (Headless CMS)**: Manages all dynamic content (Events, Board Members, Posts).
- **Next.js Server Actions**: Handles server-side logic within the application.

**Database:**
- **Sanity Content Lake**: Cloud-hosted NoSQL document store for all content.

**Hosting:**
- **Vercel**: Hosts the Next.js application (Frontend & API routes).

**Domain Provider:**
- **A Small Orange** (Existing registrar, managing DNS records for `southasianheritage.org`).

**Third-party Services:**
- **Email Service**: TBD (Recommended: Resend) / Google Workspace (Gmail).
- **Payment Gateway**: None (Future integration).
- **Forms**: React Hook Form (Frontend validation).
- **Analytics**: Vercel Analytics (Built-in performance and visitor tracking).
- **CMS**: Sanity Studio (Embedded admin interface).
- **APIs**: Sanity GROQ API (Query language for fetching content).

## 3. Key Features & Functionality

- **Dynamic Events System**: Automatically sorts events by date and hides past events.
- **CMS-Powered Content**: Editors can update board members, blog posts, and resources without coding.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Automated Image Optimization**: Fast-loading images using Next.js Image component.
- **SEO Ready**: Semantic HTML execution and metadata fields for search engines.

## 4. Pages Structure

- **/** (Home): Hero section, featured events, and latest news.
- **/about**: Organization mission, history, and board of directors.
- **/events**: Full list of upcoming community events.
- **/blog**: News, announcements, and community stories.
- **/resources**: Links and guides for various community needs.
- **/gallery**: Photo collections from past events.
- **/contact**: Feedback and inquiry forms.
- **/studio**: Secure admin panel for content management.

## 5. Deployment Information

The site is configured for Continuous Deployment via Vercel.
- **Trigger**: Pushing to the `main` branch on GitHub automatically triggers a new build.
- **Environment Variables**: Managed securely in Vercel settings (Sanity Project ID, Token, etc.).

## 6. Content Management Guide (Very Important)

This website uses **Sanity CMS**, which means you can update text, images, and events without touching any code.

**How to log in:**
- Go to `https://sakahr.org/studio` (or `localhost:3000/studio` if running locally).
- Log in with your authorized email/provider (Google, GitHub, or Email/Password).

**How to:**

- **Update text / Change images**:
    1. Navigate to the content type you want to edit (e.g., "Board Member", "Event").
    2. Click on the item from the list.
    3. Update the text fields or click "Upload" on image fields.
    4. Click the green **Publish** button at the bottom right to make changes live immediately.

- **Add a blog post**:
    1. Go to **Content** -> **Post**.
    2. Click the **Create** (pencil) icon.
    3. Fill in the Title, Slug (click Generate), and Main Image.
    4. Write your content in the rich text editor (you can add bold, italics, links, and headings).
    5. Click **Publish**.

- **Update team members**:
    1. Go to **Content** -> **Board Member**.
    2. Create a new member or click an existing one.
    3. Ensure you upload a high-quality photo (the site will display the full photos automatically).
    4. Add their Role (e.g., "President") and Bio.
    5. Use the "Order" number to control where they appear in the list.

- **Edit contact details / Generic info**:
    1. Go to **Content** -> **Site Settings** (if configured) or edit the specific page document.
    2. Update the contact email, phone number, or address fields.

- **Manage forms & View submissions**:
    - Currently, forms (Newsletter, Feedback) are sent via email (or a service like Formspree/Resend).
    - **View Submissions**:
        - If using **Formspree**: Log in to Formspree dashboard.
        - If using **Resend/Email**: Check the `design@southasianheritage.org` inbox.

## 7. Future Enhancements (Roadmap)

- **Event Registration**: Allow users to RSVP directly on the site.
- **Donation Integration**: Add Stripe/PayPal for fundraising.
- **Member Portal**: Exclusive content for registered members.
- **Multi-language Support**: Translation for Hindi, Urdu, Punjabi, etc.
