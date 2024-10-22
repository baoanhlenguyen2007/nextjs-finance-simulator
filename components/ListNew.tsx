import React from "react";
import CardNew from "./CardNew";
import { IPost } from "@/app/actions/posts";
import { checkUser } from "@/lib/checkUser";

interface Props {
  posts: IPost[];
}

const ListNew = async ({ posts }: Props) => {
  const user = await checkUser();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <CardNew post={post} userDay={user?.simulation?.currentDay || 0} />
          </div>
        ))}
    </div>
  );
};

export default ListNew;
