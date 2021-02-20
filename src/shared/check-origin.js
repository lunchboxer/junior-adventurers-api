module.exports.checkOrigin = origin => {
  console.log('origin:', origin)
  if (!process.env.ALLOWED_ORIGINS) return false
  console.log('process.env.ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS)
  if (process.env.ALLOWED_ORIGINS === '*') return '*'
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(' ')
  console.log('allowedOrigins:', allowedOrigins)
  return allowedOrigins.includes(origin) && origin
}
