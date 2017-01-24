static organization:


todo:

SORT BY TOP, NEW, OLD

- use real dates for date in comments

- convert real date to visible date using moment


. date of new comment is date, shows a to text version like facebook
'just now', '5 min', '10 min', 'an hour ago' else shows the date/time

. sort by works newest, oldest, top. top shows users comments then other ones by likes

PAGE COMMENTS


PAGE REPLIES

. show n more replies in this thread (3 default replies showing)

. edit comment changes comment for user and shows 'edited' after date

. make text area grow vertically using html

. a reply to a reply includes the reply users name in the content



HOOK TO LOCAL STORAGE




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
