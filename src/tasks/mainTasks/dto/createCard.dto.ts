import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'create Card',
    title: 'card',
  })
  @IsNotEmpty()
  @IsString()
  card: string;

  @ApiProperty({
    description: 'id of Main Task',
    title: 'id',
  })
  @IsNotEmpty()
  @IsString()
  mainTask_id: string;
}
