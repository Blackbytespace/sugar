import * as fs from 'fs';
import writeFileSync from '../fs/writeFileSync.js';
/**
 * @name            prependToFileSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to simply append a string to a file.
 *
 * @todo        tests
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {String}            content             The content to add to the file
 *
 * @snippet         prependToFileSync($1, $2)
 *
 * @example         js
 * import { prependToFileSync } from '@blackbyte/sugar/fs';
 * prependToFileSync('/my/cool/file.txt', 'Hello world');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function prependToFileSync(path, content) {
    if (!fs.existsSync(path)) {
        writeFileSync(path, content);
        return;
    }
    const currentContent = fs.readFileSync(path).toString();
    const newContent = `${content}\n${currentContent}`;
    fs.writeFileSync(path, newContent);
}
//# sourceMappingURL=prependToFileSync.js.map