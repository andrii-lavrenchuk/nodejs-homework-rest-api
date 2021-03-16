// const Mailgen = require('mailgen');
// const sgMail = require('@sendgrid/mail');
// const config = require('../config/email.json');
// require('dotenv').config();

// class EmailService {
//   #sender = sgMail;
//   #GenerateTemplate = Mailgen;
//   constructor(env) {
//     switch (env) {
//       case 'development':
//         this.link = config.dev;
//         break;
//       case 'production':
//         this.link = config.prod;
//         break;
//       case 'stage':
//         this.link = config.stage;
//         break;
//       default:
//         this.link = config.dev;
//         break;
//     }
//   }
//   #createTemplate(verifyToken, name = 'Guest') {
//     const mailGenerator = new this.#GenerateTemplate({
//       theme: 'cerberus',
//       product: {
//         name: 'System Contacts',
//         link: this.link,
//       },
//     });

//     const template = {
//       body: {
//         name,
//         intro: 'This is intro',
//         action: {
//           instructions: 'Tp verify your email press the button',
//           button: {
//             color: '#22BC66', // Optional action button color
//             text: 'Confirm your account',
//             link: `${this.link}/api/users/verify/${verifyToken}`,
//           },
//         },
//         outro:
//           "Need help, or have questions? Just reply to this email, we'd love to help.",
//       },
//     };
//     return mailGenerator.generate(template);
//   }
//   async sendEmail(verifyToken, email, name) {
//     const emailBody = this.#createTemplate(verifyToken, name);
//     this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
//     const msg = {
//       to: email,
//       from: 'no-reply@system-contacts.com', // Use the email address or domain you verified above
//       subject: 'Confirm registration',
//       html: emailBody,
//     };
//     //ES6
//     await this.#sender.send(msg);
//   }
// }

// module.exports = EmailService;

const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
const config = require('../config/email.json');

require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = config.dev;
        break;
      case 'stage':
        this.link = config.stage;
        break;
      case 'production':
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }
  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'neopolitan',
      product: {
        name: 'System Cats',
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro: 'Это у нас интро и где ты находишся?',
        action: {
          instructions: 'Чтобы закончить регистрацию кликните на кнопку',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Подтвердить свой аккаунт',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'no-reply@system-cats.com', // Use the email address or domain you verified above
      subject: 'Подтверждение регистрации',
      html: emailBody,
    };
    //ES6
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
