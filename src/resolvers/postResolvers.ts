const postResolver = {
  Query: {
    getPost: () => {
      let post: any = {
        post_id: 1,
        content: 'kyo post'
      }

      return post;
    },
  },
};

const replyResolver = {
  Query: {
    getReply: () => {
      let reply: any = {
        post_id: 1,
        reply_id: 1,
        content: 'kyo reply'
      }

      return reply;
    },
  },
};

export { postResolver, replyResolver }