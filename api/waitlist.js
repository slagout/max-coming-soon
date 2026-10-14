const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const data = await resend.emails.send({
      from: 'Hunter <waitlist@max.edgewater-founderceo.education>', // Verify this domain in Resend
      to: email,
      subject: 'You are on the Hunter waitlist',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #222; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://max-coming-soon.vercel.app/Hunter%20Wolf.png" alt="Hunter logo" width="48" height="48" style="display: block; margin: 0 auto;">
          </div>
          <h1 style="text-align: center; font-size: 24px; margin: 0 0 16px; color: #0a0a0a;">Thanks for joining the Hunter waitlist</h1>
          <p style="margin: 0 0 16px;">Hi ${name},</p>
          <p style="margin: 0 0 24px;">We’ll notify you when we launch.</p>
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center; margin: 0 0 24px;">
            <p style="margin: 0; font-size: 16px; color: #555;">Your waitlist is confirmed.</p>
          </div>
          <p style="margin: 0 0 16px; font-size: 14px; color: #666;">
            If you have any questions, <a href="https://max-coming-soon.vercel.app#contact" style="color: #00e5ff; text-decoration: none;">contact us</a>.
          </p>
        </div>
      `.trim(),
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
