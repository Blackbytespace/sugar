interface IHexToToRbaResult {
    r: number;
    g: number;
    b: number;
    a: number;
    toString: () => string;
}
export default function hexToRgba(hex: string): IHexToToRbaResult;
export {};
