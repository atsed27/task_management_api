import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzel/drizzle.module';
import { subTask, task } from 'src/drizzel/schema/task.schema';
import { eq } from 'drizzle-orm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateSubtaskDto } from './dto/create-subTask.dto';
import { UpdateSubTaskDto } from './dto/update-subTask.dto';

@Injectable()
export class taskService {
  constructor(@Inject(DRIZZLE) private readonly db) {}

  async findAll() {
    return this.db.select().from(task);
  }

  async findOne(id: string) {
    const result = await this.db.select().from(task).where(eq(task.id, id));
    if (!result.length) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return result;
  }

  async findAllSubTask() {
    return this.db.select().from(subTask);
  }

  async findOneSubtask(id: string) {
    const result = await this.db
      .select()
      .from(subTask)
      .where(eq(subTask.id, id));
    if (!result.length) {
      throw new NotFoundException(`Subtask with ID ${id} not found.`);
    }
    return result[0];
  }

  async create(taskCreate: CreateTaskDto, id: string, userId: string) {
    try {
      const result = await this.db
        .insert(task)
        .values({ ...taskCreate, user_id: userId, card_id: id });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create task. Please try again later.',
      );
    }
  }

  async createSubTask(subTaskCreate: CreateSubtaskDto) {
    try {
      const result = await this.db.insert(subTask).values(subTaskCreate);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create subtask. Please try again later.',
      );
    }
  }

  async updateTask(id: string, updateTask: UpdateTaskDto) {
    const result = await this.db
      .update(task)
      .set(updateTask)
      .where(eq(task.id, id));
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return result;
  }

  async updateSubTask(id: string, updateSubTask: UpdateSubTaskDto) {
    const result = await this.db
      .update(subTask)
      .set(updateSubTask)
      .where(eq(subTask.id, id));
    if (!result) {
      throw new NotFoundException(`Subtask with ID ${id} not found.`);
    }
    return result;
  }

  async removeTask(id: string) {
    const deleteResult = await this.db.delete(task).where(eq(task.id, id));
    if (deleteResult === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return { message: `Task with ID ${id} deleted successfully.` };
  }

  async removeSubTask(id: string) {
    const deleteResult = await this.db
      .delete(subTask)
      .where(eq(subTask.id, id));
    if (deleteResult === 0) {
      throw new NotFoundException(`Subtask with ID ${id} not found.`);
    }
    return { message: `Subtask with ID ${id} deleted successfully.` };
  }
}
