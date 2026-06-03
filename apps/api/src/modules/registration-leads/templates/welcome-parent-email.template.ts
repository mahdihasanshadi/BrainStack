export interface WelcomeParentEmailParams {
  parentName: string;
  childName: string;
  childAge: number;
  webinarUrl: string;
}

export function buildWelcomeParentEmailHtml(
  params: WelcomeParentEmailParams,
): string {
  const { parentName, childName, childAge, webinarUrl } = params;
  const firstName = parentName.trim().split(/\s+/)[0] ?? parentName;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to BrainStack</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f4ff;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f0f4ff;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(79,70,229,0.12);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%);padding:40px 32px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <div style="display:inline-block;background-color:rgba(255,255,255,0.2);border-radius:12px;padding:8px 20px;margin-bottom:16px;">
                      <span style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">🧠 BrainStack</span>
                    </div>
                    <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);letter-spacing:0.5px;text-transform:uppercase;">Where young minds learn to think</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h1 style="margin:0 0 16px;font-size:26px;font-weight:700;color:#1e1b4b;line-height:1.3;">
                Welcome, ${escapeHtml(firstName)}! 👋
              </h1>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#475569;">
                Thank you for your interest in <strong style="color:#4f46e5;">BrainStack</strong> — the EdTech platform that helps kids aged 6–14 build logical reasoning, analytical thinking, and Scratch programming skills through gamified lessons and hands-on projects.
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#475569;">
                We've received your registration for <strong style="color:#1e1b4b;">${escapeHtml(childName)}</strong> (age ${childAge}). Our team is excited to help ${childAge <= 14 ? "your child" : "your learner"} discover the joy of problem-solving.
              </p>
              <!-- Highlight card -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,#eef2ff 0%,#faf5ff 100%);border-radius:12px;border:1px solid #e0e7ff;margin-bottom:28px;">
                <tr>
                  <td style="padding:28px 24px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">You're invited</p>
                    <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#1e1b4b;line-height:1.35;">
                      Monthly Parent Live Webinar
                    </h2>
                    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
                      Join us for an interactive session where you'll meet our educators, see BrainStack in action, and learn how we nurture critical thinking and creative coding — live, with Q&amp;A.
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:12px;vertical-align:top;">
                          <span style="display:inline-block;background-color:#4f46e5;color:#ffffff;font-size:13px;font-weight:600;padding:6px 12px;border-radius:20px;">📅 Monthly</span>
                        </td>
                        <td style="vertical-align:top;">
                          <span style="display:inline-block;background-color:#f59e0b;color:#ffffff;font-size:13px;font-weight:600;padding:6px 12px;border-radius:20px;">🎥 Live &amp; Interactive</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${escapeHtml(webinarUrl)}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:50px;box-shadow:0 4px 16px rgba(79,70,229,0.35);">
                      Reserve Your Webinar Spot
                    </a>
                  </td>
                </tr>
              </table>
              <!-- Features -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:8px;">
                <tr>
                  <td width="33%" align="center" style="padding:8px;vertical-align:top;">
                    <p style="margin:0;font-size:24px;">🎮</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#1e1b4b;">Gamified Lessons</p>
                  </td>
                  <td width="33%" align="center" style="padding:8px;vertical-align:top;">
                    <p style="margin:0;font-size:24px;">🧩</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#1e1b4b;">Logic &amp; Analytics</p>
                  </td>
                  <td width="33%" align="center" style="padding:8px;vertical-align:top;">
                    <p style="margin:0;font-size:24px;">🐱</p>
                    <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#1e1b4b;">Scratch Coding</p>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#94a3b8;text-align:center;">
                Questions? Simply reply to this email — we're here to help.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px 32px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#64748b;">
                © ${new Date().getFullYear()} BrainStack · Empowering the next generation of thinkers
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                You received this email because you registered interest at BrainStack.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
