export default {
  newest: ({ list }) => Object.keys(list)
    .sort((a, b) => list[b].date - list[a].date)
    .map(key => list[key]),

  oldest: ({ list }) => Object.keys(list)
    .sort((a, b) => list[a].date - list[b].date)
    .map(key => list[key]),

  top: ({ list, user }) => {
    // remove users comments from list
    const userComments = Object.keys(list).filter((key) => {
      const comment = list[key];
      return comment.user.name === user.name;
    })
    .sort((a, b) => list[b].date - list[a].date)
    .map(key => list[key]);

    // sort remaining (remove users comments)
    const sortedComments = Object.keys(list)
      .filter((key) => {
        const comment = list[key];
        return comment.user.name !== user.name;
      })
      .sort((a, b) => list[b].likes - list[a].likes)
      .map(key => list[key]);

    return [
      ...userComments,
      ...sortedComments,
    ];
  },
};
