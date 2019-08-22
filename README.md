# guild-challenge


## Demo

See [here](https://james-gibson.github.io/guild-challenge/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize Vue configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Project architecture
 
### Synopsis

Statically hosted vue app backed with a single cloud function and postgres db.  Because sockets are notoriously tricky to scale I have chosen to leverage a client polling model to enable rapid scaling to match demand.

### `src/main.js`
Bootstrap into the vue app.  Configures polling schedule on load.

### `src/App.vue`
The vue app.

### `index.js`
Cloud function handler.  Manages 
 
  * GET: `/` returns ```{ messages:{id:number, userid:string, avatarurl:string, msg:string}[], error } ```
  * POST: `/` with body 

  ```
  {id:number, userid:string, avatarurl:string, msg:string}
  ``` 
  
  returns 

  ```
  { messages:{id:number, userid:string, avatarurl:string, msg:string}[], error } 
  ```
## Notes

  * Create db table:
```
CREATE TABLE messages (
    id bigint primary key,
    userId varchar(20) NOT NULL,
    avatarUrl varchar(200) NOT NULL,
    msg text NOT NULL
);
```
  * Other ideas considered:
    - Deploying the server to heroku instead of cloud functions
    - Using a third party tool such as firebase to handle realtime updates
  * Additional constraint:
    - Building a simple messaging service without using sockets.  Sockets are tricky to scale and so I chose to use a polling method against the cloud function for simplicity.
    - As free as possible.  The cloud db is the largest cost in this stack ($7-ish/mo).  The site is statically hosted on github pages

## Next steps

  * Security!!  The server currently has no authentication. Placing this behind an oAUTH solution would be the first place I'd start
  * Test coverage. Implementing the core functionality took a little longer then I expected
  * Accessibility. While the app is mostly semantic html more focus could be given here
  * Infrastructure as code. I manually created the db and cloud functions, I'd want to conver that into ansible/terraform/etc
  * CI/CD. Wire in cloud buildpacks to keep deployments up to date
  * Stronger UI/UX. Perhaps give the app a stronger focus 
  * Avatars. Currently when the app loads you are assigned a random image.  Ideally this would be user chosen
  * Improved text handling. Markdown support maybe?
  * Architectural diagram.  Detailed grapic identifying all the components of the app

## Bugs
  * Chat does not handle apostrophes
  * Server crashes without reporting an error.
  * Linting currently doesnt pass

## Problems encountered:
  * Ran out of connections on the db during testing, limited the function count to 3
  * Values in the db at one point had extra quotes, this broke some usages of them
