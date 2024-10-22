"use server";
import { db } from "@/lib/db";
import { IStock } from "./stock";
import { auth } from "@clerk/nextjs/server";

export interface IPost {
  id: number;
  content: string;
  title: string;
  imageUrl: string;
  stockId: number;
  simulationDay: number;
  stock: IStock;
}

async function getPosts(): Promise<IPost[] | null> {
  try {
    const posts = await db.posts.findMany({
      include: {
        stock: true, // Include related Stock information
      },
    });
    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getLatestPosts(): Promise<IPost[] | null> {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    const userSimulation = await db.simulation.findUnique({
      where: {
        userId,
      },
      select: {
        currentDay: true, // Select only the current simulation day
      },
    });
    if (!userSimulation) {
      throw new Error("Simulation not found for the user");
    }

    const latestPosts = await db.posts.findMany({
      where: {
        simulationDay: {
          lt: userSimulation.currentDay,
        },
      },
      include: {
        stock: true, // Include related Stock information
      },
      orderBy: {
        simulationDay: "desc",
      },
      take: 3,
    });
    return latestPosts;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getPostById(postId: number): Promise<IPost | null> {
  try {
    const post = await db.posts.findUnique({
      where: {
        id: postId,
      },
      include: {
        stock: true, // Include related Stock information
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getPosts, getPostById, getLatestPosts };
