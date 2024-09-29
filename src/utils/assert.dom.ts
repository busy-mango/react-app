export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};

export const isTextAreaElement = (
  target: unknown
): target is HTMLInputElement => {
  return target instanceof HTMLTextAreaElement;
};
