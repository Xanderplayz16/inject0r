# Selfhosting
First, starting the server:
`npm i` / `bun i` depending on js runtime,
`node index.js` / `bun run index.js` to start inject0r.
Just register an account, and go to `localhost:8080/bookmark` to test it out.
It should work fine.
If you plan on hosting your instance not on localhost, first head to `public/bookmark/injbookmarkcode.js`.
Then, scroll down to line 146 and change the value of the variable to the location that you are hosting inject0r.
Do the same on `public/bookmark/bookmark.js` on line 2.
