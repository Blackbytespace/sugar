import countLineChars from './countLineChars.js';
export default function crop(text, length, settings = {}) {
    var _a, _b, _c, _d, _e;
    settings = Object.assign({ chars: '...', splitWords: false }, settings);
    text = text.replace(/\s/gm, '¯');
    // split the text on spaces or every characters if the splitWords settings is to true
    const splitReg = /(<([^>]+)>|\S|\s)/gm;
    const parts = text
        .split(splitReg)
        .filter((c) => {
        return (c !== undefined &&
            c !== ' ' &&
            c !== '' &&
            (c.length === 1 || c.match(/^</)));
    })
        .map((c) => {
        if (c === '¯')
            return ' ';
        return c;
    });
    // init the result text
    let result = '';
    let currentWord = '';
    let currentLength = 0;
    const openedHtmlTagsArray = [];
    for (let i = 0; i < parts.length; i++) {
        const c = parts[i];
        if (c.length === 1) {
            if (settings.splitWords) {
                // @ts-ignore
                if (currentLength + 1 + settings.chars.length <= length) {
                    result += c;
                    currentLength += 1;
                }
                else {
                    result += settings.chars;
                    // @ts-ignore
                    currentLength += settings.chars.length;
                    break;
                }
            }
            else {
                if (c !== ' ') {
                    currentWord += c;
                }
                else {
                    if (countLineChars(result) +
                        countLineChars(currentWord) +
                        // @ts-ignore
                        countLineChars(settings.chars) <=
                        length) {
                        result += currentWord;
                    }
                    else {
                        result = result.trim();
                        result += settings.chars;
                        break; // stop the loop execution...
                    }
                    // add the space
                    result += ' ';
                    // reset currentWord
                    currentWord = '';
                }
            }
            // if it's not a character of 1 letter
            // meaning that it's surely an html tag
        }
        else {
            if (currentWord !== '') {
                result += currentWord;
                currentWord = '';
            }
            // preparing the match regexp
            const closingHtmlTagMatch = c.match(/^<\//);
            const openingHtmlTagMatch = c.match(/^<[a-zA-Z]+.*>$/);
            const singleHtmlTagMatch = c.match(/^<[a-zA-Z]+.*\/>$/);
            // if it's a closing html tag
            if (singleHtmlTagMatch) {
                // we just add the single tag in the result
                result += singleHtmlTagMatch.input;
            }
            else if (closingHtmlTagMatch) {
                const tagName = (_b = (_a = closingHtmlTagMatch === null || closingHtmlTagMatch === void 0 ? void 0 : closingHtmlTagMatch.input) === null || _a === void 0 ? void 0 : _a.match(/^<\/(.*)>$/)) === null || _b === void 0 ? void 0 : _b[1];
                // check if this tag has been opened
                if (tagName && openedHtmlTagsArray.indexOf(tagName) !== -1) {
                    // the tag has been opened so we add it to the close
                    result += closingHtmlTagMatch.input;
                    // remove the tag from the opened array
                    openedHtmlTagsArray.splice(openedHtmlTagsArray.indexOf(tagName), 1);
                }
            }
            else if (openingHtmlTagMatch) {
                const tagName = (_e = (_d = (_c = openingHtmlTagMatch === null || openingHtmlTagMatch === void 0 ? void 0 : openingHtmlTagMatch.input) === null || _c === void 0 ? void 0 : _c.match) === null || _d === void 0 ? void 0 : _d.call(_c, /^<([a-zA-Z]+).*>$/)) === null || _e === void 0 ? void 0 : _e[1];
                // add the tag in the result
                result += openingHtmlTagMatch.input;
                // add the tag to the openedTagArray
                tagName && openedHtmlTagsArray.push(tagName);
            }
        }
    }
    // if we take care of html, make sure the opened tags are closed
    openedHtmlTagsArray.forEach((tag) => {
        result += `</${tag}>`;
    });
    return result;
}
//# sourceMappingURL=crop.js.map