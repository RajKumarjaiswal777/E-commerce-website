import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
 


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor( private prisma:PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SECRET_KEY'
        })        
    }

    async validate(payload: {sub: number , email: string}) {
      
       const userId = payload.sub
        
        const user = await this.prisma.user.findUnique({
             
                where: { id: userId },
             
        })
        delete user.password
        return user; // Whatever i will share from here it give into the req {req.user} object in auth controller api
    }

}