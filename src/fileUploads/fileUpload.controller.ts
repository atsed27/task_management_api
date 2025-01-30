import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './fileUpload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: UploadFileDto,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!file) {
      throw new NotFoundException('No file uploaded!');
    }
    return this.fileUploadService.uploadFile(file, id);
  }

  //get file by task
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(id);
  }
}
