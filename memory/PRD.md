# ChurnGuard AI Landing Page - PRD

## Original Problem Statement
Build a highly polished, production-ready landing page website for "ChurnGuard AI" - a free, open-source churn prediction tool for SaaS. The page should impress recruiters, founders, and technical buyers with a premium, startup-quality design.

## Architecture & Tech Stack
- **Frontend**: React 18 + Tailwind CSS + Framer Motion + PostHog Analytics
- **Backend**: FastAPI + Resend Email API
- **Deployment**: Production build served via `serve` package
- **Styling**: Custom CSS variables for theme system, Plus Jakarta Sans font

## User Personas
1. **SaaS Founders** - Looking for affordable churn prediction solutions
2. **Growth Teams & RevOps** - Need actionable retention insights
3. **Customer Success Managers** - Want to prioritize at-risk accounts
4. **Technical Buyers** - Evaluating explainable ML solutions
5. **Recruiters** - Evaluating portfolio projects
6. **GitHub Visitors** - Exploring open-source tools

## Core Requirements (Static)
- Premium, production-ready landing page
- Dark/Light theme toggle
- Responsive design (mobile-first)
- Smooth animations with Framer Motion
- All links functional (GitHub, Demo)
- Accurate product information (no fake claims)

## What's Been Implemented (Jan 2026)

### Phase 1: MVP Landing Page ✅
1. **Navbar** - Sticky with glass effect, animated shield logo, nav links, theme toggle, GitHub Star button
2. **Hero Section** - Headline with gradient text, CTAs, dashboard mock with risk metrics, trust badges
3. **Why It Matters** - Comparison cards (Old Way vs ChurnGuard AI)
4. **Features Grid** - 8 feature cards with icons and hover animations
5. **How It Works** - 8-step timeline with code preview card
6. **Models & Explainability** - 3 models listed, SHAP visualization, explainability message
7. **Intervention Plans** - 30-day retention playbook mock
8. **Open Source Section** - Stats (15 min setup, $0 cost, MIT license), CTAs
9. **Final CTA** - Strong closing with gradient background
10. **Footer** - Multi-column layout, animated logo, copyright

### Phase 2: Email Signup ✅
- Email signup section with glassmorphism card
- Resend API integration for welcome emails
- Success/error feedback messages
- Social proof text

### Phase 3: Analytics + Comparison ✅ (Current Session)
1. **PostHog Analytics Integration**
   - Automatic pageview tracking
   - Autocapture for clicks and form submissions
   - Custom event tracking on CTAs (trackEvent helper)
   - API Key: phx_yugE8Duov8gJYm3k3w19xuicNmG2xrdVL7op8XWP0QzsBHS

2. **Resend Email Integration**
   - API Key: re_HJuM5F3g_4kggvxU7BLD3eTovtpwTcMda
   - Welcome email template with ChurnGuard branding
   - Testing mode handling (works in production with verified domain)

3. **Product Comparison Table**
   - 11-row comparison: ChurnGuard AI vs Traditional Analytics vs Enterprise Platforms
   - Features: Price, Setup Time, ML Prediction, SHAP, LLM Plans, Revenue Scoring, etc.
   - Visual checkmarks and highlights for ChurnGuard advantages

4. **Shield Logo Reverted** - Back to original shield with orbiting nodes design

## Test Results
- Phase 3: Backend 100%, Frontend 92% → 100% after PostHog fix
- All integrations working (Resend in testing mode, PostHog fully functional)
- All CTAs and links working correctly

## Environment Variables
### Backend (.env)
- MONGO_URL=mongodb://localhost:27017
- DB_NAME=churnguard_landing
- RESEND_API_KEY=re_HJuM5F3g_4kggvxU7BLD3eTovtpwTcMda
- SENDER_EMAIL=onboarding@resend.dev

### Frontend
- PostHog Key: phx_yugE8Duov8gJYm3k3w19xuicNmG2xrdVL7op8XWP0QzsBHS
- PostHog Host: https://us.i.posthog.com

## Prioritized Backlog

### P0 (Critical) - None remaining
All critical features implemented and tested.

### P1 (High Priority) - Future Enhancements
- [ ] Verify domain in Resend to enable production emails
- [ ] Set up PostHog dashboards for conversion tracking
- [ ] Add meta images for social sharing (OG images)

### P2 (Medium Priority)
- [ ] Add testimonials section (when real users available)
- [ ] Add pricing/value calculator
- [ ] Performance optimization (lazy loading images)
- [ ] Add Stripe integration for donations/sponsorship

### P3 (Low Priority)
- [ ] Add blog/changelog section
- [ ] Add multi-language support
- [ ] Add accessibility audit (WCAG AA compliance)

## Next Tasks
1. **Verify domain in Resend** - Go to https://resend.com/domains and add your domain to enable production emails
2. **Set up PostHog dashboards** - Events to track:
   - `github_star_clicked` (by location: navbar, hero, opensource_section, final_cta)
   - `demo_watched` (by location: hero, final_cta)
   - `email_subscription_success`
   - `scroll_depth_reached` (25%, 50%, 75%, 100%)
   - `theme_toggled`
   - `colab_opened`
3. Create funnels in PostHog: `pageview` → `scroll_depth_50` → `github_star_clicked`
4. Monitor analytics and optimize based on user behavior

## Resend Domain Verification Steps
1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., churnguard.ai)
4. Add the DNS records Resend provides (MX, TXT records)
5. Wait for verification (usually 5-10 minutes)
6. Update SENDER_EMAIL in /app/backend/.env to use your domain (e.g., updates@churnguard.ai)

## PostHog Dashboard Setup
1. Go to https://us.posthog.com (or your PostHog instance)
2. Create a new dashboard "ChurnGuard Conversions"
3. Add insights:
   - **GitHub Clicks by Location**: Bar chart of `github_star_clicked` grouped by `location`
   - **Scroll Depth Funnel**: Funnel from 25% → 50% → 75% → 100%
   - **Email Subscriptions**: Trend of `email_subscription_success` events
   - **Demo Views**: Count of `demo_watched` events
   - **Theme Preference**: Pie chart of `theme_toggled` by `new_theme`

## Links
- **GitHub**: https://github.com/ShreyasDasari/churnguard-ai
- **Demo**: https://churn-guard--shreyasdasari.replit.app/
- **Preview**: https://d388d75d-f229-4482-b913-1ee6832b7441.preview.emergentagent.com
- **PostHog Dashboard**: https://us.posthog.com

## Important Notes
- **Email in testing mode**: Verify domain at resend.com/domains to send to all recipients
- **PostHog tracking active**: Events being captured and sent to PostHog
