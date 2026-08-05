import dotenv from "dotenv";
dotenv.config();

/**
 * Send OTP Email via Brevo Transactional Email REST API
 */
export const sendOtpEmail = async (toEmail, otpCode) => {
  const apiKey = process.env.BREVO_API_KEY;

  // Print OTP in development console for easy debugging/testing
  // console.log(`\n========================================`);
  // console.log(`[OTP EMAIL] Destination: ${toEmail}`);
  // console.log(`[OTP EMAIL] Verification Code: ${otpCode}`);
  // console.log(`========================================\n`);

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

/**
 * Send Digital Prescription Email via Brevo REST API
 */
export const sendPrescriptionEmail = async ({
  toEmail,
  patientName,
  doctorName,
  appointmentDate,
  pdfUrl,
  followUpDate,
}) => {
  const apiKey = process.env.BREVO_API_KEY;

  console.log(`\n========================================`);
  console.log(`[PRESCRIPTION EMAIL] Destination: ${toEmail}`);
  console.log(`[PRESCRIPTION EMAIL] Patient: ${patientName} | Doctor: ${doctorName}`);
  console.log(`[PRESCRIPTION EMAIL] PDF URL: ${pdfUrl}`);
  console.log(`========================================\n`);

  if (!apiKey) {
    console.warn("BREVO_API_KEY is missing in env. Logged prescription email details to console.");
    return { success: false, reason: "BREVO_API_KEY_MISSING" };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@savioursclinic.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Saviours Clinic";

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recent Visit";

  const formattedFollowUp = followUpDate
    ? new Date(followUpDate).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060c0f; margin: 0; padding: 20px; color: #e2e8f0; }
        .container { max-width: 580px; margin: 0 auto; background: #0f171c; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background-color: #253237; padding: 24px; text-align: center; border-bottom: 2px solid #0077B6; }
        .logo { font-size: 24px; font-weight: bold; color: #E0FBFC; letter-spacing: 1px; text-transform: uppercase; margin: 0; }
        .sublogo { font-size: 11px; color: #9DB4C0; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
        .content { padding: 32px 24px; }
        .greeting { font-size: 18px; font-weight: 700; color: #E0FBFC; margin-bottom: 12px; }
        .info-card { background: #16222a; border: 1px solid #253237; padding: 18px; border-radius: 12px; margin: 20px 0; }
        .info-row { font-size: 13px; color: #cbd5e1; margin-bottom: 8px; }
        .info-row strong { color: #E0FBFC; }
        .cta-btn { display: inline-block; background: #0077B6; color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: bold; padding: 14px 28px; border-radius: 12px; margin: 20px 0; text-align: center; box-shadow: 0 4px 12px rgba(0, 119, 182, 0.4); }
        .footer { background: #080e12; padding: 16px; text-align: center; font-size: 12px; color: #5C6B73; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Saviours Clinic</h1>
          <div class="sublogo">Excellence in Healthcare</div>
        </div>
        <div class="content">
          <div class="greeting">Hello ${patientName},</div>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            Your official digital prescription and medical consultation notes for your appointment on <strong>${formattedDate}</strong> have been generated by <strong>Dr. ${doctorName}</strong>.
          </p>

          <div class="info-card">
            <div class="info-row"><strong>Doctor:</strong> Dr. ${doctorName}</div>
            <div class="info-row"><strong>Consultation Date:</strong> ${formattedDate}</div>
            ${formattedFollowUp ? `<div class="info-row"><strong>Recommended Follow-up Visit:</strong> ${formattedFollowUp}</div>` : ""}
            <div class="info-row"><strong>Status:</strong> Completed & Verified</div>
          </div>

          <div style="text-align: center;">
            <a href="${pdfUrl}" target="_blank" class="cta-btn">Download Prescription PDF</a>
          </div>

          <p style="font-size: 12px; color: #9DB4C0; margin-top: 24px; text-align: center;">
            You can also view your medical notes and prescription history anytime in your Patient Portal.
          </p>
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
    to: [{ email: toEmail, name: patientName }],
    subject: `Your Prescription & Medical Summary - Dr. ${doctorName} | Saviours Clinic`,
    htmlContent,
  };

  try {
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
      console.error("Brevo Prescription Email Error:", errorData);
      return { success: false, error: errorData };
    }

    const resData = await response.json();
    return { success: true, messageId: resData.messageId };
  } catch (err) {
    console.error("Failed to send prescription email via Brevo:", err.message);
    return { success: false, error: err.message };
  }
};

/**
 * Send Appointment Status Update Email via Brevo REST API
 */
export const sendAppointmentStatusEmail = async ({
  toEmail,
  patientName,
  doctorName = "Attending Specialist",
  specialization = "Healthcare",
  appointmentDate,
  appointmentTime,
  status,
  rejectionReason = "",
}) => {
  const apiKey = process.env.BREVO_API_KEY;

  // console.log(`\n========================================`);
  // console.log(`[STATUS EMAIL] Destination: ${toEmail}`);
  // console.log(`[STATUS EMAIL] Patient: ${patientName} | Status: ${status}`);
  // console.log(`========================================\n`);

  if (!toEmail) return { success: false, reason: "NO_EMAIL" };

  if (!apiKey) {
    console.warn("BREVO_API_KEY is missing in env. Logged appointment status email details to console.");
    return { success: false, reason: "BREVO_API_KEY_MISSING" };
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@savioursclinic.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Saviours Clinic";

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Scheduled Visit";

  let statusBadgeColor = "#0077B6";
  let statusMessage = "";

  if (status === "Approved") {
    statusBadgeColor = "#10B981";
    statusMessage = `Your appointment request with <strong>Dr. ${doctorName}</strong> (${specialization}) on <strong>${formattedDate}</strong> at <strong>${appointmentTime || "your scheduled slot"}</strong> has been <strong>Approved & Confirmed</strong>.<br><br>Please arrive 10 minutes prior to your time slot at Saviours Clinic.`;
  } else if (status === "Rejected") {
    statusBadgeColor = "#EF4444";
    statusMessage = `We regret to inform you that your appointment request for <strong>${specialization}</strong> on <strong>${formattedDate}</strong> could not be confirmed at this time.<br><br><strong>Reason:</strong> ${rejectionReason || "Slot unavailable or doctor emergency leave."}<br><br>You can select a different date or specialist via the Patient Portal.`;
  } else if (status === "Completed") {
    statusBadgeColor = "#3B82F6";
    statusMessage = `Your consultation with <strong>Dr. ${doctorName}</strong> on <strong>${formattedDate}</strong> has been marked as <strong>Completed</strong>.<br><br>Thank you for choosing Saviours Clinic. If your doctor issued a digital prescription, you can view and download it anytime in your Patient Portal.`;
  } else {
    statusMessage = `Your appointment status has been updated to <strong>${status}</strong>.`;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #060c0f; margin: 0; padding: 20px; color: #e2e8f0; }
        .container { max-width: 580px; margin: 0 auto; background: #0f171c; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { background-color: #253237; padding: 24px; text-align: center; border-bottom: 2px solid ${statusBadgeColor}; }
        .logo { font-size: 24px; font-weight: bold; color: #E0FBFC; letter-spacing: 1px; text-transform: uppercase; margin: 0; }
        .sublogo { font-size: 11px; color: #9DB4C0; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
        .content { padding: 32px 24px; }
        .status-badge { display: inline-block; background: ${statusBadgeColor}; color: #ffffff; font-size: 12px; font-weight: bold; padding: 6px 16px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .greeting { font-size: 18px; font-weight: 700; color: #E0FBFC; margin-bottom: 12px; }
        .info-card { background: #16222a; border: 1px solid #253237; padding: 18px; border-radius: 12px; margin: 20px 0; }
        .info-row { font-size: 13px; color: #cbd5e1; margin-bottom: 8px; }
        .info-row strong { color: #E0FBFC; }
        .cta-btn { display: inline-block; background: #253237; color: #E0FBFC !important; text-decoration: none; font-size: 13px; font-weight: bold; padding: 12px 24px; border-radius: 12px; margin: 16px 0; border: 1px solid #5C6B73; text-align: center; }
        .footer { background: #080e12; padding: 16px; text-align: center; font-size: 12px; color: #5C6B73; border-top: 1px solid #1e293b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">Saviours Clinic</h1>
          <div class="sublogo">Excellence in Healthcare</div>
        </div>
        <div class="content">
          <div class="status-badge">${status}</div>
          <div class="greeting">Hello ${patientName},</div>
          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            ${statusMessage}
          </p>

          <div class="info-card">
            <div class="info-row"><strong>Department:</strong> ${specialization}</div>
            <div class="info-row"><strong>Specialist:</strong> Dr. ${doctorName}</div>
            <div class="info-row"><strong>Date & Time:</strong> ${formattedDate} ${appointmentTime ? `at ${appointmentTime}` : ""}</div>
            <div class="info-row"><strong>Current Status:</strong> <span style="color: ${statusBadgeColor}; font-weight: bold;">${status}</span></div>
          </div>

          <div style="text-align: center;">
            <a href="http://localhost:5173/my-appointments" target="_blank" class="cta-btn">View Patient Dashboard</a>
          </div>
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
    to: [{ email: toEmail, name: patientName }],
    subject: `Appointment Status Update: ${status} - Saviours Clinic`,
    htmlContent,
  };

  try {
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
      console.error("Brevo Status Email Error:", errorData);
      return { success: false, error: errorData };
    }

    const resData = await response.json();
    return { success: true, messageId: resData.messageId };
  } catch (err) {
    console.error("Failed to send status email via Brevo:", err.message);
    return { success: false, error: err.message };
  }
};
