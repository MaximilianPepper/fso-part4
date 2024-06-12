const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  let favorite;
  blogs.forEach((e) => {
    if (!favorite) favorite = e;
    if (e.likes > favorite.likes) favorite = e;
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  const map1 = new Map();
  for (const blog of blogs) {
    map1.has(blog.author)
      ? map1.set(blog.author, map1.get(blog.author) + 1)
      : map1.set(blog.author, 1);
  }
  let maxBlogs = 0;
  let topAuthor = null;
  for (const [author, blogs] of map1) {
    if (blogs > maxBlogs) {
      maxBlogs = blogs;
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

const mostLikes = (blogs) => {
  const map1 = new Map();
  for (const blog of blogs) {
    map1.has(blog.author)
      ? map1.set(blog.author, map1.get(blog.author) + blog.likes)
      : map1.set(blog.author, blog.likes);
  }
  let topLikes = 0;
  let topAuthor = null;
  for (const [author, likes] of map1) {
    if (likes > topLikes) {
      topLikes = likes;
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    likes: topLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
