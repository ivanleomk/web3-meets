export const capitaliseFirstLetter = (s: string) => {
  if (s.length == 0) {
    return "";
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return s[0].toUpperCase() + s.substring(1);
};
