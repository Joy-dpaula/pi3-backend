import cookieParser from 'cookie-parser';

export function configureCookieParser(app, secret) {
  app.use(cookieParser(secret));
}


export function setCookie(res, name, value, options = {}) {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, 
    secure: isProduction, 
    ...options 
  };

  res.cookie(name, value, cookieOptions);
}

export function getCookie(req, name) {
  return req.signedCookies[name];
}