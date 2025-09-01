import { Button } from "@/components/ui/button";
import { auth } from "@/lib/next-auth";

export default async function Home() {
  const session = await auth();

  console.log("session", session);

  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
