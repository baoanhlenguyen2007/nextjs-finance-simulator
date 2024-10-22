/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getPostById } from "@/app/actions/posts";

const NewDetailPage = async ({ params }: { params: { newId: string } }) => {
  const post = await getPostById(Number(params.newId));
  console.log("🚀 ~ NewDetailPage ~ post:", post);

  if (!post) {
    return <div>Not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">{post?.title}</h1>
        {/* <p className="text-base text-gray-400">Sep 21, 202408:27 UTC</p> */}
      </div>
      {/* Content */}
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default NewDetailPage;
