import prismaClient from "@repo/db/client"


export default async function Home() {
  const users = await prismaClient.user.findMany()
  return (
    <div>
    {users.map((user: any) => <div key={user.id} style={{margin:"5px"}}>{user.username}</div>)}
    </div>
  );
}
