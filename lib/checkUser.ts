import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { INITIAL_DAY } from "@/constants/utils";

export const checkUser = async () => {
  const user = await currentUser();
  // Check current logged in clerk
  if (!user) {
    return null;
  }

  // check if user is already in db
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
    include: {
      simulation: true, // Include the simulation to check if it exists
    },
  });
  // if user is in db, return user info
  if (loggedInUser) {
    // Check if the user has a simulation
    if (!loggedInUser.simulation) {
      // Create a simulation if the user does not have one
      await db.simulation.create({
        data: {
          currentDay: INITIAL_DAY,
          userId: loggedInUser.clerkUserId,
          startDate: new Date(),
        },
      });
    }
    return loggedInUser;
  }
  // if user is not in db, create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  const simulation = await db.simulation.create({
    data: {
      currentDay: INITIAL_DAY,
      userId: newUser.clerkUserId,
      startDate: new Date(),
    },
  });

  return { ...newUser, simulation };
};
