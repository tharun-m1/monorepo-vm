import prismaClient from "@repo/db/client"


export default async function Home() {
  const users = await prismaClient.user.findMany()
  return (
    <>
    {users.map((user) => <div key={user.id} style={{margin:"5px"}}>{user.username}</div>)}
    </>
  );
}
