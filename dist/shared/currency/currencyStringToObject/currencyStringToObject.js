import currencySymbolMap from 'currency-symbol-map';
export default function currencyStringToObject(currency) {
    var _a;
    // get the amount
    const amount = parseFloat(currency);
    // get the symbol or code
    const codeOrSymbol = currency.replace(/[0-9\.\,]+/gm, '').trim();
    // @ts-ignore
    const symbolMap = currencySymbolMap.currencySymbolMap;
    // try to find the code and symbol
    let code = '', symbol = '';
    if (symbolMap[codeOrSymbol]) {
        code = codeOrSymbol;
        symbol = symbolMap[codeOrSymbol];
    }
    else {
        code =
            (_a = Object.keys(symbolMap).find((key) => symbolMap[key] === codeOrSymbol)) !== null && _a !== void 0 ? _a : '';
        symbol = codeOrSymbol;
    }
    return {
        amount: amount,
        code,
        symbol,
    };
}
//# sourceMappingURL=currencyStringToObject.js.map