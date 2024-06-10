import React from "react";
import { cookies } from "next/headers";
import { db } from "@/db_connection";
import { user } from "@/schema";


export default  async function Page() {
  const token = cookies().get("session")?.value
  let username = null

  if (token) {
    const user = await db.query.session.findFirst({
      where: ((session, {eq}) => eq(session.token, token)
      ),
      with: {
        user: true
      }
    })
    username = user?.user
  }
  return (
    <>
      <div className="text-3xl font-bold flex items-center justify-center">
        Hello from the landing page
      </div>
      <section>{username}</section>
    </>
  );
}
