export const getCookie = (name: string) => {
  const result = document.cookie.match(new RegExp(`${name}=([^;]+)`));

  if (result) {
    return JSON.parse(result[1]);
  }
  return null;
};
