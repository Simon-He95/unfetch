import type { FetchOptions } from 'ofetch'
import { ofetch } from 'ofetch'
import type { ExtendedFetch, Request } from './types'

function unfetch(defaults: FetchOptions = {}) {
  const apiFetch = ofetch.create(defaults)
  const getFetch: Request = (request, params, options) => {
    return apiFetch(request, {
      method: 'GET',
      params,
      ...options,
    })
  }

  const postFetch: Request = async (request, body, options) => {
    if (body instanceof FormData) {
      const response
        = typeof request === 'string'
          ? await apiFetch.native(joinUrl(defaults.baseURL || '', request), {
            method: 'POST',
            body,
            ...(options as any),
          })
          : await apiFetch.native(
            joinUrl(request.baseURL || defaults.baseURL || '', request.url),
            {
              ...request,
              body,
              method: 'POST',
              ...options,
            } as any,
          )
      return response.json() as any
    }
    return apiFetch(request, {
      method: 'POST',
      body,
      ...options,
    })
  }

  const putFetch: Request = (request, body, options) =>
    apiFetch(request, {
      method: 'PUT',
      body,
      ...options,
    })

  const deleteFetch: Request = (request, body, options) =>
    apiFetch(request, {
      method: 'DELETE',
      body,
      ...options,
    })

  const patchFetch: Request = (request, body, options) =>
    apiFetch(request, {
      method: 'PATCH',
      body,
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
