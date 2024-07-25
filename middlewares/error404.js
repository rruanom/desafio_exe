const manage404 = (req, res, next) => {
  res.status(404).json({
      msj: "404 not found",
      img: "https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"
  });
}

module.exports = manage404;