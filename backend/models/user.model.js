const mongoose = require("mongoose");
const { isEmail } = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 8,
    },
    role: {
      type: String,
    },
    picture: {
      type: String,
      default: "img/profile.png",
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//Fonction de salage avant la sauvegarde du compte
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Mot de passe incorrect");
  }
  throw Error("Email incorrect");
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
