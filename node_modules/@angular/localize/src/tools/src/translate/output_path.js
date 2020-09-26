(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/output_path", ["require", "exports", "tslib", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var path_1 = require("path");
    /**
     * Create a function that will compute the absolute path to where a translated file should be
     * written.
     *
     * The special `{{LOCALE}}` marker will be replaced with the locale code of the current translation.
     * @param outputFolder An absolute path to the folder containing this set of translations.
     */
    function getOutputPathFn(outputFolder) {
        var _a = tslib_1.__read(outputFolder.split('{{LOCALE}}'), 2), pre = _a[0], post = _a[1];
        return post === undefined ? function (_locale, relativePath) { return path_1.join(pre, relativePath); } :
            function (locale, relativePath) { return path_1.join(pre + locale + post, relativePath); };
    }
    exports.getOutputPathFn = getOutputPathFn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X3BhdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9vdXRwdXRfcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw2QkFBMEI7SUFNMUI7Ozs7OztPQU1HO0lBQ0gsU0FBZ0IsZUFBZSxDQUFDLFlBQW9CO1FBQzVDLElBQUEsd0RBQThDLEVBQTdDLFdBQUcsRUFBRSxZQUF3QyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBQyxPQUFPLEVBQUUsWUFBWSxJQUFLLE9BQUEsV0FBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1lBQ3BELFVBQUMsTUFBTSxFQUFFLFlBQVksSUFBSyxPQUFBLFdBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRSxZQUFZLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQztJQUNoRyxDQUFDO0lBSkQsMENBSUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge2pvaW59IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dFBhdGhGbiB7XG4gIChsb2NhbGU6IHN0cmluZywgcmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNvbXB1dGUgdGhlIGFic29sdXRlIHBhdGggdG8gd2hlcmUgYSB0cmFuc2xhdGVkIGZpbGUgc2hvdWxkIGJlXG4gKiB3cml0dGVuLlxuICpcbiAqIFRoZSBzcGVjaWFsIGB7e0xPQ0FMRX19YCBtYXJrZXIgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBsb2NhbGUgY29kZSBvZiB0aGUgY3VycmVudCB0cmFuc2xhdGlvbi5cbiAqIEBwYXJhbSBvdXRwdXRGb2xkZXIgQW4gYWJzb2x1dGUgcGF0aCB0byB0aGUgZm9sZGVyIGNvbnRhaW5pbmcgdGhpcyBzZXQgb2YgdHJhbnNsYXRpb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3V0cHV0UGF0aEZuKG91dHB1dEZvbGRlcjogc3RyaW5nKTogT3V0cHV0UGF0aEZuIHtcbiAgY29uc3QgW3ByZSwgcG9zdF0gPSBvdXRwdXRGb2xkZXIuc3BsaXQoJ3t7TE9DQUxFfX0nKTtcbiAgcmV0dXJuIHBvc3QgPT09IHVuZGVmaW5lZCA/IChfbG9jYWxlLCByZWxhdGl2ZVBhdGgpID0+IGpvaW4ocHJlLCByZWxhdGl2ZVBhdGgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChsb2NhbGUsIHJlbGF0aXZlUGF0aCkgPT4gam9pbihwcmUgKyBsb2NhbGUgKyBwb3N0LCByZWxhdGl2ZVBhdGgpO1xufVxuIl19