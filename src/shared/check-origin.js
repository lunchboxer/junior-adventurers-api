module.exports.checkOrigin = origin => {
  console.log('origin is:', origin)
  console.log('process.env.ALLOWED_ORIGINS:', process.evn.ALLOWED_ORIGINS)
  if (!process.env.ALLOWED_ORIGINS) return false
  if (process.env.ALLOWED_ORIGINS === '*') return '*'
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(' ')
  console.log('allowOrigins is:', allowedOrigins)
  console.log('includes?', allowedOrigins.includes(origin))
  const value = allowedOrigins.includes(origin) && origin
  console.log('checkOrigin will return:', value)
  return value
}
