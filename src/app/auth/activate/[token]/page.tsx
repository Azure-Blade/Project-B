import { db } from "@/db_connection";
import * as schema from "@/schema";

type Props = {
  params: {
    token: string;
  };
};

export default async function Page(props: Props) {
  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.activationToken, props.params.token),
  });

  if (!user) {
    return (
      <section>
        <h1>User activation token does not exist</h1>
      </section>
    );
  }

  await db.update(schema.user).set({
    activationToken: null,
    verified: true,
  });

  return (
    <section>
      <h1>Your account has been activated</h1>
    </section>
  );
}
