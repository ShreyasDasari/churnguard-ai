# ChurnGuard AI

**Free, open-source churn prediction for SaaS -- plug in your data and know who's leaving before they do**

[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/ShreyasDasari/churnguard-ai)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue)](https://python.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Open Source](https://img.shields.io/badge/open%20source-yes-orange)](https://github.com/ShreyasDasari/churnguard-ai)

```
CHURNGUARD AI -- RISK SUMMARY
====================================================
Total customers analyzed:    487
Customers at risk (>=30%):   74 (15%)
Critical risk (>=70%):       23 customers
High risk (50-70%):          31 customers

REVENUE AT RISK
Critical segment MRR:        $18,420
High segment MRR:            $11,340
Total MRR at risk:           $29,760
Estimated ARR at risk:       $357,120

PROJECTED RETENTION VALUE
At 20% save rate:            $5,952 MRR / $71,424 ARR recoverable
====================================================

 customer_id  monthly_revenue  churn_probability  risk_tier  mrr_at_risk
 cust_0137          999.00              87.4%      Critical      873.13
 cust_0294          399.00              79.8%      Critical      318.40
 cust_0411          399.00              75.6%      Critical      301.64
 cust_0058          149.00              91.2%      Critical      135.89
 cust_0203          149.00              82.3%      Critical      122.63
```

---

## Why ChurnGuard AI

| | ChurnGuard AI | Gainsight | ChurnZero | Generic GitHub Notebook |
|---|---|---|---|---|
| **Cost** | Free | $50K+/year | $16K-$40K/year | Free |
| **Data source** | SaaS-native (Stripe, PostHog, HubSpot, CSV) | Enterprise CRM | SaaS CRM | Telecom CSV only |
| **SaaS-native features** | Yes | Yes | Yes | No |
| **SHAP explanations** | Yes | No | No | Rarely |
| **LLM intervention plans** | Yes (free) | No | No | No |
| **Setup time** | 15 minutes | 3-6 months | 4-8 weeks | 2 hours, no output |
| **Target user** | Bootstrapped SaaS, $5K-$500K MRR | Enterprise CS teams | Mid-market | Data scientists only |

---

## Quick Start

**Step 1:** Clone the repository.

```bash
git clone https://github.com/ShreyasDasari/churnguard-ai
cd churnguard-ai
```

**Step 2:** Open in Google Colab.

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ShreyasDasari/churnguard-ai/blob/main/churnguard_ai.ipynb)

Or open `churnguard_ai.ipynb` in JupyterLab locally.

**Step 3:** Run Cell 1.1 to install dependencies, then run all cells top-to-bottom. The demo dataset loads automatically -- no configuration required to see output.

---

## Data Sources

| Source | Connection Method | Free Tier | How to Export |
|--------|------------------|-----------|---------------|
| **Stripe API** | `stripe` Python SDK + secret key | Free to read (all tiers) | Dashboard > Developers > API Keys |
| **PostHog API** | HogQL REST API + project API key | 1M events/month free | Project Settings > API Keys |
| **HubSpot API** | `hubspot-api-client` + private app token | 250K API calls/day free | Settings > Integrations > Private Apps |
| **Universal CSV** | `pd.read_csv()` -- drop files in project folder | Unlimited | Billing tool > Export > CSV |

Set `source="stripe"`, `"posthog"`, or `"hubspot"` in Cell 1.6, or provide CSV paths with `source="csv"`.

---

## Universal CSV Schema

Place your exports in the project folder using these exact column names.

### `customers.csv` (required)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `customer_id` | string | Yes | Unique account identifier |
| `signup_date` | YYYY-MM-DD | Yes | Account creation date |
| `plan_name` | string | Yes | Current subscription plan |
| `monthly_revenue` | float | Yes | MRR in USD |
| `is_churned` | boolean | Yes | Target variable (True/False or 1/0) |
| `contract_type` | string | No | monthly, annual, multi_year |
| `churn_date` | YYYY-MM-DD | No | Null if active |
| `company_size` | string | No | 1-10, 11-50, 51-200, 201-1000, 1000+ |
| `industry` | string | No | Customer vertical |
| `churn_reason` | string | No | too_expensive, missing_features, switched_service, unused, other |

### `usage_metrics.csv` (recommended)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `customer_id` | string | Yes | FK to customers |
| `period_start` | YYYY-MM-DD | Yes | Measurement window start |
| `period_end` | YYYY-MM-DD | Yes | Measurement window end |
| `total_logins` | integer | No | Login count in period |
| `active_days` | integer | No | Days with at least 1 session |
| `features_used_count` | integer | No | Distinct features used |
| `seats_active` | integer | No | Active users in period |
| `seats_licensed` | integer | No | Total licensed seats |
| `days_since_last_active` | integer | No | Inactivity duration at period end |

### `support_metrics.csv` (optional)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `customer_id` | string | Yes | FK to customers |
| `period_start` | YYYY-MM-DD | Yes | Measurement window start |
| `period_end` | YYYY-MM-DD | Yes | Measurement window end |
| `tickets_opened` | integer | No | New tickets in period |
| `avg_resolution_time_hrs` | float | No | Mean resolution time |
| `csat_score` | float | No | Satisfaction score 1-5 |
| `nps_score` | integer | No | Net Promoter Score -100 to 100 |
| `escalations` | integer | No | Escalated ticket count |

### `payment_history.csv` (recommended)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `customer_id` | string | Yes | FK to customers |
| `payment_date` | YYYY-MM-DD | Yes | Transaction date |
| `amount` | float | Yes | Payment amount in USD |
| `payment_status` | string | Yes | success, failed, refunded, disputed |
| `plan_change_type` | string | No | upgrade, downgrade, renewal, new |

---

## How It Works

1. **Setup & Data Ingestion** -- Install dependencies, configure API keys (optional), and load data from Stripe, PostHog, HubSpot, CSV exports, or the built-in demo dataset.
2. **Data Validation & EDA** -- Validate schema, detect class imbalance, and visualize MRR distributions, tenure curves, and churn reasons.
3. **Feature Engineering** -- Compute 7/30/90-day behavioral windows, login trend velocity, payment failure rates, seat utilization, and support ticket velocity per customer.
4. **Model Training & Evaluation** -- Train LogisticRegression (baseline), XGBoost (primary), and LightGBM (fast alternative) with SMOTEENN resampling; compare by PR-AUC.
5. **Customer Risk Scoring** -- Score all customers with churn probability, assign Critical/High/Medium/Low tiers, and rank by revenue-weighted priority.
6. **SHAP Explainability** -- Compute global feature importance and per-customer SHAP waterfall plots; convert feature values to plain-English churn signals.
7. **LLM Intervention Plans** -- Generate personalized 30-day retention playbooks per at-risk customer using Groq -> Gemini -> OpenRouter -> template fallback chain.
8. **Persistence, Export & Action** -- Save results to SQLite for week-over-week trending, export dated CSV files, sync risk scores to HubSpot contacts.
9. **Limitations & Re-Run Guide** -- Honest assessment of model constraints, next steps, and a monthly re-run checklist.

---

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| `pandas` | 2.2 | Data manipulation and CSV ingestion |
| `numpy` | 1.26 | Numerical operations |
| `scikit-learn` | 1.4 | LogisticRegression, Pipeline, metrics, StandardScaler |
| `xgboost` | 2.1 | Primary churn classifier (target AUC 0.85-0.93) |
| `lightgbm` | 4.3 | Fast alternative classifier for large datasets |
| `imbalanced-learn` | 0.12 | SMOTEENN resampling for class imbalance |
| `shap` | 0.45 | TreeExplainer and per-customer waterfall plots |
| `plotly` | 5.20 | Interactive risk dashboard and evaluation charts |
| `matplotlib` | 3.8 | SHAP summary (beeswarm) plots |
| `seaborn` | 0.13 | Supporting visualizations |
| `ipywidgets` | 8.1 | Interactive threshold slider |
| `groq` | 0.11 | Primary LLM (llama-3.3-70b-versatile, 500K tokens/day free) |
| `google-generativeai` | 0.7 | Fallback LLM (gemini-2.0-flash-lite, 1,000 RPD free) |
| `stripe` | 8.5 | Billing data ingestion (free to read) |
| `posthog` | 3.5 | Product analytics connector |
| `hubspot-api-client` | 10.1 | CRM contacts and deal pipeline |
| `sqlite3` | built-in | Persistent storage for scores and outcomes |
| `requests` | 2.31 | OpenRouter HTTP fallback and PostHog HogQL API |

---

## Output Examples

### Risk Summary

```
CHURNGUARD AI -- RISK SUMMARY
====================================================
Total customers analyzed:    487
Customers at risk (>=30%):   74 (15%)
Critical risk (>=70%):       23 customers
High risk (50-70%):          31 customers

REVENUE AT RISK
Critical segment MRR:        $18,420
High segment MRR:            $11,340
Total MRR at risk:           $29,760
Estimated ARR at risk:       $357,120

PROJECTED RETENTION VALUE
At 20% save rate:            $5,952 MRR / $71,424 ARR recoverable
====================================================
```

### Sample Intervention Plan

```
CUSTOMER: cust_0137 | RISK: 87.4% | MRR: $999 | TIER: Critical
TOP RISK DRIVERS:
  - Has not logged in for 31 days (inactivity signal)
  - 3 failed payment(s) in the last 90 days
  - Login volume changed -68% vs. prior 30 days

30-DAY RETENTION PLAN:

(1) Immediate Action (within 24 hours):
    Call the account owner directly (not email -- this account needs
    a personal touch). Lead with: "I noticed some unusual activity on
    your account and wanted to check in." Do NOT mention cancellation.
    Simultaneously, send a payment update link to the billing contact
    -- 3 failed payments is involuntary churn risk.

(2) Week 1 Strategy:
    Resolve the payment issue first (it is blocking re-engagement).
    Once resolved, offer a 20-minute "account health" call. Prepare
    3 specific use cases matching their company size and industry.
    Ask what workflows they were trying to accomplish before going dark.

(3) Week 2-3 Follow-up:
    Send a "here is what you have been missing" summary -- product
    updates and new features released in the past 30 days.
    If they are on a monthly plan, offer a 10% discount on annual
    commitment to reduce future involuntary churn risk.

(4) Two measurable success metrics:
    - Payment successfully processed within 5 business days.
    - Customer logs in at least twice within 14 days of call.

Provider: groq
```

---

## Industry Benchmarks

| Segment | Monthly Churn | Annual Churn | Notes |
|---------|--------------|--------------|-------|
| Monthly contracts | ~1.3% | ~16% | Higher price sensitivity |
| Annual contracts | ~0.7% | ~8.5% | Commitment reduces churn |
| SMB-focused ($25-50 ARPU) | ~7.3% | ~88% | Very high turnover |
| Mid-market ($250-500 ARPU) | ~3.5% | ~42% | Standard benchmark |
| Enterprise ($1K+ ARPU) | ~0.5-1% | ~6-12% | Sticky once embedded |
| Involuntary churn share | -- | 20-40% of total | Failed payments |
| 3+ features used in month 1 | -- | 40% higher retention | Feature adoption |

*Sources: Baremetrics 2023 SaaS Benchmarks, Mixpanel Product Benchmarks 2024.*

---

## FAQ

**How many customers do I need for this to work?**
At least 100 customers and 30 churn events for meaningful ML predictions. Section 2 validates this automatically and prints a warning if you are below threshold. With fewer customers, the risk scores are still useful as exploratory signals.

**My churn rate is under 5% -- is the model still useful?**
Yes. SMOTEENN handles class imbalance by oversampling churn events during training. The PR-AUC metric is specifically designed for imbalanced datasets. A 3% monthly churn rate on $100K MRR still means $3K/month at risk -- worth predicting.

**What if I don't use Stripe?**
Use the Universal CSV path (Section 1, `source="csv"`). Export your billing data to `customers.csv` and `payment_history.csv` matching the schema above. The notebook works with any billing tool that can export CSV.

**Will my customer data be sent anywhere?**
Only if you use the LLM intervention feature. Customer risk data (not PII -- just probability scores and SHAP-derived signals) is sent to Groq, Gemini, or OpenRouter to generate intervention plans. If this is a concern, set all API keys to blank and use the template-based fallback, which runs entirely locally.

**The LLM intervention feature isn't working -- what do I do?**
Leave the API key prompts blank (press Enter). The template-based fallback in Section 7 generates structured retention plans without any external API. Check `LLM_CONFIG["provider"]` after Cell 7.2 -- it should print `template` if no keys are configured.

**Can I use this for B2C?**
ChurnGuard was built for B2B SaaS with identifiable customer accounts. It will work for B2C subscription businesses (streaming, apps) if each user has a `customer_id` and a `monthly_revenue` field. The LLM intervention plans are less relevant for B2C at scale -- use the risk scores to trigger automated email sequences instead.

---

## Limitations

- **Minimum data requirements:** Needs 100+ customers and 30+ churn events. Smaller datasets produce unreliable predictions.
- **Cold start problem:** Customers in their first 14 days have no behavioral history and cannot be reliably scored. Use onboarding playbooks for new customers.
- **Correlation, not causation:** Declining usage predicts churn but does not prove it. Treat flags as conversation starters, not confirmed cancellations.
- **Free LLM tier instability:** Groq, Gemini, and OpenRouter have changed free tiers without notice. The template fallback always works with no external dependencies.
- **Point-in-time analysis:** Re-run monthly or weekly. Scores go stale as customer behavior changes.

---

## Contributing

1. Fork the repository on GitHub.
2. Create a feature branch: `git checkout -b feature/paddle-connector`
3. Follow the connector pattern established in `cells_section1.py` for new data source integrations.
4. Ensure all functions have type hints, docstrings (with Parameters and Returns), and single responsibility (max 40 lines).
5. Open a pull request describing what your connector does and which billing/analytics tool it targets.

Bug reports and feature requests are welcome via GitHub Issues.

---

## License

MIT License

Copyright (c) 2026 Shreyas

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Acknowledgements

- [Groq](https://groq.com) for providing a generous free tier for the LLaMA 3.3 70B model that powers the intervention plan generator.
- [PostHog](https://posthog.com) for open-source product analytics and a well-documented HogQL API.
- [scikit-learn](https://scikit-learn.org) and [XGBoost](https://xgboost.readthedocs.io) communities for the ML foundations this tool is built on.
- The IBM Telco Churn dataset, which was used only in early development exploration to validate the feature engineering pipeline before the SaaS-native demo data generator was built.
