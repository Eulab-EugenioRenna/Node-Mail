const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const nome = req.body.nome;
  const cognome = req.body.cognome;
  const email = req.body.email;
  const eta = req.body.eta;
  const tel1 = req.body.tel1;
  const tel2 = req.body.tel2;
  const sesso = req.body.sesso;
  const prenotazioni = req.body.prenotazioni;
  const materassino = req.body.materassino;
  const allergie = req.body.allergie;
  const altro = req.body.altro;
  const media = req.body.media;
  const privacy = req.body.privacy;
  const bonifico = req.body.bonifico;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eulabconsult@gmail.com', // Replace with your email address
      pass: 'pxeuniartpnddedy', // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'eulabconsult@gmail.com',
    to: 'pdellagrazia@gmail.com', // Replace with recipient email address
    subject: 'Iscrizione Pdg Summer Camp ',
    text: `
      Nome: ${nome}
      Cognome: ${cognome}
      Email: ${email}
      Età: ${eta}
      Sesso: ${sesso}
      Tel1: ${tel1} 
      Tel2: ${tel2}
      
      Numero Prenotazioni: ${prenotazioni}
      Altro: ${altro}

      Materassino: ${materassino}
      Allergie: ${allergie}

      Consenso Media: ${media}
      Consenso Privcay: ${privacy}
    `,
    attachments: [
      {
        // encoded string as an attachment
        filename: 'bonifico.jpg',
        content: bonifico.split('base64,')[1],
        encoding: 'base64',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
