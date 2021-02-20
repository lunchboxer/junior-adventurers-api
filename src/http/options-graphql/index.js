// This is a funny way to support CORS pre-flight requests
const checkOrigin = origin => {
  const allowedOrigins = [
    'https://alt.ja.orchard.ltd',
    'https://ja.orchard.ltd',
  ]
  if (process.env.NODE_ENV === 'testing') {
    allowedOrigins.push('http://localhost:8080')
  }
  console.log(process.env.NODE_ENV)
  console.log('allowed orgins includes:', allowedOrigins)
  return !allowedOrigins.includes(origin) || origin
}

module.exports.handler = async request => {
  console.log('got a pre-flight request')
  const method = request.httpMethod
    ? request.httpMethod
    : request.requestContext.http.method
  console.log('method is', method)
  if (method === 'OPTIONS') {
    // compare to allowed origins, if it exists, then return origin, if not - return false
    const origin = checkOrigin(request.headers.origin)
    console.log('origincheck returns:', origin)
    if (origin === false) {
      console.log('not a permitted origin')
      return { statusCode: 403 }
    }
    console.log('passes, gonna send 200 and all the good headers')
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization,content-type',
        'Access-Control-Max-Age': 86400,
      },
    }
  } else {
    return { statusCode: 503 }
  }
}
