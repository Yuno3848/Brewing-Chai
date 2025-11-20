import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ senderEmail, subject, text, html }) => {
  const msg = {
    to: senderEmail,
    from: process.env.SENDGRID_FROM,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully to', senderEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
export default sendMail
