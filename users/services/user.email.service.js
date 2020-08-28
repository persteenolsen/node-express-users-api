
const express = require('express');

const nodemailer = require('nodemailer');
const configsmtp = require('../../smtp/config.json');


class UserEmailService {
  
  
  sendPasswordResetEmailUser( origin, resetToken, emailto ){
         
    let forgotpasswordpromise = new Promise(( resolve, reject ) => {
              
        let htmlbody = "<h3>Reset your Password in the Membership System before 24 hours</h3>";
       
        let message = "";
        if (origin) {
             const resetUrl = origin + "/account/reset-password?token=" + resetToken;
             message += "<p>Please click the below link to reset your Password:</p>";
             message += "<p><a href='" + resetUrl + "'>" + resetUrl + "</a></p>";
        } else {
             message += "<p>Please use the below token to reset your Password with the <code>/account/reset-password</code> api route:</p>";
             message += "<p><code>" + resetToken + "</code></p>";
        }       
         
        htmlbody += message; 
        htmlbody += "<p><b>Do not reply to this Email !</b></p>";
        htmlbody += "<p>Best regards from the Membership System :-)</p>";
        
        var mailOptions = {
               from: configsmtp.emailFrom,
               to: emailto,
               subject: "Reset your Password in the Membership System",
               html: htmlbody
            
            };
      
        
           const transporter = nodemailer.createTransport( configsmtp.smtpOptions );
    
           transporter.sendMail( mailOptions, function( error, info ){
        
               if ( error ) {
                   console.log( error );
                   reject( false );
                  }
                else {
                   console.log('Email sent - Forgot Password: ' + info.response );
                   resolve( true );
                 }
        
              });
       });
         
       console.log( "Leaving Forgot Password Email - Outside the Promise in Service !" );
       return forgotpasswordpromise;
        
    }

   
  SendVerifyEmailRegisterUser( origin, verificationToken, emailto ){
         
    let sendemailpromise = new Promise(( resolve, reject ) => {
              
        let htmlbody = "<h3>Thank you for register at the Membership System</h3>";
       
        let message = "";
        if (origin) {
             const verifyUrl = origin + "/account/verify-email?token=" + verificationToken;
             message += "<p>Please click the below link to verify your email address:</p>";
             message += "<p><a href='" + verifyUrl + "'>" + verifyUrl + "</a></p>";
        } else {
             message += "<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>";
             message += "<p><code>" + verificationToken + "</code></p>";
        }       
         
        htmlbody += message; 
        htmlbody += "<p><b>Do not reply to this Email !</b></p>";
        htmlbody += "<p>Best regards from the Membership System :-)</p>";
        
        var mailOptions = {
               from: configsmtp.emailFrom,
               to: emailto,
               subject: "Thank you for register at the Membership System",
               html: htmlbody
            
            };
      
        
           const transporter = nodemailer.createTransport( configsmtp.smtpOptions );
    
           transporter.sendMail( mailOptions, function( error, info ){
        
               if ( error ) {
                   console.log( error );
                   reject( false );
                  }
                else {
                   console.log('Email sent: ' + info.response );
                   resolve( true );
                 }
        
              });
       });
         
       console.log( "Leaving Send Verification Email - Outside the Promise in Service !" );
       return sendemailpromise;
        
    }

     



          
    }

    module.exports = UserEmailService;

