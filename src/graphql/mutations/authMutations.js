export const signup_mutation =
  'mutation Signup($name: String!, $email: String!, $password: String!) {' +
  ' signup(name: $name, email: $email, password: $password) { token } }'

export const login_mutation =
  'mutation Login($email: String!, $password: String!) {' +
  ' login(email: $email, password: $password) { token } }'
