export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};
