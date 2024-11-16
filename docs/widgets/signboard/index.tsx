import { useEffect, useRef } from 'react';
// https://vscode.dev/github/easychen/CubismWebSamples-with-lip-sync?vscode-lang=zh-cn
export const Signboard: React.FC = () => {
  const { current: canvas } = useRef<HTMLCanvasElement>(null);

  const webGL = canvas?.getContext('webgl');

  if (canvas && !webGL) {
    throw new Error('Cannot initialize WebGL. This browser does not support.');
  }

  useEffect(() => {
    if (webGL) {
      const buffer = webGL.getParameter(
        webGL.FRAMEBUFFER_BINDING as number
      ) as unknown;
      // 透過設定
      webGL.enable(webGL.BLEND);
      webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);
    }
  }, [webGL]);

  // resize

  return <canvas></canvas>;
};
