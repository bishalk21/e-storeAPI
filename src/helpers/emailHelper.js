import nodemailer from "nodemailer";
//email configuration and send email

//email templet

const emailProcesser = async (emailBody) => {
  try {
    //1.
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(emailBody);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

//make suer the emaiData has fName,e mail and url
export const verificationEmail = (emailData) => {
  console.log(emailData);
  const emailBody = {
    from: '"Prem Store 👻" <myemail@premstore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Email verification instruction", // Subject line
    text: `Hi ${emailData.fName}, please follow the linke to verify your email: ${emailData.url}`, // plain text body
    html: `
        <p>Hi ${emailData.fName}</p>
        <br />
        <br />
        <p> please follow the linke to verify your email</p>
        <br />
        <br />
        <p > <a style="color:red" href= "${emailData.url}">Verify Email</a> </p>

        <p>
        Regards, <br />
        Prem digital Store
        </p>
    
        `, // html body
  };

  emailProcesser(emailBody);
};
//make suer the emaiData has fName,e mail and url
export const userVerifiednotification = (emailData) => {
  const emailBody = {
    from: '"Prem Store 👻" <myemail@premstore.com>', // sender address
    to: emailData.email, // list of receivers
    subject: "Your account has been verified", // Subject line
    text: `Hi ${emailData.fName}, You account has been verified, you may logined in now. ${process.env.ROOT_DOMAI} `, // plain text body
    html: `
        <p>Hi ${emailData.fName}</p>
        <br />
        <br />
        <p> ou account has been verified, you may logined in now.
        <a href = "${process.env.ROOT_DOMAI}">${process.env.ROOT_DOMAI}</a>
         </p>
        <br />
        <br />
        

        <p>
        Regards, <br />
        Prem digital Store
        </p>
    
        `, // html body
  };

  emailProcesser(emailBody);
};
