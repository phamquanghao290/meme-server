import { UserService } from './../user/user.service';
import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    constructor(private userService: UserService , private jwtService: JwtService, ) {}

    async register(user): Promise<any> {
        const check = await this.userService.getOneUserByEmail(user.email);
        if (check) {
            return {
                status: 400,
                message: 'Email already exists'
            }
        }
        const hashPassword = await argon2.hash(user.password);
        const newUser = {
            ...user,
            password: hashPassword
        }
        return await this.userService.create(newUser);
    }

    async login(user): Promise<any> {
        const check = await this.userService.getOneUserByEmail(user.email);
        if(!check) {
            return {
                status: 400,
                message: 'Email không tồn tại'
            }
        }
        const checkPassword = await argon2.verify(check.password, user.password);
        if(!checkPassword) {
            throw new UnauthorizedException('mật khẩu không đúng');
        }
        return {
            token: await this.generateToken({
                email: check.email,
                id: check.id
            }),
            user: check,
            access_token: await this.generateAccessToken({
                email: check.email,
                id: check.id
            })
        }
    }

    async generateToken(payload) {
        return this.jwtService.signAsync(payload, { expiresIn: '1d', secret: 'token' });
    }
    async generateAccessToken(payload) {
        return this.jwtService.signAsync(payload, { expiresIn: '1d', secret: 'access - token' });
    }

}