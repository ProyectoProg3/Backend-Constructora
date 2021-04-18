import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /**
   * Envío de correo electrónico
   */
  EnviarCorreoElectronico(destino: string, asunto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.origenCorreoElectronico, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
  }

  /**
   * Envío de SMS
   */
  EnviarNotificacionPorSMS(telefono:string, contenido:string){
    var accountSid = process.env.TWILIO; // Your Account SID from www.twilio.com/console
    var authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

    var twilio = require('twilio');
    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: 'Hello from Node',
        to: '+12345678901',  // Text this number
        from: '+12345678901' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  }
}
