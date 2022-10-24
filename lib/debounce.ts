const debounce = (
  callback: { apply: (arg0: undefined, arg1: any[]) => void },
  wait: number | undefined
) => {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: any) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};

export default debounce;
