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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
