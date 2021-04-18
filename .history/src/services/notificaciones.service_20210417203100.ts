import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
var twilio = require('twilio');


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
    var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
    var authToken = process.env.TWILIO_TK;   // Your Auth Token from www.twilio.com/console

    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: contenido,
        to: telefono,  // Text this number
        from: llaves.twilioPhone' // From a valid Twilio number
    })
    .then((message: any) => console.log(message.sid));
  }
}
