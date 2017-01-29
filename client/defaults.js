import moment from 'moment';

const getSharedDefaults = user => ({
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
  date: (moment().unix()) * 1000,
  report: false,
  spam: false,
  showing: true,
  editing: false,
  collapsed: false,
  truncated: true,
  liked: false,
});

export const GetDefaultCommentState = user =>
  ({
    ...getSharedDefaults(user),
    replies: {},
  });

export const GetDefaultReplyState = ({ user, parentId }) => {
  const sharedDefaults = getSharedDefaults(user);

  return ({
    ...sharedDefaults,
    options: {
      ...sharedDefaults.options,
      collapse: {
        enabled: false,
        content: 'Collapse comment',
      },
    },
    parentId,
  });
};
