import { Injectable } from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDTO) {
    // 校验密码和确认密码
    await this.userService.checkRegisterForm(registerDto);
    const { nickName, password, username, email } = registerDto;
    // 生成盐
    const salt = makeSalt();
    // 密码加密
    const hashPassword = encryptPassword(password, salt);
    const newUser: User = new User();
    newUser.nickName = nickName;
    newUser.email = email;
    newUser.password = hashPassword;
    newUser.salt = salt;
    newUser.username = username;
    const result = await this.userService.addUser(newUser);
    return result;
  }

  //   生成token
  async certificate(user: User) {
    const payload = {
      userId: user.userId,
      nickName: user.nickName,
      username: user.username,
    };
    const token = this.jwtService.signAsync(payload);
    return token;
  }

  async login(loginDto: LoginDTO) {
    const user = await this.userService.checkLoginForm(loginDto);
    const token = await this.certificate(user);
    const userInfo = await this.userService.findUserByName(loginDto.username);

    return {
      userInfo,
      token,
    };
  }

  // 验证token
  async verifyToken(token: string) {
    try {
      const result = await this.jwtService.verifyAsync(token);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}
