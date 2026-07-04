import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "Market Street <noreply@mswma.com>";

  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  return res.ok;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      inquiryType,
      lifePhase,
      message,
      website,
    } = body;

    // Honeypot — bots fill hidden fields
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!firstName?.trim() || !lastName?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const notifyEmail = process.env.CONTACT_EMAIL ?? "info@mswma.com";
    const fullName = `${firstName} ${lastName}`;

    await sendEmail(
      notifyEmail,
      `New Contact Form: ${fullName}`,
      `<h2>New Contact Form Submission</h2>
       <p><strong>Name:</strong> ${fullName}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Phone:</strong> ${phone}</p>
       <p><strong>Inquiry:</strong> ${inquiryType}</p>
       <p><strong>Life Phase:</strong> ${lifePhase || "Not specified"}</p>
       <p><strong>Message:</strong> ${message || "None"}</p>`
    );

    await sendEmail(
      email,
      "Thank you for contacting Market Street Wealth Management",
      `<p>Dear ${firstName},</p>
       <p>Thank you for reaching out to Market Street Wealth Management. A member of our team will be in touch shortly.</p>
       <p>In the meantime, feel free to <a href="https://mswma.com/schedule">schedule a complimentary consultation</a> at your convenience.</p>
       <p>Warm regards,<br/>Market Street Wealth Management</p>`
    );

    console.log("Contact form submission:", {
      firstName,
      lastName,
      phone,
      email,
      inquiryType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
