import {
  CHANGE_SORT_BY,
} from '../actions/types';

const INITIAL_STATE = {
  count: 900, // total comments
  sortBy: {
    top: true,
    newest: false,
    oldest: false,
  },
  list: [
    {
      _id: 1,
      content: 'And that my friends is why President Elect Donald Trump won. We are sick of it. We are sick of the left claiming to be the ones that are tolerant but at every chance they get they call us racists, bigots, homophobes, zenophobes, and every other phobes and ists you can think of and every time they are running for anything they pull the race card. I am 56 years old and as long as I have been a voter they have been doing this and they have lumped me in with all this long enough. I am so sick of these politically correct babies that I want change and Donald Trump is the one I believe will keep his word to do it because I have no trust in either establishment Democrat or Republican. I am done with them until I see some real change.',
      user: {
        name: 'Cristi Selvaggio-Loken',
        url: 'https://www.facebook.com/cristi.loken',
        image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p48x48/10653562_933461080080555_2573322228358397722_n.jpg?oh=b896e112dd202abd81708cf405272c25&oe=59052C88',
        affiliation: {
          name: 'Covina High',
          url: 'https://www.facebook.com/westcovinahighschool/?rf=111303315560263',
        },
      },
      options: {
        collapse: true,
        spam: true,
        report: true,
        edit: false,
        delete: false,
      },
      likes: 586,
      date: 'Nov 20, 2016 7:57pm',
      status: {
        report: false,
        spam: false,
      },
      replying: {
        showing: false,
        content: '',
      },
      truncated: true,
      collapsed: false,
      replies: [
        {
          _id: 2,
          content: 'Another damn fool that needs to be schooled. Trump won because the Electoral College voted for him not the people. Hillary would be the president if the people had a say. Right now she has more than one million votes more than Trump. I don\'t think she is the person for the job either so no I\'m not a Hillary supporter. So please climb down off of your high horse because you had absolutely nothing to do with him being the president elect. Also just know that the inauguration hasn\'t occurred yet. 56 years old and still a damn sheep. Dummy doesn have an ist on it does it?',
          user: {
            name: 'Cassie Jay',
            url: 'https://www.facebook.com/cassandra.jenkins.54',
            image: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p48x48/12208311_10207714506010947_4805234041899762623_n.jpg?oh=4f3635bea9ab87812edfc106526dbe95&oe=5906C831',
            affiliation: {
              name: 'Charlotte, North Carolina',
              url: 'https://www.facebook.com/pages/Charlotte-North-Carolina/105715936129053',
            },
          },
          options: {
            collapse: true,
            spam: true,
            report: true,
            edit: false,
            delete: false,
          },
          likes: 378,
          date: 'Nov 23, 2016 10:09am',
          status: {
            report: false,
            spam: false,
          },
          truncated: true,
          collapsed: false,
        },
      ],
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SORT_BY: {
      const sortBy = {
        top: false,
        newest: false,
        oldest: false,
      };
      sortBy[action.payload] = true;

      return {
        ...state,
        sortBy,
      };
    }
    default:
      return state;
  }
};
