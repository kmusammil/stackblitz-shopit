const setTokenCookie = require('./setTokenCookie');

const handleAuth = async (req, res, userHelperFunction) => {
  try {
    const result = await userHelperFunction(req.body);

    if (result.success) {
      setTokenCookie(req, res, result.user);
      const redirectTo = req.session.returnTo || '/';
      delete req.session.returnTo; // Clear the saved URL
      return res.redirect(redirectTo);
    } else {
      res.render('errors/sign-error', { message: 'Invalid credentials. Please try again.' });
    }
  } catch (error) {
    res.render('errors/sign-error', { message: 'An error occurred. Please try again later.' });
  }
};

module.exports = handleAuth;
