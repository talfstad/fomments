static organization:


todo:

. collapse comment collapses comment (in state)
  . on click show the comment collapsed with undo button, remove it from menu options
  . show undo button which changes menu options back, shows comment

. mark comment as spam, undo. on refresh comment disappears for good

. report shows modal and removes comment

. show n more replies in this thread (3 default replies showing)

. date of new comment is date, shows a to text version like facebook
'just now', '5 min', '10 min', 'an hour ago' else shows the date/time

. sort by works newest, oldest, top. top shows users comments then other ones by likes

. make text area grow vertically using html

. if comment edited show 'edited' to right of date



. a reply to a reply includes the reply users name in the content




header: (container)
  - needs:




new comment/reply comment: (container configurable)
  - needs:
    . redux form to submit the comment & validate

comment list (component):
  - needs:
    . dumb list of comments

comment/reply (container configurable):
  - needs:
    . change like count
    . open reply box

  = reply list (dumb component)
    = reply (container)
      . change likes
      . trigger a reply





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
