@app
junior-adventurers

@static
folder /build

@http
post /graphql
get /graphql
options /graphql

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
