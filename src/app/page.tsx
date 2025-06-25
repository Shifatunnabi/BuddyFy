import CreatePost from "@/components/CreatePost";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {

  const user = await currentUser()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">        
        {user? <CreatePost /> : null}                  {/*if user is authenticated then can see this */}
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        Suggested User
      </div>
    </div>

  );
}
