import { createServer } from 'net';

type NodeError = NodeJS.ErrnoException;

/** 判断目标端口是否存在 */
export const isPortExists = (port: number, host: string) =>
  new Promise<boolean>((resolve, reject) => {
    const server = createServer()
      .once('error', (error: NodeError) => {
        if (error.code === 'EADDRINUSE') {
          resolve(false);
        }
        reject(error);
      })
      .once('listening', () => {
        server.close();
      })
      .once('close', () => {
        resolve(true);
      })
      .listen(port, host);
  });

/** 逐个寻找可用的端口 */
export const iUsablePort = async (
  /** 起始端口 */
  beginning: number,
  /** 终止端口 */
  finishing: number,
  /** 查询域名 */
  hostname: string
) => {
  const length = finishing - beginning;
  const range = Array.from({ length }, (_, i) => i);

  for (const iterator of range) {
    const current = beginning + iterator;
    const exists = await isPortExists(current, hostname);
    if (exists) return current;
  }
};
