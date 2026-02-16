import nodemailer from "nodemailer";

export const sendQueryMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,   
        pass: process.env.EMAIL_PASS    
      }
    });
 
    await transporter.sendMail({
      from: `"Coding Zone Query" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // email where you want queries
      subject: "New Query from Coding Zone",
      html: `
        <h3>New Query Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    }); 

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Mail failed" });
  }
}; 