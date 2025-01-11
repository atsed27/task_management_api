import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzel/drizzle.module';
import { user } from 'src/drizzel/schema/task.schema';
import { CreateUserDto } from './dto/create.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class userService {
  constructor(@Inject(DRIZZLE) private readonly db) {}

  async findAll() {
    const result = await this.db.select().from(user);
    return result;
  }
  async create(userCreate: CreateUserDto) {
    //find user
    const find_user = await this.db
      .select()
      .from(user)
      .where(eq(user.user_name, userCreate.user_name));

    if (find_user.length > 0)
      throw new ForbiddenException('user is already exist');
    const result = await this.db.insert(user).values(userCreate);
    return result;
  }
}
