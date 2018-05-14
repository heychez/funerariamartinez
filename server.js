const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');//({ origin: true });

const PORT = 3000;

var app = express();
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Running...');
});

app.post('/sendMail', (req, res) => {
  let {
    name,
    cellphone,
    email,
    date,
    plans,
    aditionals,
    products
  } = req.body;

  plans = plans || [];
  aditionals = aditionals || [];
  products = products || [];

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zikvanz@gmail.com',
      pass: 'mrikdndrcgzgA0.'
    }
  });

  let html = `
    <p><b>Nombre:</b> ${name}</p>
    <p><b>Celular:</b> ${cellphone}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Fecha de visita:</b> ${date}</p>
  `;

  if (plans) {
    html += `
      <b>Planes:</b>
      <ul>
    `;
    for (let i = 0; i < plans.length; i++) {
      html += `<li>${plans[i]}</li>`;
    }
    html += `</ul>`;
  }

  if (aditionals) {
    html += `
      <b>Servicios Adicionales:</b>
      <ul>
    `;
    for (let i = 0; i < aditionals.length; i++) {
      html += `<li>${aditionals[i]}</li>`;
    }
    html += `</ul>`;
  }

  if (products) {
    html += `
      <b>Productos:</b>
      <ul>
    `;
    for (let i = 0; i < products.length; i++) {
      html += `<li>${products[i]}</li>`;
    }
    html += `</ul>`;
  }


  const mailOptions = {
    from: 'zikvanz@gmail.com',
    // to: 'roberto.cclo@gmail.com, zikvanz@gmail.com',
    to: 'roberto.cclo@gmail.com',
    subject: 'Email de contacto',
    html: html
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(info);
      res.send(info);
    }
  });

});

app.listen(PORT, function () {
  console.log('App listening on port: ' + PORT);
});