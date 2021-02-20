// This is a funny way to support CORS pre-flight requests
const checkOrigin = request => {
  // sort this once it kinda words
  return '*'
}
module.exports.handler = async request => {
  request.httpMethod = request.httpMethod
    ? request.httpMethod
    : request.requestContext.http.method
  if (request.httpMethod === 'OPTIONS') {
    // compare to allowed origins, if it exists, then return origin, if not - return false
    const origin = checkOrigin(request)
    return origin === false
      ? { statusCode: 403 }
      : {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': 86400,
          },
        }
  } else {
    return { statusCode: 503 }
  }
}
