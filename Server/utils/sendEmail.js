import transporter from "../config/nodeMailer";

const sendEmail=async (to,subject, text, html)=>{
    try {
        await transporter.sendMail({
            from:`<${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email sending failed", error);
    }


};

export default sendEmail;