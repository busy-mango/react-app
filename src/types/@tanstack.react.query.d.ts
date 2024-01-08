import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  export interface QueryMeta {
    message?: string;
  }
}
