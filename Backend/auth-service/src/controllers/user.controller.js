const profile = (req, res) => {
  res.json({
    message: 'Perfil protegido',
    user: req.user
  });
};

module.exports = {
  profile
};
