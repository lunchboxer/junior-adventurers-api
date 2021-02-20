@app
junior-adventurers

@static
folder /build

@shared
src src/shared

@http
post /graphql
options /graphql

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
