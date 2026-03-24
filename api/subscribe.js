import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory storage for demo (in production, use a database)
const subscribers = new Set();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if already subscribed (for demo purposes)
    if (subscribers.has(email)) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    // Add to subscribers
    subscribers.add(email);

    // Send welcome email using Resend
    await resend.emails.send({
      from: 'ChurnGuard AI <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to ChurnGuard AI Updates!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10B981;">Welcome to ChurnGuard AI!</h1>
          <p>Thanks for subscribing to our updates. You'll be the first to know about:</p>
          <ul>
            <li>New features and improvements</li>
            <li>Best practices for churn prediction</li>
            <li>Exclusive early access opportunities</li>
          </ul>
          <p>Stay tuned for exciting updates!</p>
          <p style="color: #6B7280; font-size: 14px;">
            — The ChurnGuard AI Team
          </p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
