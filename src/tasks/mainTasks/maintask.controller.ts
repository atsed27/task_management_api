import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { mainTaskService } from './maintask.service';
import { CreateMainTaskDto } from './dto/create.dto';
import { CreateCardDto } from './dto/createCard.dto';

@ApiTags('mainTask')
@Controller('main')
export class mainTaskController {
  constructor(private readonly mainTaskService: mainTaskService) {}

  @Get('task')
  findAll() {
    return this.mainTaskService.findAll();
  }
  //Get All Card/list
  @Get('card/:id')
  findAllCard(@Param() id: any) {
    return this.mainTaskService.findAllCard(id);
  }
  @Get()
  findOne(@Param() id: string) {
    return this.mainTaskService.findOne(id);
  }
  @Post('task')
  create(@Body() createMainTask: CreateMainTaskDto) {
    return this.mainTaskService.create(createMainTask);
  }

  //create card
  @Post('card')
  createCard(@Body() createCard: CreateCardDto) {
    return this.mainTaskService.createCard(createCard);
  }
}
