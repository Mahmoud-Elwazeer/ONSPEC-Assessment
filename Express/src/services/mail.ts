import nodemailer from 'nodemailer';
import 'dotenv/config';
import ApiError from '../utils/apiError';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


export const sendMail = async(mailOptions: any) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new ApiError('Failed to send mail', 500)
    }
}