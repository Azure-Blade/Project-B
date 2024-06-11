'use server';
import React from 'react';
import { cookies } from 'next/headers';
import { db, schema } from '@/db_connection';

export default async function Page() {
  const token = cookies().get('session')?.value;
  let username: string | null = null;

  if (token) {
    // const result = await db
    //   .select()
    //   .from(schema.user)
    //   .innerJoin(schema.session, eq(schema.user.id, schema.session.userId))
    //   .where(eq(schema.session.token, token));
    const result = await db.query.session.findFirst({
      where: (session, { eq }) => eq(session.token, token),
      with: {
        user: true
      }
    });
    username = result?.user.username ?? null;
  }

  return (
    <>
      <div className='flex items-center justify-center text-3xl font-bold'>
        Hello from the landing page
      </div>
      {username && <section>You are currently logged in as {username}</section>}
    </>
  );
}
