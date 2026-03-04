import { test, expect } from 'vitest';
import isCommandExists from './isCommandExists.js';

test('isCommandExists', async () => {
  // Test with common system commands that should exist

  // Test commands that should exist on most systems
  const nodeExists = await isCommandExists('node');
  expect(typeof nodeExists).toBe('boolean');
  expect(nodeExists).toBe(true); // Node should exist since we're running this test with it

  const npmExists = await isCommandExists('npm');
  expect(typeof npmExists).toBe('boolean');
  expect(npmExists).toBe(true); // npm should exist in most Node.js environments

  // Test platform-specific commands that should exist
  const isWin = process.platform === 'win32';

  if (isWin) {
    // Windows-specific commands
    const dirExists = await isCommandExists('dir');
    expect(typeof dirExists).toBe('boolean');
    expect(dirExists).toBe(true);

    const echoExists = await isCommandExists('echo');
    expect(typeof echoExists).toBe('boolean');
    expect(echoExists).toBe(true);
  } else {
    // Unix/Linux/macOS commands
    const lsExists = await isCommandExists('ls');
    expect(typeof lsExists).toBe('boolean');
    expect(lsExists).toBe(true);

    const echoExists = await isCommandExists('echo');
    expect(typeof echoExists).toBe('boolean');
    expect(echoExists).toBe(true);

    const catExists = await isCommandExists('cat');
    expect(typeof catExists).toBe('boolean');
    expect(catExists).toBe(true);
  }

  // Test command that should NOT exist - use very specific fake names
  const fakeCommandExists = await isCommandExists('xxxx-nonexistent-cmd-xxxx');
  expect(typeof fakeCommandExists).toBe('boolean');
  expect(fakeCommandExists).toBe(false);

  // Test with another non-existent command
  const anotherFakeCommand = await isCommandExists('yyyy-fake-command-yyyy');
  expect(typeof anotherFakeCommand).toBe('boolean');
  expect(anotherFakeCommand).toBe(false);

  // Test edge cases that should be safe

  // Test with empty string
  const emptyCommand = await isCommandExists('');
  expect(typeof emptyCommand).toBe('boolean');
  expect(emptyCommand).toBe(false);

  // Test with numeric command names (unlikely to exist)
  const numericCommand = await isCommandExists('123456789');
  expect(typeof numericCommand).toBe('boolean');
  expect(numericCommand).toBe(false);

  // Test commands with dashes (common pattern, but these should not exist)
  const dashCommand = await isCommandExists('zzzz-non-existent-command-zzzz');
  expect(typeof dashCommand).toBe('boolean');
  expect(dashCommand).toBe(false);

  // Test return type consistency
  // The function should always return a boolean in practice
  const result1 = await isCommandExists('node');
  expect(typeof result1).toBe('boolean');

  const result2 = await isCommandExists('zzzz-nonexistent-zzzz');
  expect(typeof result2).toBe('boolean');

  // Test multiple calls to ensure function is stable
  const firstCall = await isCommandExists('node');
  const secondCall = await isCommandExists('node');
  expect(firstCall).toBe(secondCall);

  // Test commands that might exist depending on the system
  const gitExists = await isCommandExists('git');
  expect(typeof gitExists).toBe('boolean');
  // We don't assert true/false since git might not be installed

  // Performance test - function should complete reasonably quickly
  const startTime = Date.now();
  await isCommandExists('node');
  const endTime = Date.now();
  const duration = endTime - startTime;
  expect(duration).toBeLessThan(5000); // Should complete within 5 seconds

  // Test concurrent calls with safe commands
  const concurrentPromises = [
    isCommandExists('node'),
    isCommandExists('npm'),
    isCommandExists('aaaa-nonexistent1-aaaa'),
    isCommandExists('bbbb-nonexistent2-bbbb'),
  ];

  const concurrentResults = await Promise.all(concurrentPromises);
  expect(concurrentResults).toHaveLength(4);
  expect(concurrentResults[0]).toBe(true); // node
  expect(concurrentResults[1]).toBe(true); // npm
  expect(concurrentResults[2]).toBe(false); // nonexistent1
  expect(concurrentResults[3]).toBe(false); // nonexistent2

  // Verify all results are booleans
  concurrentResults.forEach((result) => {
    expect(typeof result).toBe('boolean');
  });
});
