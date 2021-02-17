const USER = /* GraphQL */ `
  query User($key: ID!) {
    user(key: $key) {
      key
      name
      email
    }
  }
`
const USERS = /* GraphQL */ `
  {
    users {
      key
      name
      email
    }
  }
`

const USER_COUNT = /* GraphQL */ `
  {
    userCount
  }
`

const UPDATE_USER = /* GraphQL */ `
  mutation UpdateUser($key: ID!, $name: String, $email: String) {
    updateUser(key: $key, name: $name, email: $email) {
      key
      name
      email
    }
  }
`

const CREATE_USER = /* GraphQL */ `
  mutation CreateUser($name: String, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        key
        name
        email
        isVerified
      }
    }
  }
`

const DELETE_USER = /* GraphQL */ `
  mutation DeleteUser($key: ID!) {
    deleteUser(key: $key) {
      key
    }
  }
`

const CHANGE_PASSWORD = /* GraphQL */ `
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      key
      name
    }
  }
`
const LOGIN = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

module.exports = {
  USER,
  USERS,
  USER_COUNT,
  UPDATE_USER,
  CREATE_USER,
  DELETE_USER,
  CHANGE_PASSWORD,
  LOGIN,
}
