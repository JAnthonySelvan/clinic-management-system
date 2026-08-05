import dotenv from "dotenv";
dotenv.config();

/**
 * Send OTP Email via Brevo Transactional Email REST API
 */
export const sendOtpEmail = async (toEmail, otpCode) => {
  const apiKey = process.env.BREVO_API_KEY;

  // Print OTP in development console for easy debugging/testing
  console.log(`\n========================================`);
  console.log(`[OTP EMAIL] Destination: ${toEmail}`);
  console.log(`[OTP EMAIL] Verification Code: ${otpCode}`);
  console.log(`========================================\n`);

  if (!apiKey) {
    // Surface specific missing key error if API key is absent
    console.warn("BREVO_API_KEY is not set in environment. Falling back to console OTP output.");
    throw new Error("BREVO_API_KEY_MISSING");
  }

  if (apiKey.startsWith("xsmtpsib-")) {
    console.warn(
      "⚠️ BREVO CONFIG WARNING: BREVO_API_KEY in .env starts with 'xsmtpsib-', which is a Brevo SMTP password, NOT a REST API Key.\n" +
      "   Brevo REST API requires an API key starting with 'xkeysib-'.\n" +
      "   Generate an API Key at: Brevo Dashboard -> Account -> SMTP & API -> API Keys."
    );
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@savioursclinic.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Saviours Clinic";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060c0f; margin: 0; padding: 20px; color: #e2e8f0; }
        .container { max-width: 520px; margin: 0 auto; background: #0f171c; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background-color: #253237; padding: 24px; text-align: center; border-bottom: 2px solid #5C6B73; }
        .logo { font-size: 24px; font-weight: bold; color: #E0FBFC; letter-spacing: 1px; text-transform: uppercase; margin: 0; }
        .content { padding: 32px 24px; text-align: center; }
        .greeting { font-size: 18px; color: #9DB4C0; margin-bottom: 16px; }
        .otp-box { background: #16222a; border: 1px dashed #C2DFE3; padding: 18px; border-radius: 12px; margin: 24px 0; display: inline-block; width: 80%; }
        .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #E0FBFC; letter-spacing: 8px; margin: 0; }
        .note { font-size: 13px; color: #9DB4C0; margin-top: 20px; line-height: 1.5; }
        .footer { background: #080e12; padding: 16px; text-align: center; font-size: 12px; color: #5C6B73; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Saviours Clinic</h1>
        </div>
        <div class="content">
          <div class="greeting">Verify Your Patient Identity</div>
          <p style="color: #cbd5e1; font-size: 14px;">Use the verification code below to proceed with your appointment booking:</p>
          <div class="otp-box">
            <span class="otp-code">${otpCode}</span>
          </div>
          <p class="note">This verification code <strong>expires in 5 minutes</strong>.<br>If you did not request this code, please ignore this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Saviours Clinic. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const payload = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: toEmail }],
    subject: `Your Verification Code: ${otpCode} - Saviours Clinic`,
    htmlContent,
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.code === "unauthorized" || response.status === 401) {
      console.error(
        `❌ Brevo API Error (401 Unauthorized): ${errorData.message || "Key not found"}\n` +
        `   Reason: The provided BREVO_API_KEY is invalid or is an SMTP key instead of a v3 REST API key.`
      );
    } else {
      console.error("Brevo API Error:", errorData);
    }
    throw new Error(errorData.message || `Brevo Email API failed with status ${response.status}`);
  }

  return await response.json();
};
