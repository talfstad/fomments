// given a list sort and page reply and return to comment pager



// Page all replies for a comment
export function pageReplies({ replies, pagedReplies }) {
  // if (pageReplies) {
  //   const pagedCommentAndReplyPayload = pagedCommentPayload.pagedList.map((comment) => {
  //     const { replies, pagedReplies } = comment;
  //
  //     const sortedReplies = sortReplies ? sorters.oldest({ list: replies }) :
  //       Object.keys(replies).map(key => replies[key]);
  //
  //     // TODO: page replies
  //     // TODO: pull show more out of the page function and do it here
  //     const pagedReplyPayload = getPagedPayload(
  //       sortedReplies, pagedReplies.list, defaultRepliesToShow,
  //       defaultRepliesToLoadAtOnce, pagedReplies.showMore,
  //     );
  //
  //     return {
  //       ...comment,
  //       replies: pagedReplyPayload,
  //     };
  //   });
  //
  //
  //   dispatch({
  //     type: SET_PAGED_COMMENT_LIST,
  //     payload: pagedCommentAndReplyPayload,
  //   });
  // } else {
  //   dispatch({
  //     type: SET_PAGED_COMMENT_LIST,
  //     payload: pagedCommentPayload,
  //   });
  // }


  // pagedCommentPayload.pagedList.map((comment) => {
  //   const { replies, pagedReplies } = comment;
  //
  //   const sortedReplies = sortReplies ? sorters.oldest({ list: replies }) :
  //     Object.keys(replies).map(key => replies[key]);
  //
  //   // TODO: page replies
  //   // TODO: pull show more out of the page function and do it here
  //   const pagedReplyPayload = getPagedPayload(
  //     sortedReplies, pagedReplies.list, defaultRepliesToShow,
  //     defaultRepliesToLoadAtOnce, pagedReplies.showMore,
  //   );
  //
  //   return {
  //     ...comment,
  //     replies: pagedReplyPayload,
  //   };
  // });
}
