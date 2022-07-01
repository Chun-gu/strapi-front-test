const dateConverter = (utcTime: string): string => {
  const localTime = new Date(utcTime).toLocaleString();
  const regex = /[0-9]{4}.\s[0-9]{1,2}.\s[0-9]{1,2}./g;
  const matchArr = localTime.match(regex) as string[];
  return matchArr.join();
};

export default dateConverter;
