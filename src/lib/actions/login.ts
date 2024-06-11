'use server';
import { db } from '@/db_connection';
import { redirect } from 'next/navigation';
import z from 'zod';
import crypto from 'node:crypto';
import { session } from '@/schema';
import { cookies } from 'next/headers';

const validator = z.object({
  username: z.string().min(6),
  password: z.string().min(6)
});

type Result = Promise<{
  message: string;
}>;

export async function login(prevState: any, formData: FormData) {
  const data = {};

  for (const [key, val] of formData.entries())
    Object.assign(data, { [key]: val });

  const result = await validator.safeParseAsync(data);

  if (!result.success) {
    console.log('Your input data is incorrect!');
    return {
      message: 'Your input data is incorrect!'
    };
  }

  const user = await db.query.user.findFirst({
    where: (user, { eq, and }) =>
      and(
        eq(user.username, result.data.username),
        eq(user.password, result.data.password)
      )
  });

  if (!user) {
    return {
      message: 'Invalid username or password!'
    };
  }

  if (!user.verified) {
    return {
      message: 'Your account has not been activated, check your email'
    };
  }

  const token = crypto.randomBytes(32).toString('hex');
  await db.insert(session).values({
    token,
    userId: user.id
  });

  const now = new Date().getTime();
  const expires = now + 1000 * 30 * 60;
  cookies().set('session', token, { expires });

  redirect('/');
}
