export const LOGIN = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        key
        name
        email
      }
    }
  }
`

export const CREATE_USER = /* GraphQL */ `
  mutation CreateUser($name: String, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        key
        name
        email
      }
    }
  }
`
