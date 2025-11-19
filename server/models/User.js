const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for user
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Trước khi save dữ liệu user này vào MongoDB thì chạy đoạn code này trước đã.
UserSchema.pre("save", async function (next) {
  // Kiểm tra xem password có bị thay đổi hay không ?
  // Neus không kiểm tra thì code sẽ lấy cái mật khẩu đã được mã hóa trong DB đem đi... mã hóa thêm một lần nữa ==> mật khẩu bị sai và người dùng không đăng nhập được.
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
