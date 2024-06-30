class HttpError extends Error {
  constructor(
    public response: Response,
    message: string,
  ) {
    super(message)
  }
}

export async function simpleFetch<ResponseType = any>(
  url: string,
  options: RequestInit = {},
) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new HttpError(
      response,
      `Request failed with status ${response.status}`,
    )
  }

  return (await response.json()) as ResponseType
}
