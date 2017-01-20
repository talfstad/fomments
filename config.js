// state data

const state = {

  comments: {
    count: 900, // total comments
    sortBy: 'top',
    list: [
      {
        _id: Number,
        content: String,
        user: {
          name: String,
          url: String,
          image: String,
          affiliation: {
            name: String,
            url: String,
          },
        },
        options: {
          collapse: Boolean,
          edit: Boolean,
          delete: Boolean,
          spam: Boolean,
          report: Boolean,
        },
        likes: Number,
        date: Date,
        status: {
          report: Boolean,
          spam: Boolean,
        },
        replying: {
          showing: Boolean,
          content: String,
        },
        truncated: Boolean,
        collapsed: Boolean,
        replies: [
          {
            _id: Number,
            content: String,
            user: {
              name: String,
              url: String,
              image: String,
              affiliation: {
                name: String,
                url: String,
              },
            },
            options: {
              collapse: Boolean,
              edit: Boolean,
              delete: Boolean,
              spam: Boolean,
              report: Boolean,
            },
            likes: Number,
            date: Date,
            status: {
              report: Boolean,
              spam: Boolean,
            },
            truncated: Boolean,
            collapsed: Boolean,
          },
        ],
      },
    ],
  },
};

export default state;
