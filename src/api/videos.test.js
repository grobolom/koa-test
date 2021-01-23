const request = require("supertest");
const server = require("../index.js");
const bcrypt = require("bcrypt");

afterAll(() => {
  server.close();
});

describe("auth protection", () => {
  test("index is protected by auth", async () => {
    const response = await request(server).get("/videos");
    expect(response.status).toEqual(401);
  });

  test("show is protected by auth", async () => {
    const response = await request(server).get("/videos/1");
    expect(response.status).toEqual(401);
  });

  test("create is protected by auth", async () => {
    const response = await request(server).post("/videos", { url: "some-url" });
    expect(response.status).toEqual(401);
  });
});

describe("querying", () => {
  beforeAll(async () => {
    // log in before these tests
    const login = await request(server).post("/login").send({
      username: "admin",
      password: "password",
    });

    this.auth = `Bearer ${login.body.token}`;
  });

  test("index returns max 5 results", async () => {
    const videos = await request(server)
      .get("/videos")
      .set("authorization", this.auth);

    expect(videos.status).toEqual(200);
    expect(videos.body.count).toEqual(6);
    expect(videos.body.rows.length).toEqual(5);
  });

  test("index filters by aspect ratio", async () => {
    const videos = await request(server)
      .get("/videos")
      .query({ aspect_ratio: "4:3" })
      .set("authorization", this.auth);

    expect(videos.status).toEqual(200);
    expect(videos.body.count).toEqual(2);
    expect(videos.body.rows.length).toEqual(2);
  });

  test("show returns a single video", async () => {
    const videos = await request(server)
      .get("/videos")
      .set("authorization", this.auth);

    const id = videos.body.rows[0].id;

    const video = await request(server)
      .get(`/videos/${id}`)
      .set("authorization", this.auth);

    expect(video.status).toEqual(200);
    expect(video.body.video_details.aspect_ratio).toBe("16:9");
    expect(video.body.video_details.extension).toBe("mp4");
  });
});
