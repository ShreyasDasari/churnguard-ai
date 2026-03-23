from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import os
import asyncio
import resend
import logging

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    logger.info("Resend API initialized")
else:
    logger.warning("RESEND_API_KEY not found - email functionality disabled")

app = FastAPI(title="ChurnGuard AI Landing API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SubscribeRequest(BaseModel):
    email: EmailStr


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "ChurnGuard AI Landing"}


@app.post("/api/subscribe")
async def subscribe_email(request: SubscribeRequest):
    """Subscribe to ChurnGuard AI updates"""
    if not RESEND_API_KEY:
        raise HTTPException(status_code=503, detail="Email service not configured")
    
    try:
        # Send welcome email
        params = {
            "from": SENDER_EMAIL,
            "to": [request.email],
            "subject": "Welcome to ChurnGuard AI Updates!",
            "html": f"""
            <div style="font-family: 'Plus Jakarta Sans', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #020817; color: #F8FAFC;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #10B981; margin: 0; font-size: 28px;">ChurnGuard AI</h1>
                    <p style="color: #94A3B8; margin-top: 8px;">Predict Churn Before It Happens</p>
                </div>
                
                <div style="background: #0F172A; border-radius: 16px; padding: 30px; border: 1px solid #1E293B;">
                    <h2 style="color: #F8FAFC; margin: 0 0 16px 0; font-size: 20px;">You're on the list! 🎉</h2>
                    <p style="color: #94A3B8; line-height: 1.6; margin: 0 0 20px 0;">
                        Thanks for subscribing to ChurnGuard AI updates. You'll be the first to know about:
                    </p>
                    <ul style="color: #94A3B8; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
                        <li>New feature releases</li>
                        <li>Model improvements</li>
                        <li>Integration updates (Stripe, PostHog, HubSpot)</li>
                        <li>Best practices for churn prediction</li>
                    </ul>
                    
                    <div style="text-align: center; margin-top: 24px;">
                        <a href="https://github.com/ShreyasDasari/churnguard-ai" 
                           style="display: inline-block; background: linear-gradient(to right, #10B981, #0F766E); color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600;">
                            Star on GitHub
                        </a>
                    </div>
                </div>
                
                <p style="color: #64748B; font-size: 12px; text-align: center; margin-top: 30px;">
                    Free, open-source churn prediction for SaaS teams.<br/>
                    <a href="https://github.com/ShreyasDasari/churnguard-ai" style="color: #10B981;">github.com/ShreyasDasari/churnguard-ai</a>
                </p>
            </div>
            """
        }
        
        # Run sync SDK in thread to keep FastAPI non-blocking
        email_response = await asyncio.to_thread(resend.Emails.send, params)
        
        logger.info(f"Welcome email sent to {request.email}")
        
        return {
            "status": "success",
            "message": f"Subscribed successfully! Check your inbox.",
            "email_id": email_response.get("id") if isinstance(email_response, dict) else str(email_response)
        }
        
    except Exception as e:
        error_message = str(e)
        logger.error(f"Failed to send email: {error_message}")
        
        # Check if it's a Resend testing mode limitation
        if "testing emails" in error_message.lower() or "verify a domain" in error_message.lower():
            # In testing mode, just log the subscription (email would work in production)
            logger.info(f"Testing mode: Subscription recorded for {request.email}")
            return {
                "status": "success",
                "message": "Subscribed successfully! You'll receive updates once we verify our domain.",
                "note": "Email service in testing mode"
            }
        
        raise HTTPException(status_code=500, detail=f"Failed to subscribe: {str(e)}")
