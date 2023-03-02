export const keyFromParams = (type: string, params: object) => {
  let key: string[] = [];

  new Map(Object.entries(params)).forEach((v, k) => {
    key.push(`${k}=${v}`);
  });

  return `${type}:${key.join("&")}`;
};
