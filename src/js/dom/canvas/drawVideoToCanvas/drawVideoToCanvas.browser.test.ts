import { beforeEach, describe, expect, it } from 'vitest';
import drawVideoToCanvas from './drawVideoToCanvas.js';

describe('drawVideoToCanvas (browser)', () => {
  let $video: HTMLVideoElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    $video = document.createElement('video');
    document.body.appendChild($video);
  });

  describe('return type', () => {
    it('should return an HTMLCanvasElement', () => {
      const $canvas = drawVideoToCanvas($video);
      expect($canvas).toBeInstanceOf(HTMLCanvasElement);
    });
  });

  describe('canvas creation', () => {
    it('should create a new canvas when none is provided', () => {
      const $canvas = drawVideoToCanvas($video);
      expect($canvas).toBeInstanceOf(HTMLCanvasElement);
    });

    it('should use the provided canvas when passed', () => {
      const $existingCanvas = document.createElement('canvas');
      const $result = drawVideoToCanvas($video, $existingCanvas);
      expect($result).toBe($existingCanvas);
    });
  });

  describe('canvas size', () => {
    it('should set canvas width attribute to video videoWidth', () => {
      // videoWidth is 0 for a video with no source
      const $canvas = drawVideoToCanvas($video);
      expect($canvas.width).toBe($video.videoWidth);
    });

    it('should set canvas height attribute to video videoHeight', () => {
      const $canvas = drawVideoToCanvas($video);
      expect($canvas.height).toBe($video.videoHeight);
    });

    it('should set canvas style width from videoWidth', () => {
      const $canvas = drawVideoToCanvas($video);
      expect($canvas.style.maxWidth).toBe('100%');
    });
  });

  describe('canvas context', () => {
    it('should not throw when drawing a video with no src', () => {
      expect(() => drawVideoToCanvas($video)).not.toThrow();
    });
  });
});
