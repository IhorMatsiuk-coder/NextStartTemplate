import jwt from 'jsonwebtoken';

import tokenModel from '@/app/models/token-model';

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY as jwt.Secret, {
      expiresIn: '1d',
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY as jwt.Secret, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY as jwt.Secret);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY as jwt.Secret);
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    return await tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

const tokenService = new TokenService();
export default tokenService;
