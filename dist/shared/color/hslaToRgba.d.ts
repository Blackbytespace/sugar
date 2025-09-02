interface IHslaToRgbaResult {
    r: number;
    g: number;
    b: number;
    a: number;
    toString: () => string;
}
export default function hslaToRgba(h: string | number | any, s: any, l: any, a?: number): IHslaToRgbaResult;
export {};
