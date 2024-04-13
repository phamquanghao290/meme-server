import { Body, Controller, HttpCode, HttpException, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

@Controller('api')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() user) {
        const data = await this.authService.login(user);
        return {
            message: 'Login success',
            ...data
        }
    }

    @Post('/register')
    @HttpCode(201)
    async register(@Body() user) {
        console.log(user);
        const { email } = user;
        const check = await this.userService.getOneUserByEmail(email);
        if (check) {
            throw new HttpException('Email Đã tồn tại', 400);
        }
        return await this.authService.register(user);
    }
}