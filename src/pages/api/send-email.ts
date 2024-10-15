// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Configura el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Envía el correo electrónico
      await transporter.sendMail({
        from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
        to: "d.moraga.tenorio@gmail.com", // Tu dirección de correo electrónico
        subject: "Nuevo mensaje de contacto",
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        html: `
          <h3>Nuevo mensaje de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        `,
      });

      res.status(200).json({ message: "Correo enviado con éxito" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      res.status(500).json({ message: "Error al enviar el correo" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
