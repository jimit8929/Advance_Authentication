import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapclient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async(email , verificationToken) => {
  const recipient = [{email}]

  try{
    const response = await mailtrapclient.send({
      from:sender,
      to:recipient,
      subject:"Verify your email",
      html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , verificationToken),
      category: "Email Verification"
    });

    console.log("Email sent Successfully" , response);
  }
  catch(error){
    console.error(`Error sending Verification`,error);
    throw new Error( `Error sending Verification email: ${error}`);
  }
}