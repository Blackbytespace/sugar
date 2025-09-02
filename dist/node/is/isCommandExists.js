var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawnSync } from 'child_process';
/**
 * @name            isCommandExists
 * @namespace       node.is
 * @type            Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function allows you to check if a command exists on the system where the script is running
 *
 * @todo        tests
 *
 * @param       {String}            command         The command to check like "ls", "node", etc...
 * @return      {Promise}                           A promise fullfiled once the check has finished with true of false as value
 *
 * @snippet         isCommandExists($1)
 * await isCommandExists($1)
 *
 * @example         js
 * import { isCommandExists } from '@blackbyte/sugar/is';
 * await  isCommandExists('ls'); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function isCommandExists(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const isWin = process.platform === 'win32';
        const where = isWin ? 'where' : 'whereis';
        const out = spawnSync(where + ' ' + command, [], {
            encoding: 'utf8',
            shell: true,
        });
        if (!out.stdout)
            return false;
        return out.stdout.replace(`${command}:`, '').trim() !== '';
    });
}
//# sourceMappingURL=isCommandExists.js.map