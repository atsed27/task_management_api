import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSubtaskDto } from './create-subTask.dto';

export class UpdateTaskDto extends PartialType(CreateSubtaskDto) {
  @ApiProperty({
    description: 'Title of the task',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    required: false,
    example: 'Pending',
  })
  status?: string;
  @ApiProperty({
    description: 'take task uuid',
    example: 'ed12jd23q23235',
    required: true,
  })
  task_id: string;
}
