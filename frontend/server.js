const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
app.use(express.json());

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

const resend = new Resend(process.env.RESEND_API_KEY);

// API endpoint for email subscription
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    await resend.emails.send({
      from: 'ChurnGuard <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to ChurnGuard AI',
      html: `
        <h1>Welcome to ChurnGuard AI!</h1>
        <p>Thank you for subscribing to updates. We'll keep you informed about the latest features and improvements.</p>
        <p>Best regards,<br/>The ChurnGuard Team</p>
      `,
    });

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Fallback to React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
