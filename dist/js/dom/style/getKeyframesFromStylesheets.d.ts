import { TTransformedKeyframeDeclaration } from './transformKeyframesDeclarations.js';
export type TKeyframe = {
    delay?: number;
    direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
    duration: number;
    fillMode: 'none' | 'forwards' | 'backwards' | 'both' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
    iterationCount: 'infinite' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset' | number;
    keyframes: TTransformedKeyframeDeclaration[];
    name: string;
    playState: 'paused' | 'running' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
    timingFunction: string;
};
export default function getKeyframesFromStylesheets(animationName: any, styleSheets: any): TKeyframe[];
