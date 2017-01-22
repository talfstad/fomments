const sharedDefaults = user => ({
  user,
  id: Math.floor(Math.random() * 1000),
  content: '',
  options: {
    collapse: {
      enabled: true,
      content: 'Collapse comment',
    },
    spam: {
      enabled: false,
      content: 'Mark as spam',
    },
    report: {
      enabled: false,
      content: 'Report',
    },
    edit: {
      enabled: true,
      content: 'Edit comment',
    },
    delete: {
      enabled: true,
      content: 'Delete comment',
    },
  },
  likes: 0,
  date: 'Just Now', // TODO make this a real date
  report: false,
  spam: false,
  showing: true,
  editing: false,
  collapsed: false,
  truncated: true,
  liked: false,
});

export const getDefaultCommentState = user =>
  ({
    ...sharedDefaults(user),
    reply: {
      editing: false,
      content: '',
    },
    replies: [],
  });

export const getDefaultReplyState = user =>
  ({
    ...sharedDefaults(user),
  });
