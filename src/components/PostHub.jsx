import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReaction, AllPostsInfo } from "../../features/postInfoSlice";
import { CurrentUser } from "../../features/loginInfoSlice";

export default function PostHub() {
  const posts = useSelector(AllPostsInfo);
  const user = useSelector(CurrentUser);
  const dispath = useDispatch();

  const handleReactionBtn = (username, postId, emojiId) => {
    if(user.email) dispath(addReaction({ username, postId, emojiId, currentUser: user.username }));
  };

  return (
    <div className="pt-20 px-4 font-inter font-medium flex flex-col gap-8">
      {posts.map((post) => {
        return (
          <div key={post.postId} className="border px-3 py-1">
            <h1 className="border-b-2 border-b-cyan-600 text-center font-semibold pb-2">
              {post.title}
            </h1>
            <h2 className="text-gray-700 text-sm p-2 border border-dashed border-b-blue-700 my-2">
              {post.text}
            </h2>
            <h3 className="font-fredoka text-teal-700 text-xs m-2">
              Posted By {post.username}
            </h3>
            <div className="text-sm text-center flex gap-4 items-center m-2 justify-center">
              {post.reactionHub.map((reaction) => {
                return (
                  <div
                    key={reaction.emojiId}
                    className="flex gap-1 items-center"
                  >
                    <button
                      onClick={() =>
                        handleReactionBtn(
                          post.username,
                          post.postId,
                          reaction.emojiId
                        )
                      }
                    >
                      {reaction.emoji}
                    </button>
                    <span className="text-blue-700 text-base">
                      {reaction.counter}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
