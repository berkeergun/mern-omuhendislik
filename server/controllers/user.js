import bcrypt from "bcryptjs";
import UserModal from "../models/user.js";
import { sendEmail } from "../helpers/library/sendEmail.js";

import "dotenv/config";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "Böyle bir kullanıcı bulunmamaktadır" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Geçersiz işlem" });
    }

    if(oldUser.blocked) {
      return res.status(400).json({ message: "Erişiminiz engellendi" });
    }



    sendTokenToClient(oldUser, res, 200);

    
  
    
  } catch (error) {
    res.status(500).json({ message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

export const getLoggedInUser = async(req, res) => {
  const user = await UserModal.findById(req.userId);

  return res
  .status(200)
  .json({success: true, result: user});
}


// export const signout = async(req, res) => {
// }

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    let oldUser = await UserModal.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "Böyle bir kullanıcı zaten bulunmaktadır" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    oldUser =await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    sendTokenToClient(oldUser, res, 201);
  } catch (error) {
    res.status(500).json({ message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

// export const googleSignIn = async (req, res) => {
//   const { email, name, token, googleId } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });
//     if (oldUser) {
//       const result = { _id: oldUser._id.toString(), email, name };
//       return res.status(200).json({ result, token });
//     }

//     const result = await UserModal.create({
//       email,
//       name,
//       googleId,
//     });
//     res.status(200).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong!" });
//     console.log(error);
//   }
// };

// -----  ---   - - - - - -     - - - --  - - - - -- - - - -- - - -

export const resetLoggedInUserPassword = async (req, res) => {
  const { password, newPassword, confirmNewPassword } = req.body;
  const id = req.userId;

  // console.log(password + " " + newPassword + " " + confirmNewPassword);

  try {
    let user = await UserModal.findById(id);

    if (bcrypt.compareSync(password, user.password)) {
      if (password === newPassword) {
        return res
          .status(400)
          .json({
            message:
              "Lütfen mevcut şifrenizden farklı bir şifre giriniz",
          });
      } else {
        if (newPassword === confirmNewPassword) {
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          user.password = hashedPassword;
        } else {
          return res
            .status(400)
            .json({ message: "Lütfen yeni şifrenizi doğrulayınız" });
        }
      }
    } else {
      return res.status(400).json({ message: "Şifreniz yanlış" });
    }

    await user.save();

    res.status(200).json({ message: "Şifre başarıyla değiştirildi" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

// -  --  - - - - - - - - - --  - - - - - --  -   - - --  - - - --  - - -   --  - -

export const forgotPassword = async (req, res) => {
  const { resetEmail } = req.body;

  const user = await UserModal.findOne({ email: resetEmail });

  // console.log(resetEmail + " " + " AAAAAAAAA");
  // console.log(user + " " + " BBBBBBBBBBB");

  if (!user) {
    // res.status(404).json({ message: "There is no user with that email" });
    return res
      .status(404)
      .json({ message: "Bu email ile bir kullanıcı bulunmamaktadır" });
  }

  const resetPasswordToken = user.getResetPasswordToken();

  // console.log(resetPasswordToken + " " + " CCCCCCCCCCCC");

  await user.save();

  // const resetPasswordUrl = `http://localhost:5000/users/resetPassword?resetPasswordToken=${resetPasswordToken}`;
  // const resetPasswordUrl = `http://localhost:3000/resetPassword?resetPasswordToken=${resetPasswordToken}`;
  const resetPasswordUrl = `http://localhost:3000/forgotResetPassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
  <div
      style="
        background-color: #2c5364;
        width: 100%;
        height: 200px;
        font-family: 'Nunito Sans', sans-serif;
        box-shadow: 2px 5px 1px 1px #00000040;
        border-radius: 8px;
      "
    >
      <h1 style="color: #fefefe;text-align: center;padding: 30px;">OMÜHENDİSLİK</h1>
      <div style="text-align:center;">
        <a href="${resetPasswordUrl}" target="_blank"  style="background-color: #fefefe;padding: 10px;margin: 10px;border-radius: 8px;text-decoration: none;color: #2c5364;font-weight: bold;box-shadow: 2px 5px 1px 1px #00000040;text-align: center;" >Şifreni Yenile</a>
      </div>

    </div>`;
  // const emailTemplate = `
  //       <h3>Reset Your Password</h3>
  //       <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
        
  //   `;

  try {
    // await sendMail({
    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: resetEmail,
      subject: "Reset Password Token",
      html: emailTemplate,
    });

    // return res.redirect('http://localhost:3000/forgotResetPassword');
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // console.log(error);

    user.save();

    res.status(500).json({ message: "Mail gönderilemedi" });
  }
};

//--/-/-//-/--/-/-/-/-/////////////////////////////////////

export const resetPassword = async (req, res) => {
  const { resetPasswordToken } = req.query;
  const { password, confirmPassword } = req.body;

  // console.log(resetPasswordToken + "AAAAa");
  // console.log(" ");
  // console.log(password + "BBB");
  // console.log(confirmPassword + "DDD");

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Lütfen yeni şifrenizi doğrulayınız" });
  }

  if (!resetPasswordToken) {
    return res.status(400).json({ message: "Lütfen geçerli bir değer giriniz" });
  }
  // console.log(resetPasswordToken);

  let user = await UserModal.findOne({
    resetPasswordExpire: { $lt: Date.now() },
    resetPasswordToken,
  });

  const hashedPassword = await bcrypt.hash(password, 12);

  // console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Lütfen geçerli bir işlem gerçekleştiriniz" });
  }

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;



  user = await user.save();

  sendTokenToClient(user, res, 200);
};


export const sendTokenToClient =  (user,res,status) => {

  // Get Token From User Model
  const token =  user.getTokenFromUserModel();

  const expire = process.env.JWT_COOKIE_EXPIRE;
  const nodeEnv = process.env.NODE_ENV;
  // Send To Client With Res
  
  res.cookie("token",token, {
    httpOnly : true,
    expires : new Date(Date.now() +  parseInt(expire) * 1000 * 60),
    secure : nodeEnv === "development" ? false : true
  })

  return res
  .status(status)
  .json({
      success : true,
      token,
      result : {
          _id: user._id,
          name : user.name,
          email : user.email,
          role : user.role,
          blocked: user.blocked
      }
  });
  

}