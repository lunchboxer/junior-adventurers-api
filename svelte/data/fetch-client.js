const endpoint =
  import.meta.env.MODE === 'development'
    ? import.meta.env.SNOWPACK_PUBLIC_DEV_API_ENDPOINT
    : import.meta.env.SNOWPACK_PUBLIC_PROD_API_ENDPOINT

export const request = async (query, variables) => {
  const coldAuth = window.localStorage.getItem('auth')
  const token = coldAuth ? JSON.parse(coldAuth).token : undefined
  const body =
    typeof query === 'function'
      ? query(variables)
      : JSON.stringify({ query, variables })
  const response = await fetch(endpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || '',
    },
    body,
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
