(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/source_files/es5_translate_plugin", ["require", "exports", "@angular/localize/src/tools/src/translate/source_files/source_file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var source_file_utils_1 = require("@angular/localize/src/tools/src/translate/source_files/source_file_utils");
    function makeEs5TranslatePlugin(diagnostics, translations, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.missingTranslation, missingTranslation = _c === void 0 ? 'error' : _c, _d = _b.localizeName, localizeName = _d === void 0 ? '$localize' : _d;
        return {
            visitor: {
                CallExpression: function (callPath) {
                    try {
                        var calleePath = callPath.get('callee');
                        if (source_file_utils_1.isLocalize(calleePath, localizeName)) {
                            var messageParts = source_file_utils_1.unwrapMessagePartsFromLocalizeCall(callPath);
                            var expressions = source_file_utils_1.unwrapSubstitutionsFromLocalizeCall(callPath.node);
                            var translated = source_file_utils_1.translate(diagnostics, translations, messageParts, expressions, missingTranslation);
                            callPath.replaceWith(source_file_utils_1.buildLocalizeReplacement(translated[0], translated[1]));
                        }
                    }
                    catch (e) {
                        if (source_file_utils_1.isBabelParseError(e)) {
                            diagnostics.error(source_file_utils_1.buildCodeFrameError(callPath, e));
                        }
                    }
                }
            }
        };
    }
    exports.makeEs5TranslatePlugin = makeEs5TranslatePlugin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXM1X3RyYW5zbGF0ZV9wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS9zb3VyY2VfZmlsZXMvZXM1X3RyYW5zbGF0ZV9wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFhQSw4R0FBNk47SUFFN04sU0FBZ0Isc0JBQXNCLENBQ2xDLFdBQXdCLEVBQUUsWUFBZ0QsRUFDMUUsRUFBdUY7WUFBdkYsNEJBQXVGLEVBQXRGLDBCQUE0QixFQUE1QixpREFBNEIsRUFBRSxvQkFBMEIsRUFBMUIsK0NBQTBCO1FBRTNELE9BQU87WUFDTCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFkLFVBQWUsUUFBa0M7b0JBQy9DLElBQUk7d0JBQ0YsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSw4QkFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsRUFBRTs0QkFDeEMsSUFBTSxZQUFZLEdBQUcsc0RBQWtDLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ2xFLElBQU0sV0FBVyxHQUFHLHVEQUFtQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDdkUsSUFBTSxVQUFVLEdBQ1osNkJBQVMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs0QkFDeEYsUUFBUSxDQUFDLFdBQVcsQ0FBQyw0Q0FBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUU7cUJBQ0Y7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsSUFBSSxxQ0FBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyx1Q0FBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckQ7cUJBQ0Y7Z0JBQ0gsQ0FBQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUF4QkQsd0RBd0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHvJtVBhcnNlZFRyYW5zbGF0aW9ufSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5pbXBvcnQge05vZGVQYXRoLCBQbHVnaW5PYmp9IGZyb20gJ0BiYWJlbC9jb3JlJztcbmltcG9ydCB7Q2FsbEV4cHJlc3Npb259IGZyb20gJ0BiYWJlbC90eXBlcyc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uL2RpYWdub3N0aWNzJztcblxuaW1wb3J0IHtidWlsZENvZGVGcmFtZUVycm9yLCBidWlsZExvY2FsaXplUmVwbGFjZW1lbnQsIGlzQmFiZWxQYXJzZUVycm9yLCBpc0xvY2FsaXplLCB0cmFuc2xhdGUsIFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnMsIHVud3JhcE1lc3NhZ2VQYXJ0c0Zyb21Mb2NhbGl6ZUNhbGwsIHVud3JhcFN1YnN0aXR1dGlvbnNGcm9tTG9jYWxpemVDYWxsfSBmcm9tICcuL3NvdXJjZV9maWxlX3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFczVUcmFuc2xhdGVQbHVnaW4oXG4gICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCB0cmFuc2xhdGlvbnM6IFJlY29yZDxzdHJpbmcsIMm1UGFyc2VkVHJhbnNsYXRpb24+LFxuICAgIHttaXNzaW5nVHJhbnNsYXRpb24gPSAnZXJyb3InLCBsb2NhbGl6ZU5hbWUgPSAnJGxvY2FsaXplJ306IFRyYW5zbGF0ZVBsdWdpbk9wdGlvbnMgPSB7fSk6XG4gICAgUGx1Z2luT2JqIHtcbiAgcmV0dXJuIHtcbiAgICB2aXNpdG9yOiB7XG4gICAgICBDYWxsRXhwcmVzc2lvbihjYWxsUGF0aDogTm9kZVBhdGg8Q2FsbEV4cHJlc3Npb24+KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY2FsbGVlUGF0aCA9IGNhbGxQYXRoLmdldCgnY2FsbGVlJyk7XG4gICAgICAgICAgaWYgKGlzTG9jYWxpemUoY2FsbGVlUGF0aCwgbG9jYWxpemVOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVBhcnRzID0gdW53cmFwTWVzc2FnZVBhcnRzRnJvbUxvY2FsaXplQ2FsbChjYWxsUGF0aCk7XG4gICAgICAgICAgICBjb25zdCBleHByZXNzaW9ucyA9IHVud3JhcFN1YnN0aXR1dGlvbnNGcm9tTG9jYWxpemVDYWxsKGNhbGxQYXRoLm5vZGUpO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlZCA9XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKGRpYWdub3N0aWNzLCB0cmFuc2xhdGlvbnMsIG1lc3NhZ2VQYXJ0cywgZXhwcmVzc2lvbnMsIG1pc3NpbmdUcmFuc2xhdGlvbik7XG4gICAgICAgICAgICBjYWxsUGF0aC5yZXBsYWNlV2l0aChidWlsZExvY2FsaXplUmVwbGFjZW1lbnQodHJhbnNsYXRlZFswXSwgdHJhbnNsYXRlZFsxXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChpc0JhYmVsUGFyc2VFcnJvcihlKSkge1xuICAgICAgICAgICAgZGlhZ25vc3RpY3MuZXJyb3IoYnVpbGRDb2RlRnJhbWVFcnJvcihjYWxsUGF0aCwgZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==