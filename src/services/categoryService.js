import { get_categories_query } from '../graphql/queries/categoryQueries.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function getCategories() {
  const data = await executeGraphqlRequest(get_categories_query, {})
  return data?.getCategories || []
}
