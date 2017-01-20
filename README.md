header: (container)
  - needs:
    . update comment count
    . trigger a full sort on comments
    . needs action creator and map state to props

new comment/reply comment: (container)
  - needs:
    . redux form to submit the comment & validate

comment list (component):
  - needs:
    . dumb list of comments

comment (smart):
  - needs:
    . change like count
    . open reply box

  = replies




. rip basic comment section html
  . show different states for likes
  . show more comments html
  . replies, no replies, etc.

. plan out react components

. create base react components

. hook into redux & local storage




----------------------------------------------------------------

DONE -- . hover over comment arrow appear drop down
  - when over the root el show the arrow, on reply show both root arrow and reply arrow
DONE -- . hover over comment arrow show tooltip
DONE -- . see more for comments longer than 600 characters


DONE -- . reply comment
DONE -- . reply my comment line

DONE -- . show 10 more replies in this thread button at end of replies (pages 10 at a time)
DONE -- . load n (10 if over 10, actual number if less) more comments button after default show num posts val

. react components each no dynamic


redux modals videos to do these ->
. report to facebook popup
. delete comment popup
