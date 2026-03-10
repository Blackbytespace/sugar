import isCommandExists from './isCommandExists/isCommandExists.js';
import isDirectory from './isDirectory/isDirectory.js';
import isFile from './isFile/isFile.js';
import isFolder from './isFolder/isFolder.js';
import isSymlink from './isSymlink/isSymlink.js';

// mock some functions
const isVisible = () => false;
const isInViewport = () => false;
const isScrollable = () => false;

export * from '../../shared/is/_exports.js';
export {
  isCommandExists as __isCommandExists,
  isDirectory as __isDirectory,
  isFile as __isFile,
  isFolder as __isFolder,
  isInViewport as __isInViewport,
  isScrollable as __isScrollable,
  isSymlink as __isSymlink,
  isVisible as __isVisible,
  isCommandExists,
  isDirectory,
  isFile,
  isFolder,
  isInViewport,
  isScrollable,
  isSymlink,
  isVisible,
};
