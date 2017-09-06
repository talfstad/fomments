## Fomments
### App

Find more information on Fomments app here:
https://github.com/Buildcave/fomments-app

We truly believe this software is epic and hope you find it useful.

Sincerely,

<img alt="Trevor Alfstad Signature" class="signature" src=team/signatures/trevoralfstad.png />

(Trevor Alfstad, Developer)

---------------------------------------------------------------

- main cannot load local storage, must be in app
  . have to save and load from messaging

- on clear localStorage why do 2 load ? when only 1 should
  . have to make paging not be state dependent
  . get rid of state in components, use redux but dont save to localStorage






# meteor endpoint that loads the initial state based on section id, user id, product name

. if no product name, load general version else load product name version ?

# if not found, fail and request general from cdn. validate id is good before request or else just get
# from cdn


on load -> do we have valid section id? (if premium, also has user id, if not do we have comments)

-> yes -> request section from json endpoint

-> no -> request default section from cdn




DONE -- 1. set up json endpoint at /sections/<sectionId> to serve default section

DONE -- 2. get that into the app

DONE -- . make localStorage store in key = to the sku

-- make sectionId work to serve default section from memory (not found) and
   found section from mongo db


3. validation && include /sections/<sectionId>/<userId>

4. if no section, no user, load no comments
