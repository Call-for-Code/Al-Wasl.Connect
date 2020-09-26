(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser", ["require", "exports", "@angular/localize", "path", "@angular/localize/src/tools/src/diagnostics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var localize_1 = require("@angular/localize");
    var path_1 = require("path");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    /**
     * A translation parser that can parse JSON that has the form:
     *
     * ```
     * {
     *   "locale": "...",
     *   "translations": {
     *     "message-id": "Target message string",
     *     ...
     *   }
     * }
     * ```
     */
    var SimpleJsonTranslationParser = /** @class */ (function () {
        function SimpleJsonTranslationParser() {
        }
        SimpleJsonTranslationParser.prototype.canParse = function (filePath, contents) {
            if (path_1.extname(filePath) !== '.json') {
                return false;
            }
            try {
                var json = JSON.parse(contents);
                return (typeof json.locale === 'string' && typeof json.translations === 'object') && json;
            }
            catch (_a) {
                return false;
            }
        };
        SimpleJsonTranslationParser.prototype.parse = function (_filePath, contents, json) {
            var _a = json || JSON.parse(contents), parsedLocale = _a.locale, translations = _a.translations;
            var parsedTranslations = {};
            for (var messageId in translations) {
                var targetMessage = translations[messageId];
                parsedTranslations[messageId] = localize_1.ɵparseTranslation(targetMessage);
            }
            return { locale: parsedLocale, translations: parsedTranslations, diagnostics: new diagnostics_1.Diagnostics() };
        };
        return SimpleJsonTranslationParser;
    }());
    exports.SimpleJsonTranslationParser = SimpleJsonTranslationParser;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlX2pzb25fdHJhbnNsYXRpb25fcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy9zaW1wbGVfanNvbl90cmFuc2xhdGlvbl9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBb0Y7SUFDcEYsNkJBQTZCO0lBQzdCLDJFQUFpRDtJQUdqRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSDtRQUFBO1FBc0JBLENBQUM7UUFyQkMsOENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsSUFBSSxjQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxFQUFFO2dCQUNqQyxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSTtnQkFDRixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO2FBQzNGO1lBQUMsV0FBTTtnQkFDTixPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQztRQUVELDJDQUFLLEdBQUwsVUFBTSxTQUFpQixFQUFFLFFBQWdCLEVBQUUsSUFBYTtZQUNoRCxJQUFBLGlDQUFtRSxFQUFsRSx3QkFBb0IsRUFBRSw4QkFBNEMsQ0FBQztZQUMxRSxJQUFNLGtCQUFrQixHQUEyQyxFQUFFLENBQUM7WUFDdEUsS0FBSyxJQUFNLFNBQVMsSUFBSSxZQUFZLEVBQUU7Z0JBQ3BDLElBQU0sYUFBYSxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsNEJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbEU7WUFDRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLElBQUkseUJBQVcsRUFBRSxFQUFDLENBQUM7UUFDbEcsQ0FBQztRQUNILGtDQUFDO0lBQUQsQ0FBQyxBQXRCRCxJQXNCQztJQXRCWSxrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge8m1TWVzc2FnZUlkLCDJtVBhcnNlZFRyYW5zbGF0aW9uLCDJtXBhcnNlVHJhbnNsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2xvY2FsaXplJztcbmltcG9ydCB7ZXh0bmFtZX0gZnJvbSAncGF0aCc7XG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge1BhcnNlZFRyYW5zbGF0aW9uQnVuZGxlLCBUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9wYXJzZXInO1xuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gcGFyc2VyIHRoYXQgY2FuIHBhcnNlIEpTT04gdGhhdCBoYXMgdGhlIGZvcm06XG4gKlxuICogYGBgXG4gKiB7XG4gKiAgIFwibG9jYWxlXCI6IFwiLi4uXCIsXG4gKiAgIFwidHJhbnNsYXRpb25zXCI6IHtcbiAqICAgICBcIm1lc3NhZ2UtaWRcIjogXCJUYXJnZXQgbWVzc2FnZSBzdHJpbmdcIixcbiAqICAgICAuLi5cbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBTaW1wbGVKc29uVHJhbnNsYXRpb25QYXJzZXIgaW1wbGVtZW50cyBUcmFuc2xhdGlvblBhcnNlcjxPYmplY3Q+IHtcbiAgY2FuUGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZyk6IE9iamVjdHxmYWxzZSB7XG4gICAgaWYgKGV4dG5hbWUoZmlsZVBhdGgpICE9PSAnLmpzb24nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShjb250ZW50cyk7XG4gICAgICByZXR1cm4gKHR5cGVvZiBqc29uLmxvY2FsZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGpzb24udHJhbnNsYXRpb25zID09PSAnb2JqZWN0JykgJiYganNvbjtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwYXJzZShfZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZywganNvbj86IE9iamVjdCk6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlIHtcbiAgICBjb25zdCB7bG9jYWxlOiBwYXJzZWRMb2NhbGUsIHRyYW5zbGF0aW9uc30gPSBqc29uIHx8IEpTT04ucGFyc2UoY29udGVudHMpO1xuICAgIGNvbnN0IHBhcnNlZFRyYW5zbGF0aW9uczogUmVjb3JkPMm1TWVzc2FnZUlkLCDJtVBhcnNlZFRyYW5zbGF0aW9uPiA9IHt9O1xuICAgIGZvciAoY29uc3QgbWVzc2FnZUlkIGluIHRyYW5zbGF0aW9ucykge1xuICAgICAgY29uc3QgdGFyZ2V0TWVzc2FnZSA9IHRyYW5zbGF0aW9uc1ttZXNzYWdlSWRdO1xuICAgICAgcGFyc2VkVHJhbnNsYXRpb25zW21lc3NhZ2VJZF0gPSDJtXBhcnNlVHJhbnNsYXRpb24odGFyZ2V0TWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiB7bG9jYWxlOiBwYXJzZWRMb2NhbGUsIHRyYW5zbGF0aW9uczogcGFyc2VkVHJhbnNsYXRpb25zLCBkaWFnbm9zdGljczogbmV3IERpYWdub3N0aWNzKCl9O1xuICB9XG59XG4iXX0=