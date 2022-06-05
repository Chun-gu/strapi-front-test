export const dateConverter = (date: string): string => {
  const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/g;
  const matchArr = date.match(regex) as string[];
  const result = matchArr[0]!.replaceAll('-', '. ');
  return result;
};
