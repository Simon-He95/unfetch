import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import type { ExtendedFetch, Request } from './types'

function unfetch(defaults: FetchOptions = {}) {
  const apiFetch: ExtendedFetch = ofetch.create(defaults) as ExtendedFetch
  const getFetch: Request = (request, options) => {
    return apiFetch(request, {
      method: 'GET',
      ...options,
    })
  }

  const postFetch: Request = (request, options) => {
    if (options?.body && options.body instanceof FormData) {
      return apiFetch.native(
        Object.assign(
          typeof request === 'string'
            ? {
                url: defaults.baseURL
                  ? joinUrl(defaults.baseURL, request)
                  : request,
              }
            : request,
          {
            method: 'POST',
            ...options,
          },
        ),
      )
    }
    return apiFetch(request, {
      method: 'POST',
      ...options,
    })
  }

  const putFetch: Request = (request, options) =>
    apiFetch(request, {
      method: 'PUT',
      ...options,
    })

  const deleteFetch: Request = (request, options) =>
    apiFetch(request, {
      method: 'DELETE',
      ...options,
    })

  const patchFetch: Request = (request, options) =>
    apiFetch(request, {
      method: 'PATCH',
      ...options,
    })

  ;(apiFetch as ExtendedFetch).get = getFetch
  ;(apiFetch as ExtendedFetch).post = postFetch
  ;(apiFetch as ExtendedFetch).put = putFetch
  ;(apiFetch as ExtendedFetch).delete = deleteFetch
  ;(apiFetch as ExtendedFetch).patch = patchFetch

  return apiFetch
}

function joinUrl(a: string, b: string) {
  return `${a.replace(/\/$/, '')}/${b.replace(/^\//, '')}`
}

export default unfetch
