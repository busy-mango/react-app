declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpe' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.svg?react' {
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
