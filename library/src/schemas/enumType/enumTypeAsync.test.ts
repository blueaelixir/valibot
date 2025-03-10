import { describe, expect, test } from 'vitest';
import { parseAsync } from '../../methods/index.ts';
import { enumTypeAsync } from './enumTypeAsync.ts';

describe('enumTypeAsync', () => {
  test('should pass only enum values', async () => {
    const schema = enumTypeAsync(['value_1', 'value_2']);
    const input1 = 'value_1';
    const output1 = await parseAsync(schema, input1);
    expect(output1).toBe(input1);
    const input2 = 'value_2';
    const output2 = await parseAsync(schema, input2);
    expect(output2).toBe(input2);
    await expect(parseAsync(schema, 123)).rejects.toThrowError();
    await expect(parseAsync(schema, 'value_3')).rejects.toThrowError();
    await expect(parseAsync(schema, {})).rejects.toThrowError();
  });

  test('should throw custom error', async () => {
    const error = 'Value is not a enum value!';
    await expect(
      parseAsync(enumTypeAsync(['value_1'], error), 'test')
    ).rejects.toThrowError(error);
  });
});
