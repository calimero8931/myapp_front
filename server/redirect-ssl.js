export default (req, res, next) => {
  const { NODE_ENV, BASE_URL } = process.env

  if (NODE_ENV === 'production' && !!BASE_URL) {
    const redirectDomain = /herokuapp.com/
    const reqHost = req.headers.host
    const reqProtocol = req.headers['x-forwarded-proto']

    if (reqProtocol === 'http' || redirectDomain.test(reqHost)) {
      const redirectTargetUrl = BASE_URL + req.url

      res.writeHead(301, { Location: redirectTargetUrl })

      return res.end(redirectTargetUrl)
    }
  }
  return next()
}