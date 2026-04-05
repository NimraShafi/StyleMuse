import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { data: existingSubscriber } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existingSubscriber?.status === "active") {
      return NextResponse.json(
        { error: "Already subscribed!" },
        { status: 400 },
      );
    }

    if (!existingSubscriber) {
      await supabase.from("subscribers").insert([{ email, status: "active" }]);
    }

    try {
      const emailResult = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: `Welcome to ${process.env.COMPANY_NAME || "Style Muse"} Club!`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Style Muse Club</title>
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
                          <p style="color: #666666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; margin: 8px 0 0 0; font-family: sans-serif;">EXCLUSIVE CLUB</p>
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="color: #333333; font-size: 24px; font-weight: normal; margin: 0 0 20px 0; text-align: center;">Welcome to Style Muse Club!</h2>

                          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0; text-align: center; font-family: sans-serif;">
                            Congratulations! You've joined our exclusive community of style enthusiasts.
                          </p>

                          <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0; text-align: center; font-family: sans-serif;">
                            Get ready to elevate your style game with curated pieces that speak to your unique taste.
                          </p>
                        </td>
                      </tr>

                      <!-- CTA Button -->
                      <tr>
                        <td style="padding: 0 30px 40px 30px; text-align: center;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/products" style="background-color: #1a1a1a; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block; transition: background-color 0.3s ease;">
                            Explore Exclusive Collections
                          </a>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f8f8f8; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                          <p style="color: #999999; font-size: 12px; margin: 0 0 10px 0; font-family: sans-serif;">
                            Questions about your membership? Contact us at <a href="mailto:${process.env.CONTACT_EMAIL || "hello@stylemuse.com"}" style="color: #d4af37; text-decoration: none;">${process.env.CONTACT_EMAIL || "hello@stylemuse.com"}</a>
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

      console.log("Email sent successfully:", emailResult);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Still return success since subscriber was added, but indicate email failure
      return NextResponse.json(
        {
          success: true,
          message:
            "Welcome to StyleMuse Club! (Note: Welcome email could not be sent)",
          emailSent: false,
          emailError: emailError.message,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Welcome to StyleMuse Club!", emailSent: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
