# Koa Sample App

This is a simple Koa-based REST API.

## Routes
### Authentication
```
POST /login
  Accepts: username, password
  Returns: a User object, as well as a JWT for authentication

POST /register
  Accepts: username, password
  Returns: a User object, as well as a JWT for immediate authentication use
```

### Videos
```
GET /videos
  Accepts: aspect_ratio, page as query parameters
  Returns: an object containing a count of all rows found, as well as rows of results.
    - Returns a maximum of 5 rows per call. Subsequent pages can be accessed via the 'page' parameter,
    which is indexed from 0.
    - The aspect_ratio parameter can be used to filter results by the aspect ratio of the video.
    - Returns the related VideoDetails along with the Videos.

GET /videos/:uuid
  Accepts: uuid
  Returns: a single Video object
    - Returns the related VideoDetails along with the Video.

POST /videos
  Accepts: title, description, author, url
  Returns: a single Video bject
    - Returns the related VideoDetails along with the Video.
    - Uses ffprobe to determine video metadata, such as duration and aspect ratio.
```

## Usage

This can be run in development mode with:

```
yarn
yarn start
```

Running in production is not fleshed out - many constants and secrets should be
extracted out before doing this in a reproducible manner.