import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private clubService: ClubsService) {}

  @Post()
  createClubs() {
    return this.clubService.createCubs();
  }

  // apply to a club
  @UseGuards(AuthGuard('jwt'))
  @Post('/:clubId')
  applyClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Request() req: any,
  ) {
    return this.clubService.applyClub(clubId, req.user.id);
  }

  // list out clubs that the user has applied to
  @UseGuards(AuthGuard('jwt'))
  @Get('/applied')
  getAppliedClubs(@Request() req: any) {
    return this.clubService.getAppliedClubs(req.user.id);
  }

  // get list of clubs that the user has NOT applied to
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Request() req: any) {
    return this.clubService.getAll(req.user.id);
  }

  // get details of the club
  @UseGuards(AuthGuard('jwt'))
  @Get('/:clubId')
  getDetails(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Request() req: any,
  ) {
    return this.clubService.getDetails(clubId, req.user.id);
  }
}
