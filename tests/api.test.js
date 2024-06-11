const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blogs");

const initalBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initalBlogs[0]);
  await blogObj.save();
  blogObj = new Blog(initalBlogs[1]);
  await blogObj.save();
});
test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initalBlogs.length);
});

test("id identifier exists", async () => {
  const response = await api.get("/api/blogs");
  const hasId = response.body.every((obj) => obj.hasOwnProperty("id"));
  assert.strictEqual(hasId, true);
});

test("a blog can be added ", async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initalBlogs.length + 1);

  assert(contents.includes("Type wars"));
});
//delete
describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const startingBlogs = await blogsInDb();
    const blogtoDelete = startingBlogs[0];

    await api.delete(`/api/blogs/${blogtoDelete.id}`).expect(204);
    const updatedBlogs = await blogsInDb();
    const titles = updatedBlogs.map((r) => r.title);
    assert(!titles.includes(blogtoDelete.title));
  });
});

// update likes (increment by 1)

describe("updating likes of a blog", () => {
  test("succeeds incrementing likes by one with a valid id", async () => {
    const startingBlogs = await blogsInDb();
    const blogToUpdate = startingBlogs[0];
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200);
    const updatedBlogs = await blogsInDb();
    const updatedBlog = updatedBlogs.find((e) => e.id === blogToUpdate.id);
    assert(blogToUpdate.likes + 1 === updatedBlog.likes);
  });
});
after(async () => {
  await mongoose.connection.close();
});

async function blogsInDb() {
  const blog = await Blog.find({});
  return blog.map((blog) => blog.toJSON());
}
