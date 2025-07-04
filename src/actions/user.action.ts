"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId : string){
  return prisma.user.findUnique({
    where: {clerkId : clerkId},
    include : {
      _count : {
        select : {
          followers: true,
          following: true,
          posts: true,
        }
      }
    }
  })

}

export async function getDbUserId(){
  const {userId : clerkId} = await auth();
  if (!clerkId) throw new Error("Unauthenticated User");

  const user = await getUserByClerkId(clerkId);
  if(!user) throw new Error("User Not Found");

  return user.id
}

export async function getRandomUsers(){
  try{
    const userId = await getDbUserId();

    //get 3 random user excluding the user himself and whoever he already follows

    const randomUsers = await prisma.user.findMany({
      where :{
        AND: [
          {NOT: {id: userId}}, 
          {
            NOT: {
              followers:{
                some:{
                  followerId: userId
                }
              }
            }
          }
        ]
      },
      select:{
        id: true,
        name: true,
        username: true,
        image: true,
        _count:{
          select:{
            followers: true,
          }
        }
      },
      take: 3,
    })

    return randomUsers
  }catch(error){
    console.error("Error", error)
    return []
  }
}