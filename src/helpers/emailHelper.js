import nodemailer from "nodemailer";

// email configuration
// email template

const emailProcessor = async (emailBody) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(emailBody);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// make sure the emailData has firstName, email and url
export const verificationEmail = (emailData) => {
  const emailBody = {
    from: '"FEWA-STORE" <carkeybeekey@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email verification Instruction", // Subject line
    text: `Hi ${emailData.firstName}, please follow the link to verify your email: ${emailData.url}`, // plain text body
    // html body
    html: `
        <h1>Hi ${emailData.firstName},</h1>
        <br />
        <p>Please follow the link to verify your email: </p>
        <br />
        <a href="${emailData.url}">${emailData.url}</a>
        <br />
        <br />
        <p>Thanks</p>
        <p>FEWA-STORE</p>
        `,
  };

  emailProcessor(emailBody);
};

// make sure the emailData has firstName, email and url
export const userVerifyNotification = (emailData) => {
  const emailBody = {
    from: '"FEWA-STORE" <carkeybeekey@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Yor account has been verified", // Subject line
    text: `Hi ${emailData.firstName}, your account has been verified, please login to continue. `, // plain text body
    // html body
    html: `
      <h1>Hi ${emailData.firstName},</h1>
      <br />
      <p>Your account has been verified, please login to continue. </p>
      <br />
      <a href="${process.env.ROOT_DOMAIN}">${process.env.ROOT_DOMAIN}</a>
      <br />
      <p>Thanks</p>
      <p>FEWA-STORE</p>
      `,
  };

  emailProcessor(emailBody);
};

// send otp to the user mail
export const otpNotification = (emailData) => {
  const emailBody = {
    from: '"FEWA-STORE" <carkeybeekey@gmail.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "OTP for your password reset", // Subject line
    text: `Hi ${emailData.firstName}, please use the following OTP to reset your password`, // plain text body
    // html body
    html: `
      <h1>Hi ${emailData.firstName},</h1>
      <br />
      <p>Please use the this following OTP to update your password. ${emailData.otp} </p>
      <br />
     <p>${emailData.otp}</p>
      <br />
      <p>Thanks</p>
      <p>FEWA-STORE</p>
      `,
  };

  emailProcessor(emailBody);
};
