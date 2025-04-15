import { createSlice, nanoid } from "@reduxjs/toolkit";


const postsFromStorage = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];



const initialState = {
  posts: postsFromStorage,
};


export const postInfoSlice = createSlice({
  name: "postInfo",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const extraValues = {
        postId: nanoid(),
        reactedBy: [],
        reactionMap: {},
        reactionHub: [
          { emojiId: 1, emoji: "✔️", counter: 0 },
          { emojiId: 2, emoji: "❌", counter: 0 },
        ],
      };

      state.posts.push({ ...action.payload, ...extraValues });

      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    addReaction: (state, action) => {
      //* username, postId, emojiId
      const { currentUser, username, postId, emojiId } = action.payload;
      const post = state.posts.find((post) => post.postId === postId);
      if (post) {
        if (post.reactedBy.includes(currentUser)) {
          const prevEmojiId = post.reactionMap[currentUser];
          if (prevEmojiId === emojiId) {
            const reaction = post.reactionHub.find(
              (reaction) => reaction.emojiId === emojiId
            );
            if (reaction) {
              reaction.counter--;
              post.reactedBy = post.reactedBy.filter(
                (reactionar) => reactionar !== currentUser
              );
              delete post.reactionMap[currentUser];
            }
          }
        } else {
          post.reactedBy.push(currentUser);
          const reaction = post.reactionHub.find(
            (reaction) => reaction.emojiId === emojiId
          );
          if (reaction) {
            post.reactionMap[currentUser] = reaction.emojiId;
            reaction.counter += 1;
          }
        }
        localStorage.setItem('posts', JSON.stringify(state.posts));
      }
    },
  },
});

export const AllPostsInfo = (state) => state.postInfo.posts;
export const { addReaction, addPost } = postInfoSlice.actions;
export default postInfoSlice.reducer;
