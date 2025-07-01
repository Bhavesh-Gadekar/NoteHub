import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const forgotpassword = (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.json("No user Found with this Email in Record");
            }
            const token = jwt.sign({ id:user._id }, process.env.SECRET, { expiresIn: '10m' });
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GOOGLE_APP_EMAIL,
                    pass: process.env.GOOGLE_APP_PASSWORD,
                },
            });
            (async () => {
                const info = await transporter.sendMail({
                    from: process.env.GOOGLE_APP_EMAIL,
                    to: user.email,
                    subject: "Reset Password",
                    text: `Click this link to reset your password: http://localhost:5173/resetpassword/${user._id}/${token}`,
                    html: `
                            <p>Hi ${user.name || ''},</p>
                            <p>Click below to reset your password:</p>
                            <a href="http://localhost:5173/resetpassword/${user._id}/${token}">
                            Reset Password</a>
                            <p>This link expires in 1 hour.</p>
                        `,
                });

                console.log("Message sent:", info.messageId);
                res.json("success")
            })();

        })
        .catch(err => {
            res.json("Error sending Email !!");
            console.log(err);
        })
}

export default forgotpassword;