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
      html: `<p>Hi ${name},</p><p>Thanks for joining the Hunter waitlist. We'll notify you when we launch.</p>`,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
