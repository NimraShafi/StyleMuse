import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Insert into database
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        email,
        subject,
        message,
      },
    ]);

    if (error) {
      console.error("Database error:", error);
      // For now, continue with email sending even if database fails
      console.log("Continuing with email sending despite database error...");
    }

    // Send confirmation email
    try {
      console.log("Attempting to send email to:", email);
      const emailResult = await resend.emails.send({
        from: "onboarding@resend.dev", // Use Resend's test domain for development
        to: email,
        subject: `Thank you for contacting ${process.env.COMPANY_NAME || "Style Muse"}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Thank you for contacting Style Muse</title>
            </head>
            <body style="font-family: 'Times New Roman', serif; margin: 0; padding: 0; background-color: #f8f8f8;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8f8f8;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background-color: #1a1a1a; padding: 40px 30px; text-align: center;">
                          <h1 style="color: #d4af37; font-size: 28px; font-weight: normal; margin: 0; letter-spacing: 2px;">${process.env.COMPANY_NAME || "STYLE MUSE"}</h1>
                          <p style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; margin: 8px 0 0 0; font-family: sans-serif;">Thank You</p>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="color: #333333; font-size: 24px; font-weight: normal; margin: 0 0 20px 0; text-align: center;">We've Received Your Message</h2>

                          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center; font-family: sans-serif;">
                            Dear ${name},
                          </p>

                          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: center; font-family: sans-serif;">
                            Thank you for reaching out to ${process.env.COMPANY_NAME || "Style Muse"}. We've received your message regarding <strong>"${subject}"</strong> and our team will get back to you.
                          </p>

                          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 6px; margin: 30px 0;">
                            <h3 style="color: #333333; font-size: 18px; margin: 0 0 15px 0; font-family: sans-serif;">Best Regards:</h3>
                            <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 0; font-family: sans-serif; white-space: pre-line;">${process.env.COMPANY_NAME || "STYLE MUSE"}</p>
                          </div>

                          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0; text-align: center; font-family: sans-serif;">
                            In the meantime, explore our latest collection or follow us on social media for inspiration.
                          </p>
                        </td>
                      </tr>

                      <!-- CTA Button -->
                      <tr>
                        <td style="padding: 0 30px 40px 30px; text-align: center;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"}" style="background-color: #1a1a1a; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; transition: background-color 0.3s ease;">
                            Shop Our Collection
                          </a>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                          <p style="color: #999999; font-size: 12px; margin: 0 0 10px 0; font-family: sans-serif;">
                            Questions? Contact us at <a href="mailto:${process.env.CONTACT_EMAIL || "hello@stylemuse.com"}" style="color: #d4af37; text-decoration: none;">${process.env.CONTACT_EMAIL || "hello@stylemuse.com"}</a>
                          </p>
                          <p style="color: #999999; font-size: 12px; margin: 0; font-family: sans-serif;">
                            © 2024 ${process.env.COMPANY_NAME || "Style Muse"}. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
      console.log("FULL EMAIL RESULT:", emailResult);
      console.log("Email sent successfully to:", email);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
