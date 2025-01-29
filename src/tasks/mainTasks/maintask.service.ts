import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzel/drizzle.module';
import { CreateMainTaskDto } from './dto/create.dto';
import { card, mainTask, task } from 'src/drizzel/schema/task.schema';
import { and, eq, sql } from 'drizzle-orm';
import { CreateCardDto } from './dto/createCard.dto';

@Injectable()
export class mainTaskService {
  constructor(@Inject(DRIZZLE) private readonly db) {}

  async findAll() {
    return this.db.select().from(mainTask);
  }
  async findAllCard(id: any) {
    const Id = id.id;
    return this.db
      .select({
        id: card.id,
        title: card.card,
        tasks: sql`coalesce(jsonb_agg(
        case 
          when ${task.id} is not null then jsonb_build_object(
            'id', ${task.id},
            'title', ${task.title},
            'description',${task.description},
            'status',${task.status}
          )
          else null
        end
      ), '[]'::jsonb)`,
      })
      .from(card)
      .leftJoin(task, eq(task.card_id, card.id))
      .where(eq(card.mainTask_id, Id))
      .groupBy(card.id)
      .orderBy(card.created_at, 'asc');
  }

  async findOne(id: string) {
    const result = await this.db
      .select()
      .from(mainTask)
      .where(eq(mainTask.id, id));
    if (!result.length) {
      throw new NotFoundException(` Main Task with ID ${id} not found.`);
    }
    return result[0];
  }
  async create(mainTaskCreate: CreateMainTaskDto) {
    try {
      console.log(mainTaskCreate);
      const result = await this.db.insert(mainTask).values(mainTaskCreate);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create Main Taks . Please try again later.',
      );
    }
  }

  async createCard(createCard: CreateCardDto) {
    //find Card
    const findCard = await this.db
      .select()
      .from(card)
      .where(
        and(
          eq(card.card, createCard.card),
          eq(card.mainTask_id, createCard.mainTask_id),
        ),
      );
    if (findCard.length > 0)
      throw new ForbiddenException('Card Name Is Aleardy Taken');
    const result = await this.db.insert(card).values(createCard);
    return result;
  }
}
