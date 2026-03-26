import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Send welcome email
    await resend.emails.send({
      from: 'ChurnGuard AI <noreply@contact.churnguard-ai.xyz>',
      to: email,
      subject: 'Welcome to ChurnGuard AI Updates!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Welcome to ChurnGuard AI!</h1>
          <p>Thank you for subscribing to our updates. You'll be the first to know about:</p>
          <ul>
            <li>New features and improvements</li>
            <li>Product updates and releases</li>
            <li>Tips for reducing customer churn</li>
          </ul>
          <p>Stay tuned for exciting news!</p>
          <p>Best,<br>The ChurnGuard AI Team</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
