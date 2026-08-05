import PDFDocument from "pdfkit";

/**
 * Generate a professional Digital Prescription & Medical Summary PDF Buffer.
 *
 * @param {Object} data
 * @param {Object} data.appointment
 * @param {Object} data.doctor
 * @param {string} data.diagnosis
 * @param {Array} data.medicines
 * @param {string} [data.medicalAdvice]
 * @param {string|Date} [data.followUpDate]
 * @param {string} [data.additionalNotes]
 * @returns {Promise<Buffer>} PDF Buffer
 */
export const generatePrescriptionPdf = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on("error", (err) => reject(err));

      const {
        appointment,
        doctor,
        diagnosis,
        medicines = [],
        medicalAdvice = "",
        followUpDate,
        additionalNotes = "",
      } = data;

      // Color Palette
      const PRIMARY_COLOR = "#253237";
      const SECONDARY_COLOR = "#5C6B73";
      const ACCENT_COLOR = "#0077B6";
      const LIGHT_BG = "#F8FBFC";
      const BORDER_COLOR = "#E2E8F0";

      // --- HEADER SECTION ---
      // Brand Name
      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("SAVIOURS CLINIC", 40, 40);

      doc
        .fillColor(SECONDARY_COLOR)
        .fontSize(9)
        .font("Helvetica")
        .text("EXCELLENCE IN HEALTHCARE & RESEARCH", 40, 65);

      // Clinic Address & Reg Info (Right-aligned)
      doc
        .fillColor(SECONDARY_COLOR)
        .fontSize(8)
        .font("Helvetica")
        .text("123 Health Plaza, Central District", 350, 40, { align: "right" })
        .text("Hotline: +1 (800) 555-0199", 350, 52, { align: "right" })
        .text("Email: contact@savioursclinic.com", 350, 64, { align: "right" })
        .text("Reg No: SC-2026-MED-9948", 350, 76, { align: "right" });

      // Horizontal Divider Line
      doc
        .moveTo(40, 95)
        .lineTo(555, 95)
        .strokeColor(PRIMARY_COLOR)
        .lineWidth(1.5)
        .stroke();

      // --- DOCUMENT TITLE BADGE ---
      doc
        .rect(40, 105, 515, 24)
        .fill(PRIMARY_COLOR);

      doc
        .fillColor("#FFFFFF")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("OFFICIAL DIGITAL PRESCRIPTION & MEDICAL SUMMARY", 45, 112, {
          align: "center",
          width: 505,
        });

      // --- METADATA GRID (Doctor & Patient Info) ---
      let y = 140;

      // Doctor Box (Left)
      doc
        .rect(40, y, 250, 75)
        .fillAndStroke(LIGHT_BG, BORDER_COLOR);

      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("ATTENDING SPECIALIST", 50, y + 8);

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(ACCENT_COLOR)
        .text(`Dr. ${doctor?.name || "Medical Officer"}`, 50, y + 24);

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(SECONDARY_COLOR)
        .text(`Specialty: ${doctor?.specialization || appointment?.specialization || "General Medicine"}`, 50, y + 38)
        .text(`Email: ${doctor?.email || "N/A"}`, 50, y + 52);

      // Patient Box (Right)
      doc
        .rect(305, y, 250, 75)
        .fillAndStroke(LIGHT_BG, BORDER_COLOR);

      const formattedVisitDate = appointment?.appointmentDateTime
        ? new Date(appointment.appointmentDateTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : new Date().toLocaleDateString();

      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("PATIENT INFORMATION", 315, y + 8);

      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .fillColor(PRIMARY_COLOR)
        .text(appointment?.patientName || "Patient", 315, y + 24);

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor(SECONDARY_COLOR)
        .text(`Age/Gender: ${appointment?.patientAge ? appointment.patientAge + " Yrs" : "N/A"} / ${appointment?.gender || "N/A"}`, 315, y + 38)
        .text(`Visit Date: ${formattedVisitDate} | Ref: #${appointment?._id ? appointment._id.toString().slice(-6).toUpperCase() : "N/A"}`, 315, y + 52);

      // --- DIAGNOSIS SECTION ---
      y += 90;

      doc
        .rect(40, y, 515, 45)
        .fillAndStroke("#F0F7F9", BORDER_COLOR);

      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("DIAGNOSIS & CLINICAL OBSERVATION:", 50, y + 8);

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("#1E293B")
        .text(diagnosis || "General Health Consultation", 50, y + 23, {
          width: 495,
          height: 20,
        });

      // --- RX / MEDICINES TABLE ---
      y += 55;

      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(12)
        .font("Helvetica-Bold")
        .text("Rx - PRESCRIBED MEDICATIONS", 40, y);

      y += 18;

      // Table Header
      doc
        .rect(40, y, 515, 20)
        .fill(PRIMARY_COLOR);

      doc.fillColor("#FFFFFF").fontSize(8).font("Helvetica-Bold");
      doc.text("#", 45, y + 6, { width: 20 });
      doc.text("MEDICINE NAME", 70, y + 6, { width: 140 });
      doc.text("DOSAGE", 215, y + 6, { width: 75 });
      doc.text("FREQUENCY", 295, y + 6, { width: 85 });
      doc.text("DURATION", 385, y + 6, { width: 65 });
      doc.text("INSTRUCTIONS", 455, y + 6, { width: 95 });

      y += 20;

      if (Array.isArray(medicines) && medicines.length > 0) {
        medicines.forEach((med, idx) => {
          const rowBg = idx % 2 === 0 ? "#FFFFFF" : LIGHT_BG;
          doc
            .rect(40, y, 515, 22)
            .fillAndStroke(rowBg, BORDER_COLOR);

          doc.fillColor("#1E293B").fontSize(8).font("Helvetica");
          doc.text((idx + 1).toString(), 45, y + 6, { width: 20 });
          doc.font("Helvetica-Bold").text(med.name || "N/A", 70, y + 6, { width: 140 });
          doc.font("Helvetica").text(med.dosage || "-", 215, y + 6, { width: 75 });
          doc.text(med.frequency || "-", 295, y + 6, { width: 85 });
          doc.text(med.duration || "-", 385, y + 6, { width: 65 });
          doc.text(med.instructions || "-", 455, y + 6, { width: 95 });

          y += 22;
        });
      } else {
        doc
          .rect(40, y, 515, 22)
          .fillAndStroke(LIGHT_BG, BORDER_COLOR);

        doc.fillColor(SECONDARY_COLOR).fontSize(8).font("Helvetica-Oblique");
        doc.text("No specific prescription medicines added.", 50, y + 6);
        y += 22;
      }

      // --- MEDICAL ADVICE & FOLLOW-UP ---
      y += 15;

      if (medicalAdvice || followUpDate || additionalNotes) {
        doc
          .rect(40, y, 515, 75)
          .fillAndStroke(LIGHT_BG, BORDER_COLOR);

        let innerY = y + 8;

        if (medicalAdvice) {
          doc
            .fillColor(PRIMARY_COLOR)
            .fontSize(9)
            .font("Helvetica-Bold")
            .text("MEDICAL ADVICE & DIET INSTRUCTIONS:", 50, innerY);
          doc
            .fillColor("#334155")
            .fontSize(8.5)
            .font("Helvetica")
            .text(medicalAdvice, 50, innerY + 12, { width: 495 });
          innerY += 28;
        }

        if (followUpDate) {
          const formattedFollowUp = new Date(followUpDate).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          doc
            .fillColor(ACCENT_COLOR)
            .fontSize(9)
            .font("Helvetica-Bold")
            .text(`RECOMMENDED FOLLOW-UP VISIT: ${formattedFollowUp}`, 50, innerY);
          innerY += 16;
        }

        if (additionalNotes) {
          doc
            .fillColor(SECONDARY_COLOR)
            .fontSize(8)
            .font("Helvetica")
            .text(`Notes: ${additionalNotes}`, 50, innerY, { width: 495 });
        }
      }

      // --- FOOTER & DIGITAL SIGNATURE ---
      const footerY = 740;

      doc
        .moveTo(40, footerY)
        .lineTo(555, footerY)
        .strokeColor(BORDER_COLOR)
        .lineWidth(1)
        .stroke();

      // Signature Stamp Representation
      doc
        .rect(380, footerY + 10, 175, 40)
        .fillAndStroke("#F1F5F9", "#CBD5E1");

      doc
        .fillColor(PRIMARY_COLOR)
        .fontSize(8)
        .font("Helvetica-Bold")
        .text("DIGITALLY SIGNED & VERIFIED", 385, footerY + 16, { align: "center", width: 165 });

      doc
        .fillColor(ACCENT_COLOR)
        .fontSize(8)
        .font("Helvetica")
        .text(`Dr. ${doctor?.name || "Medical Officer"}`, 385, footerY + 28, { align: "center", width: 165 });

      // Left Disclaimer
      doc
        .fillColor(SECONDARY_COLOR)
        .fontSize(7.5)
        .font("Helvetica")
        .text("This document is a legally valid electronic prescription generated by Saviours Clinic System.", 40, footerY + 15)
        .text(`Issued On: ${new Date().toLocaleString()} | Authenticity ID: ${Date.now()}`, 40, footerY + 28)
        .text("For medical inquiries or emergency support, please call +1 (800) 555-0199.", 40, footerY + 41);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
