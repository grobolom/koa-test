# Koa Sample App

This is a simple Koa-based REST API.

## Usage

This can be run in development mode with:

```
yarn
yarn start
```

Running in production is not fleshed out - many constants and secrets should be
extracted out before doing this in a reproducible manner.

The main function is to be able to fetch video metadata for video urls - if you `POST` to
the `/videos` endpoint with a valid video URL, the video will be added to the database,
along with `ffprobe` metadata on said video (streams, aspect ratio, duration, filesize, etc.).

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

## Major Libraries Used

```
sequelize: database migrations, models, seeds
jest: testing wrapper
supertest: testing API endpoints easily
bcrypt: for handling password hashing/verification
jsonwebtoken: for making/checking JWTs for authentication
koa: for the API
koa-body: for automatic parsing of request bodies
koa-router: for easy express-like routing
```