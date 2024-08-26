import type { $Fetch, FetchOptions, FetchRequest, MappedResponseType, ResponseType } from 'ofetch'

export type Request = <T = any, R extends ResponseType = 'json'>(request: FetchRequest, options?: FetchOptions<R>) => Promise<MappedResponseType<R, T>>
export interface ExtendedFetch extends $Fetch {
  get: Request
  post: Request
  put: Request
  delete: Request
  patch: Request
}
