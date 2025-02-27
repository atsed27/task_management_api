import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzel/drizzle.module';
import { file } from 'src/drizzel/schema/task.schema';
import { Readable } from 'stream';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinary,
    @Inject(DRIZZLE) private readonly db,
  ) {}

  async uploadFile(
    files: Express.Multer.File,
    id: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'uploads/documents',
        },
        async (error, result) => {
          if (error) return reject(error);

          //upload url to database
          await this.db.insert(file).values({
            file_url: result?.url,
            task_id: id,
          });
          resolve(result);
        },
      );

      Readable.from(files.buffer).pipe(uploadStream);
    });
  }

  async findOne(id: string) {
    const result = await this.db
      .select()
      .from(file)
      .where(eq(file.task_id, id));

    return result;
  }
}
