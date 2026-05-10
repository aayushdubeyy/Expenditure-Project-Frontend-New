import { login_mutation, signup_mutation } from '../graphql/mutations/authMutations.js'
import { storage_keys } from '../constants/storage.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function signupUser(name, email, password) {
  const variables = { name, email, password }
  const data = await executeGraphqlRequest(signup_mutation, variables)
  return saveTokenFromResponse(data, 'signup')
}

export async function loginUser(email, password) {
  const variables = { email, password }
  const data = await executeGraphqlRequest(login_mutation, variables)
  return saveTokenFromResponse(data, 'login')
}

export function hasAuthToken() {
  return Boolean(getAuthToken())
}

export function getAuthToken() {
  return localStorage.getItem(storage_keys.auth_token) || ''
}

function saveTokenFromResponse(data, field_name) {
  const token = data?.[field_name]?.token
  if (!token) {
    throw new Error('Token was not returned by the server.')
  }
  localStorage.setItem(storage_keys.auth_token, token)
  return token
}
