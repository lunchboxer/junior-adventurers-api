@app
junior-adventurers

@static
folder /build

@shared

@http
post /graphql
options /graphql

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
