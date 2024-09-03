import { EmailVerificationTemplate } from "@/components/mail/verification-code";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function isValidEmail(email: string): boolean {
  return /.+@.+/.test(email);
}

export async function sendVerificationCode(email: string, code: string) {
  const { data, error } = await resend.emails.send({
    from: "ffconvert <noreply@ffconvert-mail.orole.be>",
    to: email,
    subject: "Verify your email",
    react: EmailVerificationTemplate({ email, code }),
  });

  if (error) {
    console.error(error);
  } else {
    console.log("Email sent", data);
  }
}
