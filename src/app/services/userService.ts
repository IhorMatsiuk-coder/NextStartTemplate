import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserDto from '@/app/dtos/user-dto';
import ApiError from '@/app/exceptions/api-errors';
import UserModel from '@/app/models/user-model';
import mailService from '@/app/services/mailService';
import tokenService from '@/app/services/tokenService';

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email: ${email} already exist`);
    }

    const activationLink = uuidv4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await UserModel.create({ email, password: hashPassword, activationLink });
    newUser.userRole = 1;
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: newUser };
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Activation link is not correct!');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest(`User with email: ${email} is not find`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Invalid password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  isAuth(accessToken: string) {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw ApiError.UnauthorizedError();
    }

    return userData;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData: any = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users.map((user) => new UserDto(user));
  }

  async removeUser(userId: string) {
    await UserModel.deleteOne({ _id: userId });
  }

  async updateUserRole(userId: string, userRole: number) {
    const updatedUser = await UserModel.findOne({ _id: userId });

    if (!updatedUser) {
      throw ApiError.BadRequest('Update user role is not successfully');
    }
    updatedUser.userRole = userRole;
    await updatedUser.save();

    return new UserDto(updatedUser);
  }
}

const userService = new UserService();
export default userService;
