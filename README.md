static organization:


todo:

. collapsed disabled mark as spam option in menu as well

- on reply show spam/undo and remove mark as spam from menu and collapse
- on comment show spam/undo and remove mark as spam from menu and collapse

  . mark as spam is saved to store


. mark comment as spam, undo. on refresh comment disappears for good

. report shows modal and removes comment
  redux modals videos to do these ->
  . report to facebook popup
  . delete comment popup


. date of new comment is date, shows a to text version like facebook
'just now', '5 min', '10 min', 'an hour ago' else shows the date/time

. sort by works newest, oldest, top. top shows users comments then other ones by likes

. show n more replies in this thread (3 default replies showing)

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
