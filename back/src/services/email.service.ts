import nodemailer from "nodemailer";

export class EmailService{
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
    },
  });
}

async enviarTokenDeVerificacion(mailUsuario: string, token: string){
  
  const enlace = `http://localhost:4200/usuarios/verificar-mail/${token}`;

  const message = {
  from: process.env.GOOGLE_APP_EMAIL,
  to: mailUsuario,
  subject: "Prueba nodemailer",
  text: "Plaintext version of the message",
  html: '<a href="' + enlace + '">Confirmar mi cuenta</a>'
};

try {
  await this.transporter.sendMail(message)
  console.log('Email de verificacion enviado a ${mailUsuario}');
} catch (error) {
  console.log('No se pudo enviar el mail', error)
}
}

}

/*const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "giancroci5@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD
  },
});

var message = {
  from: "giancroci5@gmail.com",
  to: "giancroci5@gmail.com",
  subject: "Prueba nodemailer",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>",
};

transporter.sendMail(message)*/