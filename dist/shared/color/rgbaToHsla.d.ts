export type TRgbaToHslaResult = {
    h: number;
    s: number;
    l: number;
    a: number;
    toString: () => string;
};
export default function rgbaToHsla(r: string | number | any, g: number, b: number, a?: number): TRgbaToHslaResult;
