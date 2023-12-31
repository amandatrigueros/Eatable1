import { tokenKey, BASE_URI } from "../config";

export default async function eatableClient(
  endpoint,
  { method, headers, body } = {}
) {
  const token = sessionStorage.getItem(tokenKey);
  // const token = "G1xBV2tpHQCCn63y13upccWh";

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  if (body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  const config = {
    method: method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(BASE_URI + endpoint, config);

  let data;

  if (!response.ok) {
    // if (sessionStorage.getItem(tokenKey) && response.status === 401) {
    //   sessionStorage.removeItem(tokenKey);
    //   window.location.reload();
    // }
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors);
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }

  return data;
}
