import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

interface AuthenticationForm {
  fullName?: string;
  email: string;
  password: string;
}

class UserService {
  async login(data: AuthenticationForm) {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      return { user, token: null };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { user: null, token: null };
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "24h",
    });

    return { user, token };
  }

  async register(data: AuthenticationForm) {
    const { fullName, email, password } = data;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();

    return newUser;
  }
}

export default new UserService();
