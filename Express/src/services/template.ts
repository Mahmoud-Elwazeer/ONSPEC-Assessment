import ejs from 'ejs'
import 'dotenv/config';
import path from 'path';
import fs from "fs";
import 'dotenv/config';


export const candidateApplicationTemplate = (firstName: String, email: String) => {
    const template = fs.readFileSync(path.resolve(process.cwd(), 'src/emailTemplates/candidateApplication.ejs'), 'utf-8');
    const data = {
        name: firstName,
        message: "We Have Received Your Application.",
        userEmail: email,
        supportEmail: process.env.SUPPORT_EMAIL,
    }
    return {
        from: `ONSPEC <${process.env.GOOGLE_MAIL}>`,
        to: [email],
        subject: "We Have Received Your Application",
        html: ejs.render(template, data)
    };
}