import nodemailer from 'nodemailer';
// email config and send email



// email template

export const emailProcessor = async (emailBody) => {
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
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}

export const verifyEmail = (emailData) => {
    const emailBody = {
        from: '"eStore 👻" <admin@estore.com>', // sender address
        to: emailData.email, // list of receivers
        subject: "Email Verification Instruction ✔", // Subject line
        text: `Hi, ${emailData.fName} Please click on the link to verify your email: ${emailData.url}
         Thank you.`, // plain text body
        html: `<p>Hi ${emailData.fName},</p>
         <br/>
            <p>Please click on the link to verify your email: <a href="${emailData.url}">${emailData.url}</a></p>
            <br/>
            <p>Thank you.</p>
            <br/>
            <p>eStore</p>
         ` // html body
    }
    emailProcessor(emailBody);
}

export const userVerifiedNotification = (emailData) => {
    const emailBody = {
        from: '"eStore 👻" <admin@estore.com>', // sender address
        to: emailData.email, // list of receivers
        subject: "Email Verification Successful ✔", // Subject line
        text: `Hi, ${emailData.fName} Your email has been verified successfully. You can now login to your account. Thank you.`, // plain text body
        html: `<h1>Hi, ${emailData.fName} Your email has been verified successfully.</h1>Please login to your account: <a href=" ${process.env.ROOT_DOMAIN}"> ${process.env.ROOT_DOMAIN}</a>`

    }
    emailProcessor(emailBody);
}