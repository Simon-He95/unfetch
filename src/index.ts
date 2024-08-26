import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import type { ExtendedFetch, Request } from './types'

function unfetch(defaults: FetchOptions) {
  const apiFetch: ExtendedFetch = ofetch.create(defaults) as ExtendedFetch
  const getFetch: Request = (request, options) => {
    return apiFetch(request, {
      method: 'GET',
      ...options,
    })
  }

  const postFetch: Request = (request, options) => apiFetch(request, {
    method: 'POST',
    ...options,
  })

  const putFetch: Request = (request, options) => apiFetch(request, {
    method: 'PUT',
    ...options,
  })

  const deleteFetch: Request = (request, options) => apiFetch(request, {
    method: 'DELETE',
    ...options,
  })

  const patchFetch: Request = (request, options) => apiFetch(request, {
    method: 'PATCH',
    ...options,
  });

  (apiFetch as ExtendedFetch).get = getFetch;
  (apiFetch as ExtendedFetch).post = postFetch;
  (apiFetch as ExtendedFetch).put = putFetch;
  (apiFetch as ExtendedFetch).delete = deleteFetch;
  (apiFetch as ExtendedFetch).patch = patchFetch

  return apiFetch
}

export default unfetch
