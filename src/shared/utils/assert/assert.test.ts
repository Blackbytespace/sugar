import{test,expect}from'vitest'
import assert from'./assert'
test('assert',()=>{expect(()=>assert(true,'should not throw')).not.toThrow();expect(()=>assert(false,'should throw')).toThrow('should throw');expect(()=>assert(1,'truthy')).not.toThrow();expect(()=>assert(0,'falsy')).toThrow('falsy')})