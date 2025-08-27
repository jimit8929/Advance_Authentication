import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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


export const sendWelcomeEmail = async(email , name) => {
  const recipient = [{email}];

  try{
    const response = await mailtrapclient.send({
      from:sender,
      to:recipient,
      template_uuid:"c694b667-1d82-44b9-b328-d120dab2212f",
      template_variables:{
        "name": name,
        "company_info_name": "Auth-Checker"
      }
    });

    console.log("Welcome Email sent Successfully" , response);
  }
  catch(error){
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email : ${error}`);
  }
}


export const sendPasswordResetEmail = async(email , resetURL) => {
  const recipient = [{email}];

  try{
    const response = await mailtrapclient.send({
      from:sender,
      to:recipient,
      subject : "Reset your Password",
      html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
      category : "Password Reset",
    })
  }
  catch(error){
    console.error(`Error sending password reset email` , error);
    throw new Error(`Error sending password reset email : ${error}`);
  }
}


export const sendResetSuccessEmail = async(email) => {
  const recipient = [{email}];

  try{
    const response = await mailtrapclient.send({
      from : sender,
      to : recipient,
      subject : "Password Reset Successfully",
      html : PASSWORD_RESET_SUCCESS_TEMPLATE,
      category : "Password Reset",
    })
  }
  catch(error){
    console.error(`Error sending Password reset success email` , error);
    throw new Error(`Error sending password reset success email: ${error}`);

  }
}