import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { LoginDTO } from './dto/login.dto';
import { UpdateUserDTO } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 注册校验
  async checkRegisterForm(registerDto: RegisterDTO): Promise<any> {
    if (registerDto.password !== registerDto.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致，请检查');
    }
    const { username, email } = registerDto;
    const hasUser = await this.userRepository.findOneBy({ username });
    const hasEmail = await this.userRepository.findOneBy({ email });
    if (hasUser || hasEmail) {
      throw new NotFoundException('用户或邮箱已存在');
    }
  }

  //   登录校验用户信息
  async checkLoginForm(loginDto: LoginDTO): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }
    return user;
  }

  async findUserByName(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserById(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ userId });
  }
  // 添加用户
  async addUser(newUser: User) {
    const result = await this.userRepository.save(newUser);
    delete result.password;
    delete result.salt;
    return result;
  }

  // 查找所有用户
  async findAll() {
    return await this.userRepository.find();
  }

  async updateUser(updateUserDto: UpdateUserDTO, userInfo) {
    const { userId } = updateUserDto;
    if (userInfo.userId !== userId) {
      throw new ForbiddenException('非当前用户，无法执行更新操作！');
    }
    const user = await this.userRepository.findOneBy({ userId });
    user.introduction = updateUserDto.introduction;
    user.city = updateUserDto.city;
    user.nickName = updateUserDto.nickName;
    await this.userRepository.save(user);
    return '修改成功！';
  }
}
