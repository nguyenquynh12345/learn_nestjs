import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    userName: string;

    @IsString()
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;
}
