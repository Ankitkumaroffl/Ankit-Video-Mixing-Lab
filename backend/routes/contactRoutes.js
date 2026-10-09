
const express = require("express");
const db = require("../config/db");
const { Resend } = require("resend");

const {
  verifyToken,
  verifyAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

// Build a safe diagnostic message for email delivery failures.
// Resend errors are { message, statusCode, name } and never contain
// API keys or passwords.
function safeEmailErrorMessage(error) {
  if (!error) return "Unknown email delivery error";

  const status = error.statusCode;
  const code = error.name;
  const detail =
    error.message || "Unknown email delivery error";

  const parts = [];
  if (status) parts.push(`[${status}]`);
  if (code) parts.push(`(${code})`);
  parts.push(detail);

  return parts.join(" ");
}

// Log a safe email failure and return a 500 to the client so the
// failure is visible instead of being silently swallowed.
function reportEmailFailure(res, error) {
  console.error(
    "❌ Contact email failed:",
    safeEmailErrorMessage(error)
  );

  return res.status(500).json({
    success: false,
    message:
      "Your message was saved, but the notification email could not be sent. Please try again or contact us directly.",
  });
}


// ===============================
// SUBMIT CONTACT FORM
// ===============================
router.post("/", async (req, res) => {
  console.log("📩 CONTACT ROUTE HIT");
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Save message in database
    await db.execute(
      `INSERT INTO contacts
      (name, email, phone, service, message)
      VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone || null,
        service || null,
        message,
      ]
    );


    // ===============================
    // SEND EMAIL TO OWNER
    // ===============================
    try {
      // NOTE: the Resend SDK NEVER throws on API errors - it resolves with
      // { data, error }. The error object must be checked explicitly.
      const emailResult = await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "Ankit Video Lab <onboarding@resend.dev>",
        to: [process.env.OWNER_EMAIL],

        // Recipient can reply directly to the customer
        replyTo: email,

        subject: `New Client Message - ${name}`,

        html: `
          <h2>New Client Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${
            phone || "Not provided"
          }</p>

          <p><strong>Service:</strong> ${
            service || "General Inquiry"
          }</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>

          <hr>

          <p>
            This message was submitted from
            <strong>Ankit Video Lab</strong>.
          </p>
        `,
      });

      if (emailResult && emailResult.error) {
        return reportEmailFailure(
          res,
          emailResult.error
        );
      }

      const emailId =
        emailResult &&
        emailResult.data &&
        emailResult.data.id;

      console.log(
        "✅ Owner email sent successfully",
        emailId ? `(Resend id: ${emailId})` : ""
      );

    } catch (emailError) {
      // Transport-level failures (rare: SDK resolves most errors)
      return reportEmailFailure(res, emailError);
    }

    // Response to client
    res.status(201).json({
      success: true,
      message: "Your message has been submitted successfully!",
    });

  } catch (error) {
    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});


// ===============================
// GET ALL CONTACTS
// ADMIN ONLY
// ===============================
router.get(
  "/",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const [contacts] = await db.execute(
        `SELECT
          id,
          name,
          email,
          phone,
          service,
          message,
          created_at
         FROM contacts
         ORDER BY created_at DESC`
      );

      res.status(200).json({
        success: true,
        contacts,
      });

    } catch (error) {
      console.error("Get Contacts Error:", error);

      res.status(500).json({
        success: false,
        message: "Unable to fetch contact requests",
      });
    }
  }
);


module.exports = router;

