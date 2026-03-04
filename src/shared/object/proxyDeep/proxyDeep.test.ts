import { test, expect } from 'vitest';
import proxyDeep from './proxyDeep.js';

test('proxyDeep', () => {
  // Test basic set operation
  const actions: any[] = [];
  const obj = { name: 'John', age: 30 };
  const proxied = proxyDeep(obj, (actionObj) => {
    actions.push(actionObj);
  });

  proxied.name = 'Jane';
  expect(proxied.name).toBe('Jane');
  expect(actions).toHaveLength(1);
  expect(actions[0].action).toBe('set');
  expect(actions[0].key).toBe('name');
  expect(actions[0].oldValue).toBe('John');
  expect(actions[0].value).toBe('Jane');
  expect(actions[0].path).toBe('name');

  // Test deep object proxying
  actions.length = 0;
  const deepObj = { user: { profile: { name: 'John' } } };
  const deepProxied = proxyDeep(deepObj, (actionObj) => {
    actions.push(actionObj);
  });

  deepProxied.user.profile.name = 'Jane';
  expect(deepProxied.user.profile.name).toBe('Jane');
  expect(actions).toHaveLength(1);
  expect(actions[0].path).toBe('user.profile.name');
  expect(actions[0].value).toBe('Jane');

  // Test property deletion
  actions.length = 0;
  const deleteObj = { a: 1, b: 2 };
  const deleteProxied = proxyDeep(deleteObj, (actionObj) => {
    actions.push(actionObj);
  });

  delete deleteProxied.a;
  expect(deleteProxied.a).toBeUndefined();
  expect(actions).toHaveLength(1);
  expect(actions[0].action).toBe('delete');
  expect(actions[0].key).toBe('a');
  expect(actions[0].oldValue).toBe(1);

  // Test array handling
  actions.length = 0;
  const arrayObj = { items: [1, 2, 3] };
  const arrayProxied = proxyDeep(arrayObj, (actionObj) => {
    actions.push(actionObj);
  });

  arrayProxied.items.push(4);
  expect(arrayProxied.items).toEqual([1, 2, 3, 4]);
  expect(actions.length).toBeGreaterThan(0);

  // Test revoke functionality
  actions.length = 0;
  const revokeObj = { count: 0 };
  const revokeProxied = proxyDeep(revokeObj, (actionObj) => {
    actions.push(actionObj);
  }) as any;

  revokeProxied.count = 1;
  expect(actions).toHaveLength(1);

  // Revoke the proxy
  const shallowCopy = revokeProxied.revoke();
  expect(shallowCopy.count).toBe(1);

  // After revoke, no more actions should be tracked
  actions.length = 0;
  revokeProxied.count = 2;
  expect(actions).toHaveLength(0);

  // Test settings - disable handleSet
  actions.length = 0;
  const noSetObj = { value: 'initial' };
  const noSetProxied = proxyDeep(noSetObj, (actionObj) => {
    actions.push(actionObj);
  }, { handleSet: false });

  noSetProxied.value = 'changed';
  // When handleSet is false, the set operation returns true but doesn't actually change the value
  expect(noSetProxied.value).toBe('initial'); // Value should remain unchanged
  expect(actions).toHaveLength(0); // No actions should be captured

  // Test settings - disable handleDelete
  actions.length = 0;
  const noDeleteObj = { temp: 'value' };
  const noDeleteProxied = proxyDeep(noDeleteObj, (actionObj) => {
    actions.push(actionObj);
  }, { handleDelete: false });

  delete noDeleteProxied.temp;
  // When handleDelete is false, the delete operation returns true but doesn't actually delete
  expect(noDeleteProxied.temp).toBe('value'); // Value should still exist
  expect(actions).toHaveLength(0); // No actions should be captured

  // Test settings - enable handleGet
  actions.length = 0;
  const getObj = { data: 'test' };
  const getProxied = proxyDeep(getObj, (actionObj) => {
    actions.push(actionObj);
    // Return undefined to use original value
    return undefined;
  }, { handleGet: true });

  const value = getProxied.data;
  expect(value).toBe('test');
  expect(actions).toHaveLength(1);
  expect(actions[0].action).toBe('get');
  expect(actions[0].key).toBe('data');

  // Test shallow mode (deep: false)
  actions.length = 0;
  const shallowObj = { nested: { value: 'test' } };
  const shallowProxied = proxyDeep(shallowObj, (actionObj) => {
    actions.push(actionObj);
  }, { deep: false });

  shallowProxied.nested.value = 'changed';
  expect(shallowProxied.nested.value).toBe('changed');
  // Should not capture deep changes when deep: false
  expect(actions).toHaveLength(0);

  // Test with null values
  actions.length = 0;
  const nullObj = { nullable: null };
  const nullProxied = proxyDeep(nullObj, (actionObj) => {
    actions.push(actionObj);
  });

  nullProxied.nullable = 'not null';
  expect(nullProxied.nullable).toBe('not null');
  expect(actions).toHaveLength(1);
  expect(actions[0].oldValue).toBe(null);

  // Test adding new properties
  actions.length = 0;
  const newPropObj = {};
  const newPropProxied = proxyDeep(newPropObj, (actionObj) => {
    actions.push(actionObj);
  }) as any;

  newPropProxied.newProp = 'added';
  expect(newPropProxied.newProp).toBe('added');
  expect(actions).toHaveLength(1);
  expect(actions[0].key).toBe('newProp');
  expect(actions[0].oldValue).toBeUndefined();
  expect(actions[0].value).toBe('added');
});