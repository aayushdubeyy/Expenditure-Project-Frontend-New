import { getAuthToken } from './authService.js'

const graphql_endpoint =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'

export async function executeGraphqlRequest(query, variables) {
  const request_config = buildRequestConfig(query, variables)
  const response = await fetch(graphql_endpoint, request_config)
  const response_body = await parseResponseJson(response)
  throwOnGraphqlError(response, response_body)
  return response_body.data
}

function buildRequestConfig(query, variables) {
  const auth_token = getAuthToken()
  return {
    method: 'POST',
    headers: buildHeaders(auth_token),
    body: JSON.stringify({ query, variables }),
  }
}

function buildHeaders(auth_token) {
  if (!auth_token) {
    return { 'Content-Type': 'application/json' }
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth_token}`,
  }
}

async function parseResponseJson(response) {
  try {
    return await response.json()
  } catch {
    return {}
  }
}

function throwOnGraphqlError(response, response_body) {
  const error_message = response_body?.errors?.[0]?.message
  if (!response.ok || error_message) {
    throw new Error(error_message || 'Unable to complete request.')
  }
}
