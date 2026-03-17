import { Resend } from "resend";
import { AppError } from "../../utils/AppError";
import { env } from "../../config/env";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

const resend = new Resend(env.RESEND_API_KEY);

const FRONTEND_URL = env.FRONTEND_URL;

if (!env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

if (!FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not defined");
}

export class AuthEmail {
  static async sendConfirmationEmail(user: IEmail): Promise<void> {
    try {
      await resend.emails.send({
        from: "LegalApp <no-reply@resend.dev>",
        to: user.email,
        subject: "Confirma tu cuenta",
        html: `
          <h2>Hola ${user.name}</h2>
          <p>Gracias por registrarte.</p>
          <p>Usa el siguiente código para confirmar tu cuenta:</p>
          <h3>${user.token}</h3>
          <p>O haz clic aquí:</p>
          <a href="${FRONTEND_URL}/auth/confirm-account">
            Confirmar cuenta
          </a>
          <p>Este código expira en 10 minutos.</p>
        `,
      });
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
      throw new AppError("Error enviando email de confirmación", 500);
    }
  }

  static async sendPasswordResetToken(user: IEmail): Promise<void> {
    try {
      await resend.emails.send({
        from: "LegalApp <no-reply@resend.dev>",
        to: user.email,
        subject: "Restablece tu contraseña",
        html: `
          <h2>Hola ${user.name}</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Usa el siguiente código:</p>
          <h3>${user.token}</h3>
          <p>O haz clic aquí:</p>
          <a href="${FRONTEND_URL}/auth/new-password">
            Restablecer contraseña
          </a>
          <p>Este código expira en 10 minutos.</p>
        `,
      });
    } catch (error) {
      console.error("Error enviando email de reset:", error);
      throw new AppError("Error enviando email de recuperación", 500);
    }
  }
}
