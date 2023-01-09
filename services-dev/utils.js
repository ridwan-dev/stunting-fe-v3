/**
 * Parse current url and break it into resource, id and verb.
 * @return {Object} Path params.
 */
export const parseRequestUrl = () => {
  // Convert location hash into an url.
  const path = location.hash.slice(2).toLowerCase() || '/';

  // Split url into params array: [resource, id, verb].
  const params = path.split('/');

  // Build request variable.
  const request = {
    resource: params[0] || null,
    id: params[1] || null,
    verb: params[2] || null
  };

  // Print it in the console.
  // console.log('(App) Parsed url:', request);

  // Return and object with params.
  return request;
};

export function setWithExpiry(key, value, ttl) {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage and return null
    localStorage.removeItem("auth");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userLogIn");
    return null
  }
  return item.value
}