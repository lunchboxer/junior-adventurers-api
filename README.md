# Junior Adventurers

A graphql api for a single 2nd grade class

Basic set up requires the following environment variables be set:

```sh
## FRONTEND ##
# On begin, these variables will be used from the testing stage
SNOWPACK_PUBLIC_DEV_API_ENDPOINT=http://localhost:3333/graphql
SNOWPACK_PUBLIC_PROD_API_ENDPOINT=https://api.domain.com/graphql

## SERVER ##
JWT_SECRET=WithASecretLikeThisWhyBother
 # a space-delimited list of orgins allowed by CORS. '*' is sensible for dev
ALLOWED_ORIGINS="https://somedomain.com https://another.domain.com"
```
