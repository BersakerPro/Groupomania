//REQUIRE
const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

//CHANGER PHOTO DE PROFIL
module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    ) {
      console.log(req.file);
      throw Error("invalid file");
    }
    if (req.file.size > 500000) {
      throw Error("max size");
    }
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const filename = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../../frontend/public/img/${filename}`)
  );
  console.log(__dirname);
  console.log(req.file.stream);

  try {
    await UserModel.findByIdAndUpdate(
      req.body.name,
      {
        $set: { picture: `${__dirname}/../../frontend/public/img/` + filename },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => {
        console.log("success");
        return res.send(data);
      })
      .catch((err) => res.status(401).send(err));
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};
