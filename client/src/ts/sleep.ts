const sleep = (delay: number): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
};

export default sleep;
