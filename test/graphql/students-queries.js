const STUDENTS = /* GraphQL */ `
  {
    students {
      key
      name
      birthdate
      languages
    }
  }
`

const STUDENT = /* GraphQL */ `
  query Student($key: ID!) {
    student(key: $key) {
      key
      name
      birthdate
      languages
    }
  }
`

const CREATE_STUDENT = /* GraphQL */ `
  mutation CreateStudent(
    $name: String
    $birthdate: String
    $languages: String
  ) {
    createStudent(name: $name, birthdate: $birthdate, languages: $languages) {
      key
      name
      birthdate
      languages
    }
  }
`

module.exports = {
  STUDENT,
  STUDENTS,
  CREATE_STUDENT,
}
