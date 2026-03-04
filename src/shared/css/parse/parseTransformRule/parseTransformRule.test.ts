import { expect, test } from 'vitest';
import parseTransformRule from './parseTransformRule';

test('parseTransformRule', () => {
  // Test basic transform functions
  expect(parseTransformRule('translateX(100px)')).toEqual({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: '100px',
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  expect(parseTransformRule('translateY(50px)')).toEqual({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: 0,
    translateY: '50px',
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  expect(parseTransformRule('scaleX(2)')).toEqual({
    scale: 1,
    scaleX: 2,
    scaleY: 1,
    scaleZ: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  // Test multiple transform functions
  expect(parseTransformRule('translateX(100px) translateY(50px)')).toEqual({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: '100px',
    translateY: '50px',
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  // Test translate with multiple values
  expect(parseTransformRule('translate(100px, 50px)')).toEqual({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: '100px',
    translateY: '50px',
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  // Test scale with single value
  expect(parseTransformRule('scale(2)')).toEqual({
    scale: 2,
    scaleX: 2,
    scaleY: 2,
    scaleZ: 2,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  // Test empty string
  expect(parseTransformRule('')).toEqual({
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });

  // Test complex transform
  expect(
    parseTransformRule('translate(10px, 20px) scale(1.5) rotate(45deg)'),
  ).toEqual({
    scale: 1.5,
    scaleX: 1.5,
    scaleY: 1.5,
    scaleZ: 1.5,
    translateX: '10px',
    translateY: '20px',
    translateZ: 0,
    rotate: '45deg',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skew: 0,
    skewX: 0,
    skewY: 0,
  });
});
