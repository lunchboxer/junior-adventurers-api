@app
junior-adventurers

@static
folder /public

@shared

@http
post /graphql
options /graphql

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
