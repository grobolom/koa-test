Contains the core portion of the sample Koa app. In a more complex application,
each of the `.js` files in this directory would be split into separate directories,
to better accomodate non-trivial modules. In this simple app, this is overkill.

The main pieces to look at are `videos.js` and `auth.js` - everthing else is glue.

I've chosen to puts `videos.test.js` here, rather than keep a separate test directory as
is suggested by `jest` docs. I find that keeping the tests co-located makes it more
likely that they will be kept up-to-date by developers. It also makes it more immediately
obvious what portions of the code are tested, and which are not. The trade-off of increased
directory size (in terms of file count) can be mitigated by managing good
separation of concerns, and the odd 16-file directory is not a big problem.