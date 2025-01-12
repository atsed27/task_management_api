import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @ApiProperty({
    description: 'create docke file',
    title: 'Docker',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description of task',
    example: 'test decritption',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'take task uuid',
    example: 'ed12jd23q23235',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  task_id: string;
  @ApiProperty({
    description: 'upload file or  image',
    required: false,
  })
  @IsString()
  @IsOptional()
  files?: string;

  @ApiProperty({
    description: 'task status',
    example: 'Pending',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;
}
