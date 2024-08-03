import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/auth/guard';
import { Request, Response } from 'express';
import { UserGuard } from './guard/auth.guard';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  // @UseGuards(JwtGuard)
  async signin(@Body() dto:LoginDto ){
  const result = await this.authService.login(dto)
  console.log(result)

  return {
    status: true,
    message: 'User successfully Logged',
    data: {result}
  }
  // return res.status(HttpStatus.OK).json({
  //     success: true,
  //     message: 'User is created',
  //     error: {},
  //     data: result,
  // });
 }

 @Post('signup')
 async signup(@Body() dto: AuthDto , @Res() res: Response){
 const result =  await this.authService.signUp(dto)
 console.log('result' , result)
 return res.status(HttpStatus.CREATED).json({
     success: true,
     message: 'User Signup Successfully',
     error: {},
     data: result,
 });
}



 @Get('getUser/:id')
 @UseGuards(JwtGuard , new UserGuard)
 async getUserDetails(@Param('id') id:number , @Req() req: Request ) {
    //  const result = await this.authService.getUser(id);
     return {
         status: true,
         msg: "Request Successfully Completed",
         error: id,
        //  data: result,
     }
 }

}
