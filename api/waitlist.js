const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const safeName = escapeHtml(name);

  // waitlist-confirmation template (exact HTML provided)
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="width=device-width" name="viewport"/><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/><meta content="IE=edge" http-equiv="X-UA-Compatible"/><meta name="x-apple-disable-message-reformatting"/><meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection"/><title>You are officially on the list and we will notify you the moment we launch.</title><style>@media (prefers-color-scheme: dark){li::marker{color:#c4c4c4}}</style></head><body dir="ltr" lang="en" style="margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0"><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">You are officially on the list and we will notify you the moment we launch.</div><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td dir="ltr" lang="en" style="margin:0px;padding-top:8px;padding-right:8px;padding-bottom:8px;padding-left:8px"><table align="left" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:600px;align:left;width:100%;border-radius:0px"><tbody><tr style="width:100%"><td style="padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px"><div style="margin:0 auto;padding:20px;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;line-height:1.5;color:#222;max-width:600px"><div style="margin:0;padding:0;text-align:center;margin-bottom:24px"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><td align="center"><img alt="Hunter logo" height="69" src="https://max-coming-soon.vercel.app/hunter_coming%20soon.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="224"/></td></tr></tbody></table></div><h1 style="margin:0 0 16px;padding:0;text-align:center;font-size:24px;color:#0a0a0a">Thanks for joining the Hunter waitlist</h1><p style="margin:0 0 16px;padding:0">Hi ${safeName},</p><p style="margin:0 0 24px;padding:0">We&rsquo;ll notify you when we launch.</p><div style="margin:0 0 24px;padding:16px;background:#f5f5f5;border-radius:8px;text-align:center"><p style="margin:0;padding:0;font-size:16px;color:#555">Your waitlist is confirmed.</p></div><p style="margin:0 0 16px;padding:0;font-size:14px;color:#666">If you have any questions, contact us.</p></div></td></tr></tbody></table></td></tr></tbody></table></body></html>`;

  try {
    const data = await resend.emails.send({
      from: 'Hunter <waitlist@max.edgewater-founderceo.education>',
      to: email,
      subject: 'You are officially on the list and we will notify you the moment we launch.',
      html,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Waitlist email failed:', error);
    return res.status(500).json({ error: error.message });
  }
}
