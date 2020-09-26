(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_loader", ["require", "exports", "tslib", "@angular/localize/src/tools/src/file_utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var file_utils_1 = require("@angular/localize/src/tools/src/file_utils");
    /**
     * Use this class to load a collection of translation files from disk.
     */
    var TranslationLoader = /** @class */ (function () {
        function TranslationLoader(translationParsers, 
        /** @deprecated */ diagnostics) {
            this.translationParsers = translationParsers;
            this.diagnostics = diagnostics;
        }
        /**
         * Load and parse the translation files into a collection of `TranslationBundles`.
         *
         * If there is a locale provided in `translationFileLocales` then this is used rather than the
         * locale extracted from the file itself.
         * If there is neither a provided locale nor a locale parsed from the file, then an error is
         * thrown.
         * If there are both a provided locale and a locale parsed from the file, and they are not the
         * same, then a warning is reported .
         *
         * @param translationFilePaths An array of absolute paths to the translation files.
         * @param translationFileLocales An array of locales for each of the translation files.
         */
        TranslationLoader.prototype.loadBundles = function (translationFilePaths, translationFileLocales) {
            var _this = this;
            return translationFilePaths.map(function (filePath, index) {
                var e_1, _a, _b;
                var fileContents = file_utils_1.FileUtils.readFile(filePath);
                try {
                    for (var _c = tslib_1.__values(_this.translationParsers), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var translationParser = _d.value;
                        var result = translationParser.canParse(filePath, fileContents);
                        if (!result) {
                            continue;
                        }
                        var _e = translationParser.parse(filePath, fileContents, result), parsedLocale = _e.locale, translations = _e.translations, diagnostics = _e.diagnostics;
                        if (diagnostics.hasErrors) {
                            throw new Error(diagnostics.formatDiagnostics("The translation file \"" + filePath + "\" could not be parsed."));
                        }
                        var providedLocale = translationFileLocales[index];
                        var locale = providedLocale || parsedLocale;
                        if (locale === undefined) {
                            throw new Error("The translation file \"" + filePath + "\" does not contain a target locale and no explicit locale was provided for this file.");
                        }
                        if (parsedLocale !== undefined && providedLocale !== undefined &&
                            parsedLocale !== providedLocale) {
                            diagnostics.warn("The provided locale \"" + providedLocale + "\" does not match the target locale \"" + parsedLocale + "\" found in the translation file \"" + filePath + "\".");
                        }
                        // If we were passed a diagnostics object then copy the messages over to it.
                        if (_this.diagnostics) {
                            (_b = _this.diagnostics.messages).push.apply(_b, tslib_1.__spread(diagnostics.messages));
                        }
                        return { locale: locale, translations: translations, diagnostics: diagnostics };
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                throw new Error("There is no \"TranslationParser\" that can parse this translation file: " + filePath + ".");
            });
        };
        return TranslationLoader;
    }());
    exports.TranslationLoader = TranslationLoader;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLHlFQUEyQztJQUkzQzs7T0FFRztJQUNIO1FBQ0UsMkJBQ1ksa0JBQTRDO1FBQ3BELGtCQUFrQixDQUFTLFdBQXlCO1lBRDVDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBMEI7WUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQWM7UUFBRyxDQUFDO1FBRTVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILHVDQUFXLEdBQVgsVUFBWSxvQkFBOEIsRUFBRSxzQkFBNEM7WUFBeEYsaUJBeUNDO1lBdkNDLE9BQU8sb0JBQW9CLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7O2dCQUM5QyxJQUFNLFlBQVksR0FBRyxzQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7b0JBQ2xELEtBQWdDLElBQUEsS0FBQSxpQkFBQSxLQUFJLENBQUMsa0JBQWtCLENBQUEsZ0JBQUEsNEJBQUU7d0JBQXBELElBQU0saUJBQWlCLFdBQUE7d0JBQzFCLElBQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ2xFLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsU0FBUzt5QkFDVjt3QkFFSyxJQUFBLDREQUNxRCxFQURwRCx3QkFBb0IsRUFBRSw4QkFBWSxFQUFFLDRCQUNnQixDQUFDO3dCQUM1RCxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7NEJBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUN6Qyw0QkFBeUIsUUFBUSw0QkFBd0IsQ0FBQyxDQUFDLENBQUM7eUJBQ2pFO3dCQUVELElBQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNyRCxJQUFNLE1BQU0sR0FBRyxjQUFjLElBQUksWUFBWSxDQUFDO3dCQUM5QyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7NEJBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQ1osUUFBUSwyRkFBdUYsQ0FBQyxDQUFDO3lCQUN0Rzt3QkFFRCxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksY0FBYyxLQUFLLFNBQVM7NEJBQzFELFlBQVksS0FBSyxjQUFjLEVBQUU7NEJBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQ1osMkJBQXdCLGNBQWMsOENBQ2xDLFlBQVksMkNBQW9DLFFBQVEsUUFBSSxDQUFDLENBQUM7eUJBQ3ZFO3dCQUVELDRFQUE0RTt3QkFDNUUsSUFBSSxLQUFJLENBQUMsV0FBVyxFQUFFOzRCQUNwQixDQUFBLEtBQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUEsQ0FBQyxJQUFJLDRCQUFJLFdBQVcsQ0FBQyxRQUFRLEdBQUU7eUJBQ3pEO3dCQUVELE9BQU8sRUFBQyxNQUFNLFFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBQyxDQUFDO3FCQUM1Qzs7Ozs7Ozs7O2dCQUNELE1BQU0sSUFBSSxLQUFLLENBQ1gsNkVBQXlFLFFBQVEsTUFBRyxDQUFDLENBQUM7WUFDNUYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0gsd0JBQUM7SUFBRCxDQUFDLEFBNURELElBNERDO0lBNURZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7RmlsZVV0aWxzfSBmcm9tICcuLi8uLi9maWxlX3V0aWxzJztcbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGV9IGZyb20gJy4uL3RyYW5zbGF0b3InO1xuaW1wb3J0IHtUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9wYXJzZXJzL3RyYW5zbGF0aW9uX3BhcnNlcic7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gbG9hZCBhIGNvbGxlY3Rpb24gb2YgdHJhbnNsYXRpb24gZmlsZXMgZnJvbSBkaXNrLlxuICovXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRpb25Mb2FkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgdHJhbnNsYXRpb25QYXJzZXJzOiBUcmFuc2xhdGlvblBhcnNlcjxhbnk+W10sXG4gICAgICAvKiogQGRlcHJlY2F0ZWQgKi8gcHJpdmF0ZSBkaWFnbm9zdGljcz86IERpYWdub3N0aWNzKSB7fVxuXG4gIC8qKlxuICAgKiBMb2FkIGFuZCBwYXJzZSB0aGUgdHJhbnNsYXRpb24gZmlsZXMgaW50byBhIGNvbGxlY3Rpb24gb2YgYFRyYW5zbGF0aW9uQnVuZGxlc2AuXG4gICAqXG4gICAqIElmIHRoZXJlIGlzIGEgbG9jYWxlIHByb3ZpZGVkIGluIGB0cmFuc2xhdGlvbkZpbGVMb2NhbGVzYCB0aGVuIHRoaXMgaXMgdXNlZCByYXRoZXIgdGhhbiB0aGVcbiAgICogbG9jYWxlIGV4dHJhY3RlZCBmcm9tIHRoZSBmaWxlIGl0c2VsZi5cbiAgICogSWYgdGhlcmUgaXMgbmVpdGhlciBhIHByb3ZpZGVkIGxvY2FsZSBub3IgYSBsb2NhbGUgcGFyc2VkIGZyb20gdGhlIGZpbGUsIHRoZW4gYW4gZXJyb3IgaXNcbiAgICogdGhyb3duLlxuICAgKiBJZiB0aGVyZSBhcmUgYm90aCBhIHByb3ZpZGVkIGxvY2FsZSBhbmQgYSBsb2NhbGUgcGFyc2VkIGZyb20gdGhlIGZpbGUsIGFuZCB0aGV5IGFyZSBub3QgdGhlXG4gICAqIHNhbWUsIHRoZW4gYSB3YXJuaW5nIGlzIHJlcG9ydGVkIC5cbiAgICpcbiAgICogQHBhcmFtIHRyYW5zbGF0aW9uRmlsZVBhdGhzIEFuIGFycmF5IG9mIGFic29sdXRlIHBhdGhzIHRvIHRoZSB0cmFuc2xhdGlvbiBmaWxlcy5cbiAgICogQHBhcmFtIHRyYW5zbGF0aW9uRmlsZUxvY2FsZXMgQW4gYXJyYXkgb2YgbG9jYWxlcyBmb3IgZWFjaCBvZiB0aGUgdHJhbnNsYXRpb24gZmlsZXMuXG4gICAqL1xuICBsb2FkQnVuZGxlcyh0cmFuc2xhdGlvbkZpbGVQYXRoczogc3RyaW5nW10sIHRyYW5zbGF0aW9uRmlsZUxvY2FsZXM6IChzdHJpbmd8dW5kZWZpbmVkKVtdKTpcbiAgICAgIFRyYW5zbGF0aW9uQnVuZGxlW10ge1xuICAgIHJldHVybiB0cmFuc2xhdGlvbkZpbGVQYXRocy5tYXAoKGZpbGVQYXRoLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZmlsZUNvbnRlbnRzID0gRmlsZVV0aWxzLnJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgICAgIGZvciAoY29uc3QgdHJhbnNsYXRpb25QYXJzZXIgb2YgdGhpcy50cmFuc2xhdGlvblBhcnNlcnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdHJhbnNsYXRpb25QYXJzZXIuY2FuUGFyc2UoZmlsZVBhdGgsIGZpbGVDb250ZW50cyk7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7bG9jYWxlOiBwYXJzZWRMb2NhbGUsIHRyYW5zbGF0aW9ucywgZGlhZ25vc3RpY3N9ID1cbiAgICAgICAgICAgIHRyYW5zbGF0aW9uUGFyc2VyLnBhcnNlKGZpbGVQYXRoLCBmaWxlQ29udGVudHMsIHJlc3VsdCk7XG4gICAgICAgIGlmIChkaWFnbm9zdGljcy5oYXNFcnJvcnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGlhZ25vc3RpY3MuZm9ybWF0RGlhZ25vc3RpY3MoXG4gICAgICAgICAgICAgIGBUaGUgdHJhbnNsYXRpb24gZmlsZSBcIiR7ZmlsZVBhdGh9XCIgY291bGQgbm90IGJlIHBhcnNlZC5gKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm92aWRlZExvY2FsZSA9IHRyYW5zbGF0aW9uRmlsZUxvY2FsZXNbaW5kZXhdO1xuICAgICAgICBjb25zdCBsb2NhbGUgPSBwcm92aWRlZExvY2FsZSB8fCBwYXJzZWRMb2NhbGU7XG4gICAgICAgIGlmIChsb2NhbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHRyYW5zbGF0aW9uIGZpbGUgXCIke1xuICAgICAgICAgICAgICBmaWxlUGF0aH1cIiBkb2VzIG5vdCBjb250YWluIGEgdGFyZ2V0IGxvY2FsZSBhbmQgbm8gZXhwbGljaXQgbG9jYWxlIHdhcyBwcm92aWRlZCBmb3IgdGhpcyBmaWxlLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnNlZExvY2FsZSAhPT0gdW5kZWZpbmVkICYmIHByb3ZpZGVkTG9jYWxlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIHBhcnNlZExvY2FsZSAhPT0gcHJvdmlkZWRMb2NhbGUpIHtcbiAgICAgICAgICBkaWFnbm9zdGljcy53YXJuKFxuICAgICAgICAgICAgICBgVGhlIHByb3ZpZGVkIGxvY2FsZSBcIiR7cHJvdmlkZWRMb2NhbGV9XCIgZG9lcyBub3QgbWF0Y2ggdGhlIHRhcmdldCBsb2NhbGUgXCIke1xuICAgICAgICAgICAgICAgICAgcGFyc2VkTG9jYWxlfVwiIGZvdW5kIGluIHRoZSB0cmFuc2xhdGlvbiBmaWxlIFwiJHtmaWxlUGF0aH1cIi5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlIHdlcmUgcGFzc2VkIGEgZGlhZ25vc3RpY3Mgb2JqZWN0IHRoZW4gY29weSB0aGUgbWVzc2FnZXMgb3ZlciB0byBpdC5cbiAgICAgICAgaWYgKHRoaXMuZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgICB0aGlzLmRpYWdub3N0aWNzLm1lc3NhZ2VzLnB1c2goLi4uZGlhZ25vc3RpY3MubWVzc2FnZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtsb2NhbGUsIHRyYW5zbGF0aW9ucywgZGlhZ25vc3RpY3N9O1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBUaGVyZSBpcyBubyBcIlRyYW5zbGF0aW9uUGFyc2VyXCIgdGhhdCBjYW4gcGFyc2UgdGhpcyB0cmFuc2xhdGlvbiBmaWxlOiAke2ZpbGVQYXRofS5gKTtcbiAgICB9KTtcbiAgfVxufVxuIl19