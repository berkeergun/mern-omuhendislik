import UserModal from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModal.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({ message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModal.findById(id);

    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Böyle bir kullanıcı bulunmamaktadır" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await UserModal.findByIdAndRemove(id);

    return res
      .status(200)
      .json({ success: true, message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Bir şeyler ters gitti" });
    // console.log(error);
  }
};

export const getBlockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModal.findById(id);

    

    await UserModal.updateOne({ _id: user._id }, { blocked: !user.blocked });
    await user.save();

    // console.log(req.session);
    if (user?.blocked === false) {
       return res
        .status(200)
        .json({ success: true, message: "Kullanıcı başarıyla engellendi", data: user.name });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Kullanıcının engeli kaldırıldı", data: user.name });
    }

    // console.log(req.session);
    // console.log(user.blocked);
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Bir şeyler ters gitti", error: error });
  }
};

export const getUserBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const name = new RegExp(searchQuery, "i");

    const user = await UserModal.find({ name: name });
    

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Bir şeyler ters gitti" });

    // console.log(error);
  }
};
