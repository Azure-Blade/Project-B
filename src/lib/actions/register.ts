'use server';
import { db } from '@/db_connection';
import { user } from '@/schema';
import z from 'zod';

const validator = z.object({
  email: z.string().email(),
  username: z.string().min(6),
  password: z.string().min(6)
});

export async function register(formData: FormData) {
  const data = {};
  for (const [key, val] of formData.entries())
    Object.assign(data, { [key]: val });

  console.log(data);
  const result = await validator.safeParseAsync(data);

  if (!result.success) {
    console.log('Your input data is incorrect');
    return;
  }

  const insertResult = await db.insert(user).values(result.data);
  console.log(
    `Created a new user in the database with an id of ${insertResult[0].insertId}`
  );
}
