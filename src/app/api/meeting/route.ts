// app/api/meeting/route.ts
// Handles meeting booking:
// 1. Sends confirmation email to the USER
// 2. Sends notification email to RAJARAM
// 3. Saves booking to a local JSON log (meetings.json in /data)
//
// Required env vars:
//   EMAIL_USER     — Gmail address used to send (e.g. codeml862@gmail.com)
//   EMAIL_PASS     — Gmail App Password (NOT your normal password)
//                    Generate at: Google Account → Security → 2-Step Verification → App passwords
//   RAJARAM_EMAIL  — Rajaram's inbox (codeml862@gmail.com)

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MeetingBooking {
  id: string;
  name: string;
  email: string;
  title: string;
  slot: string;
  message?: string;
  createdAt: string;
  status: "pending" | "confirmed" | "rejected";
}

// ─── Persist bookings ─────────────────────────────────────────────────────────

function saveMeeting(booking: MeetingBooking) {
  try {
    const dir  = path.join(process.cwd(), "data");
    const file = path.join(dir, "meetings.json");

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    let existing: MeetingBooking[] = [];
    if (fs.existsSync(file)) {
      try { existing = JSON.parse(fs.readFileSync(file, "utf-8")); } catch { /* ignore */ }
    }

    existing.push(booking);
    fs.writeFileSync(file, JSON.stringify(existing, null, 2), "utf-8");
  } catch (err) {
    console.error("[meeting] Failed to save booking:", err);
  }
}

// ─── Email transporter ────────────────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ─── Email templates ──────────────────────────────────────────────────────────

function rajaramEmailHtml(b: MeetingBooking) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Meeting Request</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#18181b;padding:32px 32px 24px;border-bottom:1px solid #27272a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:#a3e635;border-radius:8px;padding:6px 12px;">
                      <span style="color:#000;font-weight:900;font-size:14px;letter-spacing:0.05em;">LR</span>
                    </div>
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-left:12px;">PORTFOLIO ASSISTANT</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:28px 32px 0;">
              <div style="display:inline-block;background:rgba(163,230,53,0.1);border:1px solid rgba(163,230,53,0.25);border-radius:999px;padding:4px 14px;">
                <span style="color:#a3e635;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">● New Meeting Request</span>
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:16px 32px 0;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:900;letter-spacing:-0.03em;line-height:1.2;">
                Someone wants to<br/>
                <span style="color:#a3e635;">meet with you.</span>
              </h1>
            </td>
          </tr>

          <!-- Booking details -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;border:1px solid #27272a;border-radius:12px;overflow:hidden;">
                ${[
                  ["Name",            b.name],
                  ["Email",           b.email],
                  ["Meeting Title",   b.title],
                  ["Preferred Slot",  b.slot],
                  ["Booking ID",      b.id],
                  ["Requested At",    new Date(b.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
                ].map(([label, value], i) => `
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #27272a;${i % 2 === 0 ? "" : "background:rgba(255,255,255,0.02)"}">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">${label}</span>
                    <span style="color:#e4e4e7;font-size:14px;font-weight:600;">${value}</span>
                  </td>
                </tr>`).join("")}
                ${b.message ? `
                <tr>
                  <td style="padding:14px 20px;">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">Message</span>
                    <span style="color:#e4e4e7;font-size:14px;">${b.message}</span>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:24px 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:${b.email}?subject=Re%3A%20Meeting%20Request%20%E2%80%94%20${encodeURIComponent(b.title)}"
                       style="display:inline-block;background:#a3e635;color:#000;font-size:13px;font-weight:900;padding:12px 24px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">
                      Reply to ${b.name} →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#3f3f46;font-size:11px;margin:12px 0 0;">
                Booking ID: ${b.id} · Status: Pending your confirmation
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

function userEmailHtml(b: MeetingBooking) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Meeting Request Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 24px;border-bottom:1px solid #27272a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:#a3e635;border-radius:8px;padding:6px 12px;">
                      <span style="color:#000;font-weight:900;font-size:14px;">LR</span>
                    </div>
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin-left:12px;">LAVUDYA RAJARAM</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:28px 32px 0;">
              <div style="display:inline-block;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.25);border-radius:999px;padding:4px 14px;">
                <span style="color:#34d399;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">✓ Request Received</span>
              </div>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:16px 32px 0;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:900;letter-spacing:-0.03em;line-height:1.2;">
                Hi ${b.name.split(" ")[0]}, your meeting<br/>
                <span style="color:#a3e635;">request is sent!</span>
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:20px 32px 0;">
              <p style="color:#a1a1aa;font-size:13px;line-height:1.8;margin:0;">
                Thank you for reaching out! Rajaram has received your meeting request and will confirm within <strong style="color:#e4e4e7;">24 hours</strong>. 
                You'll get a follow-up email once he confirms your slot.
              </p>
            </td>
          </tr>

          <!-- Summary card -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;border:1px solid #27272a;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #27272a;background:rgba(163,230,53,0.04);">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">Meeting Title</span>
                    <span style="color:#a3e635;font-size:15px;font-weight:700;">${b.title}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #27272a;">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">Preferred Slot</span>
                    <span style="color:#e4e4e7;font-size:14px;font-weight:600;">${b.slot}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #27272a;">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">Your Email</span>
                    <span style="color:#e4e4e7;font-size:14px;">${b.email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    <span style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;display:block;margin-bottom:4px;">Booking Reference</span>
                    <span style="color:#e4e4e7;font-size:12px;font-family:'Courier New',monospace;">${b.id}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding:24px 32px 0;">
              <p style="color:#52525b;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">What happens next</p>
              ${[
                "Rajaram reviews your request and checks his calendar",
                "He sends you a confirmation email with a Google Meet or Zoom link",
                "You meet at your confirmed slot — that's it!",
              ].map((step, i) => `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                <tr>
                  <td width="28" valign="top">
                    <div style="width:22px;height:22px;background:rgba(163,230,53,0.12);border:1px solid rgba(163,230,53,0.25);border-radius:6px;text-align:center;line-height:22px;">
                      <span style="color:#a3e635;font-size:11px;font-weight:900;">${i + 1}</span>
                    </div>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="color:#a1a1aa;font-size:12px;line-height:1.6;">${step}</span>
                  </td>
                </tr>
              </table>`).join("")}
            </td>
          </tr>

          <!-- Calendly fallback -->
          <tr>
            <td style="padding:20px 32px;">
              <p style="color:#52525b;font-size:12px;margin:0 0 12px;">Can't wait? Book instantly on Calendly:</p>
              <a href="https://calendly.com/raja"
                 style="display:inline-block;background:transparent;color:#a3e635;font-size:12px;font-weight:700;padding:10px 20px;border:1px solid rgba(163,230,53,0.3);border-radius:10px;text-decoration:none;">
                Open Calendly →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 32px;border-top:1px solid #27272a;">
              <p style="color:#3f3f46;font-size:11px;margin:0;line-height:1.8;">
                Questions? Email Rajaram directly at
                <a href="mailto:codeml862@gmail.com" style="color:#a3e635;text-decoration:none;">codeml862@gmail.com</a><br/>
                GitHub: <a href="https://github.com/lavudyaraja" style="color:#a3e635;text-decoration:none;">github.com/lavudyaraja</a> ·
                LinkedIn: <a href="https://www.linkedin.com/in/lavudyaraja5228/" style="color:#a3e635;text-decoration:none;">lavudyaraja5228</a>
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

// ─── POST /api/meeting ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, title, slot, message } = body;

    // Validate
    if (!name || !email || !title || !slot) {
      return NextResponse.json(
        { error: "name, email, title, and slot are required." },
        { status: 400 }
      );
    }

    // Build booking record
    const booking: MeetingBooking = {
      id:        `MTG-${Date.now().toString(36).toUpperCase()}`,
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      title:     title.trim(),
      slot:      slot.trim(),
      message:   message?.trim() || undefined,
      createdAt: new Date().toISOString(),
      status:    "pending",
    };

    // Save to disk
    saveMeeting(booking);

    // Check env vars
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("[meeting] EMAIL_USER / EMAIL_PASS not set — skipping email send");
      return NextResponse.json({
        success: true,
        id:      booking.id,
        warning: "Email not configured — booking saved locally only.",
      });
    }

    const transporter = createTransporter();
    const RAJARAM_EMAIL = process.env.RAJARAM_EMAIL || "codeml862@gmail.com";

    // Send both emails in parallel
    const [rajaramResult, userResult] = await Promise.allSettled([
      transporter.sendMail({
        from:    `"Portfolio Assistant" <${process.env.EMAIL_USER}>`,
        to:      RAJARAM_EMAIL,
        subject: `📅 New Meeting Request — ${booking.title} from ${booking.name}`,
        html:    rajaramEmailHtml(booking),
        text: [
          `New meeting request from ${booking.name}`,
          `Email: ${booking.email}`,
          `Title: ${booking.title}`,
          `Slot:  ${booking.slot}`,
          `ID:    ${booking.id}`,
          booking.message ? `Message: ${booking.message}` : "",
          `\nReply directly: ${booking.email}`,
        ].filter(Boolean).join("\n"),
      }),
      transporter.sendMail({
        from:    `"Lavudya Rajaram" <${process.env.EMAIL_USER}>`,
        to:      booking.email,
        subject: `✅ Meeting Request Received — ${booking.title}`,
        html:    userEmailHtml(booking),
        text: [
          `Hi ${booking.name},`,
          ``,
          `Your meeting request has been received!`,
          ``,
          `Meeting Title: ${booking.title}`,
          `Preferred Slot: ${booking.slot}`,
          `Booking ID: ${booking.id}`,
          ``,
          `Rajaram will confirm within 24 hours.`,
          ``,
          `You can also book instantly at: https://calendly.com/raja`,
          `Or email directly: codeml862@gmail.com`,
        ].join("\n"),
      }),
    ]);

    const errors: string[] = [];
    if (rajaramResult.status === "rejected") {
      console.error("[meeting] Failed to email Rajaram:", rajaramResult.reason);
      errors.push("rajaram_notify_failed");
    }
    if (userResult.status === "rejected") {
      console.error("[meeting] Failed to email user:", userResult.reason);
      errors.push("user_confirm_failed");
    }

    return NextResponse.json({
      success: true,
      id:      booking.id,
      emails: {
        rajaram: rajaramResult.status === "fulfilled" ? "sent" : "failed",
        user:    userResult.status    === "fulfilled" ? "sent" : "failed",
      },
      ...(errors.length > 0 ? { warnings: errors } : {}),
    });
  } catch (err) {
    console.error("[meeting API]", err);
    return NextResponse.json(
      { error: "Failed to process meeting request." },
      { status: 500 }
    );
  }
}

// ─── GET /api/meeting — List saved bookings (admin only) ─────────────────────

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = path.join(process.cwd(), "data", "meetings.json");
    if (!fs.existsSync(file)) {
      return NextResponse.json({ meetings: [], total: 0 });
    }
    const meetings = JSON.parse(fs.readFileSync(file, "utf-8"));
    return NextResponse.json({ meetings, total: meetings.length });
  } catch {
    return NextResponse.json({ error: "Failed to read bookings." }, { status: 500 });
  }
}