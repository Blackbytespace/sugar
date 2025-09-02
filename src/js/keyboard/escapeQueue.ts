import uniqid from '../string/uniqid.js';

/**
 * @name 		            escapeQueue
 * @namespace           js.keyboard
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * This funciton allows you to register actions to execute when user press the escape key.
 * It will take care of executing the last registered action first, then the others...
 * This function returns a SPromise instance on which you can call the `cancel` method to unregister your
 * action in the queue.
 * Note that you can get the current queue length by calling `escapeQueueLength()`.
 *
 * @param           {Function}          [callback=null]            The callback to call on pressing escape
 * @param         {Object}      [settings={}]    An option object to configure your hotkey. Here's the list of available settings:
 * @return      {SPromise}                       An SPromise instance that will be resolved when the user has pressed the escape key and that it's yout turn in the queue
 *
 * @setting         {HTMLElement}       [ctx=document]         Specify where to add the listener
 * @setting         {String}            [id=null]                   Specify an id. If specified, will before unqueue the previous item with the same id and add it again
 *
 * @todo      tests
 *
 * @snippet         escapeQueue($1).then(() => {
 *      $2
 * });
 *
 * @example    js
 * import { escapeQueue } from '@blackbyte/sugar/keyboard'
 * const promise = escapeQueue();
 * promise.then(() => {
 *      // do something...
 * });
 *
 * // if you want to cancel your subscription
 * promise.cancel();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TEscapeQueueSettings = {
  id?: string;
  ctx?: HTMLElement | Document | HTMLElement[] | Document[];
};

export type TEscapeQueueApi = {
  cancel: Function;
};

export type TEscapeQueueItem = {
  id: string;
  callback?: Function;
  resolve: Function;
};

export type TEscapeQueueResult = Promise<void> & {
  cancel: Function;
};

let _escapeQueue: TEscapeQueueItem[] = [];
const _escapeQueueMap = new WeakMap();
let _isEscaping = false;

class CancelablePromise extends Promise<void> {
  cancel() {}
}

export function escapeQueueLength(): number {
  return _escapeQueue.length;
}

export default function escapeQueue(
  callback?: Function,
  settings?: TEscapeQueueSettings,
): TEscapeQueueResult {
  const pro = new CancelablePromise((resolve) => {
    const finalSettings: TEscapeQueueSettings = {
      ctx: document,
      ...(settings ?? {}),
    };

    // @ts-ignore
    const roots: HTMLElement[] | Document[] = Array.isArray(finalSettings.ctx)
      ? finalSettings.ctx
      : [finalSettings.ctx];

    roots.forEach(($root) => {
      // make sure we only register 1 by ctx
      if (_escapeQueueMap.has($root)) return;
      _escapeQueueMap.set($root, true);

      $root.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !_escapeQueue.length || _isEscaping) {
          return;
        }

        // make sure to not escape multiple times
        // at once
        _isEscaping = true;
        setTimeout(() => {
          _isEscaping = false;
        });

        const queueItem = <TEscapeQueueItem>_escapeQueue.pop();
        queueItem.callback?.();
        queueItem.resolve();
      });
    });

    // create the queue item to register
    const queueItem: TEscapeQueueItem = {
      id: finalSettings.id ?? uniqid(),
      callback,
      resolve,
    };

    setTimeout(() => {
      pro.cancel = () => {
        _escapeQueue = _escapeQueue.filter((i) => i.id !== queueItem.id);
        Promise.resolve(pro);
      };
    });

    if (finalSettings.id) {
      const existing = <TEscapeQueueItem>(
        _escapeQueue.find((i) => i.id === finalSettings.id)
      );
      if (existing) {
        existing.callback = callback;
        existing.resolve = resolve;
      } else {
        _escapeQueue.push(queueItem);
      }
    } else {
      // add to the queue
      _escapeQueue.push(queueItem);
    }
  });

  return pro;
}
