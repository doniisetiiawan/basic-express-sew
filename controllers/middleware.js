function restrictedLoggedInUser(req, res, next) {
  if (!req.user || req.user.id != req.params.id) {
    return next('Not found');
  }
  next();
}

export default restrictedLoggedInUser;
