import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMainTaskDto {
  @ApiProperty({
    description: 'create main Task title',
    title: 'Task',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}
