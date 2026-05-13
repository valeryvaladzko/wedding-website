declare module "qrcode" {
  interface BaseOptions {
    margin?: number;
    color?: { dark?: string; light?: string };
    errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  }
  interface ToFileOptions extends BaseOptions {
    width?: number;
  }
  interface ToStringOptions extends BaseOptions {
    type?: "svg" | "utf8" | "terminal";
    width?: number;
  }
  interface BitMatrix {
    size: number;
    data: Uint8Array;
    get(row: number, col: number): number;
  }
  interface QRCodeData {
    modules: BitMatrix;
    version: number;
  }

  function toFile(
    path: string,
    text: string,
    options?: ToFileOptions,
  ): Promise<void>;
  function toString(text: string, options?: ToStringOptions): Promise<string>;
  function create(text: string, options?: BaseOptions): QRCodeData;

  const QRCode: {
    toFile: typeof toFile;
    toString: typeof toString;
    create: typeof create;
  };
  export default QRCode;
  export { toFile, toString, create };
}
