import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/modules/user/user.service";

interface JwtPayload {
    id: string;
    email: string;
}

@Injectable()// Analizar os dados e gerar o token
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "segredo_shiiiu",
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.userService.findOne(payload.id);
        if (!user) {
            throw new UnauthorizedException('Token inválido');
        }
        return user;
    }
}       