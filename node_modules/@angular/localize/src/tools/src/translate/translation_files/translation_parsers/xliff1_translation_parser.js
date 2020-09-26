(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/xliff1_translation_parser", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/diagnostics", "@angular/localize/src/tools/src/translate/translation_files/base_visitor", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer", "@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils"], factory);
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
    var compiler_1 = require("@angular/compiler");
    var diagnostics_1 = require("@angular/localize/src/tools/src/diagnostics");
    var base_visitor_1 = require("@angular/localize/src/tools/src/translate/translation_files/base_visitor");
    var message_serializer_1 = require("@angular/localize/src/tools/src/translate/translation_files/message_serialization/message_serializer");
    var target_message_renderer_1 = require("@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer");
    var translation_utils_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils");
    /**
     * A translation parser that can load XLIFF 1.2 files.
     *
     * http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
     * http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
     *
     */
    var Xliff1TranslationParser = /** @class */ (function () {
        function Xliff1TranslationParser() {
        }
        Xliff1TranslationParser.prototype.canParse = function (filePath, contents) {
            return translation_utils_1.canParseXml(filePath, contents, 'xliff', { version: '1.2' });
        };
        Xliff1TranslationParser.prototype.parse = function (filePath, contents, hint) {
            if (hint) {
                return this.extractBundle(hint);
            }
            else {
                return this.extractBundleDeprecated(filePath, contents);
            }
        };
        Xliff1TranslationParser.prototype.extractBundle = function (_a) {
            var e_1, _b;
            var element = _a.element, errors = _a.errors;
            var diagnostics = new diagnostics_1.Diagnostics();
            errors.forEach(function (e) { return translation_utils_1.addParseError(diagnostics, e); });
            if (element.children.length === 0) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, 'Missing expected <file> element', compiler_1.ParseErrorLevel.WARNING);
                return { locale: undefined, translations: {}, diagnostics: diagnostics };
            }
            var files = element.children.filter(translation_utils_1.isNamedElement('file'));
            if (files.length === 0) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, 'No <file> elements found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            else if (files.length > 1) {
                translation_utils_1.addParseDiagnostic(diagnostics, files[1].sourceSpan, 'More than one <file> element found in <xliff>', compiler_1.ParseErrorLevel.WARNING);
            }
            var bundle = { locale: undefined, translations: {}, diagnostics: diagnostics };
            var translationVisitor = new XliffTranslationVisitor();
            var localesFound = new Set();
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    var locale = translation_utils_1.getAttribute(file, 'target-language');
                    if (locale !== undefined) {
                        localesFound.add(locale);
                        bundle.locale = locale;
                    }
                    compiler_1.visitAll(translationVisitor, file.children, bundle);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_b = files_1.return)) _b.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (localesFound.size > 1) {
                translation_utils_1.addParseDiagnostic(diagnostics, element.sourceSpan, "More than one locale found in translation file: " + JSON.stringify(Array.from(localesFound)) + ". Using \"" + bundle.locale + "\"", compiler_1.ParseErrorLevel.WARNING);
            }
            return bundle;
        };
        Xliff1TranslationParser.prototype.extractBundleDeprecated = function (filePath, contents) {
            var hint = this.canParse(filePath, contents);
            if (!hint) {
                throw new Error("Unable to parse \"" + filePath + "\" as XLIFF 1.2 format.");
            }
            var bundle = this.extractBundle(hint);
            if (bundle.diagnostics.hasErrors) {
                var message = bundle.diagnostics.formatDiagnostics("Failed to parse \"" + filePath + "\" as XLIFF 1.2 format");
                throw new Error(message);
            }
            return bundle;
        };
        return Xliff1TranslationParser;
    }());
    exports.Xliff1TranslationParser = Xliff1TranslationParser;
    var XliffFileElementVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffFileElementVisitor, _super);
        function XliffFileElementVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XliffFileElementVisitor.prototype.visitElement = function (fileElement) {
            if (fileElement.name === 'file') {
                return { fileElement: fileElement, locale: translation_utils_1.getAttribute(fileElement, 'target-language') };
            }
        };
        return XliffFileElementVisitor;
    }(base_visitor_1.BaseVisitor));
    var XliffTranslationVisitor = /** @class */ (function (_super) {
        tslib_1.__extends(XliffTranslationVisitor, _super);
        function XliffTranslationVisitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XliffTranslationVisitor.prototype.visitElement = function (element, bundle) {
            if (element.name === 'trans-unit') {
                this.visitTransUnitElement(element, bundle);
            }
            else {
                compiler_1.visitAll(this, element.children, bundle);
            }
        };
        XliffTranslationVisitor.prototype.visitTransUnitElement = function (element, bundle) {
            // Error if no `id` attribute
            var id = translation_utils_1.getAttribute(element, 'id');
            if (id === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Missing required \"id\" attribute on <trans-unit> element.", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            // Error if there is already a translation with the same id
            if (bundle.translations[id] !== undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, "Duplicated translations for message \"" + id + "\"", compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            // Error if there is no `<target>` child element
            var targetMessage = element.children.find(translation_utils_1.isNamedElement('target'));
            if (targetMessage === undefined) {
                translation_utils_1.addParseDiagnostic(bundle.diagnostics, element.sourceSpan, 'Missing required <target> element', compiler_1.ParseErrorLevel.ERROR);
                return;
            }
            try {
                bundle.translations[id] = serializeTargetMessage(targetMessage);
            }
            catch (e) {
                // Capture any errors from serialize the target message
                if (e.span && e.msg && e.level) {
                    translation_utils_1.addParseDiagnostic(bundle.diagnostics, e.span, e.msg, e.level);
                }
                else {
                    throw e;
                }
            }
        };
        return XliffTranslationVisitor;
    }(base_visitor_1.BaseVisitor));
    function serializeTargetMessage(source) {
        var serializer = new message_serializer_1.MessageSerializer(new target_message_renderer_1.TargetMessageRenderer(), {
            inlineElements: ['g', 'bx', 'ex', 'bpt', 'ept', 'ph', 'it', 'mrk'],
            placeholder: { elementName: 'x', nameAttribute: 'id' }
        });
        return serializer.serialize(translation_utils_1.parseInnerRange(source));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL3RyYW5zbGF0aW9uX2ZpbGVzL3RyYW5zbGF0aW9uX3BhcnNlcnMveGxpZmYxX3RyYW5zbGF0aW9uX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBcUU7SUFHckUsMkVBQWlEO0lBQ2pELHlHQUE0QztJQUM1QywySUFBOEU7SUFDOUUscUpBQXVGO0lBR3ZGLHVJQUE0SjtJQUU1Sjs7Ozs7O09BTUc7SUFDSDtRQUFBO1FBd0VBLENBQUM7UUF2RUMsMENBQVEsR0FBUixVQUFTLFFBQWdCLEVBQUUsUUFBZ0I7WUFDekMsT0FBTywrQkFBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELHVDQUFLLEdBQUwsVUFBTSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsSUFBK0I7WUFFdkUsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RDtRQUNILENBQUM7UUFFTywrQ0FBYSxHQUFyQixVQUFzQixFQUEyQzs7Z0JBQTFDLG9CQUFPLEVBQUUsa0JBQU07WUFDcEMsSUFBTSxXQUFXLEdBQUcsSUFBSSx5QkFBVyxFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLGlDQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxF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LEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUM7WUFDbEUsV0FBVyxFQUFFLEVBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDO1NBQ3JELENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxtQ0FBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7RWxlbWVudCwgUGFyc2VFcnJvckxldmVsLCB2aXNpdEFsbH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHvJtVBhcnNlZFRyYW5zbGF0aW9ufSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5cbmltcG9ydCB7RGlhZ25vc3RpY3N9IGZyb20gJy4uLy4uLy4uL2RpYWdub3N0aWNzJztcbmltcG9ydCB7QmFzZVZpc2l0b3J9IGZyb20gJy4uL2Jhc2VfdmlzaXRvcic7XG5pbXBvcnQge01lc3NhZ2VTZXJpYWxpemVyfSBmcm9tICcuLi9tZXNzYWdlX3NlcmlhbGl6YXRpb24vbWVzc2FnZV9zZXJpYWxpemVyJztcbmltcG9ydCB7VGFyZ2V0TWVzc2FnZVJlbmRlcmVyfSBmcm9tICcuLi9tZXNzYWdlX3NlcmlhbGl6YXRpb24vdGFyZ2V0X21lc3NhZ2VfcmVuZGVyZXInO1xuXG5pbXBvcnQge1BhcnNlZFRyYW5zbGF0aW9uQnVuZGxlLCBUcmFuc2xhdGlvblBhcnNlcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9wYXJzZXInO1xuaW1wb3J0IHthZGRQYXJzZURpYWdub3N0aWMsIGFkZFBhcnNlRXJyb3IsIGNhblBhcnNlWG1sLCBnZXRBdHRyaWJ1dGUsIGlzTmFtZWRFbGVtZW50LCBwYXJzZUlubmVyUmFuZ2UsIFhtbFRyYW5zbGF0aW9uUGFyc2VySGludH0gZnJvbSAnLi90cmFuc2xhdGlvbl91dGlscyc7XG5cbi8qKlxuICogQSB0cmFuc2xhdGlvbiBwYXJzZXIgdGhhdCBjYW4gbG9hZCBYTElGRiAxLjIgZmlsZXMuXG4gKlxuICogaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcveGxpZmYvdjEuMi9vcy94bGlmZi1jb3JlLmh0bWxcbiAqIGh0dHA6Ly9kb2NzLm9hc2lzLW9wZW4ub3JnL3hsaWZmL3YxLjIveGxpZmYtcHJvZmlsZS1odG1sL3hsaWZmLXByb2ZpbGUtaHRtbC0xLjIuaHRtbFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFhsaWZmMVRyYW5zbGF0aW9uUGFyc2VyIGltcGxlbWVudHMgVHJhbnNsYXRpb25QYXJzZXI8WG1sVHJhbnNsYXRpb25QYXJzZXJIaW50PiB7XG4gIGNhblBhcnNlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpOiBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnR8ZmFsc2Uge1xuICAgIHJldHVybiBjYW5QYXJzZVhtbChmaWxlUGF0aCwgY29udGVudHMsICd4bGlmZicsIHt2ZXJzaW9uOiAnMS4yJ30pO1xuICB9XG5cbiAgcGFyc2UoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZywgaGludD86IFhtbFRyYW5zbGF0aW9uUGFyc2VySGludCk6XG4gICAgICBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgaWYgKGhpbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RCdW5kbGUoaGludCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RCdW5kbGVEZXByZWNhdGVkKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0QnVuZGxlKHtlbGVtZW50LCBlcnJvcnN9OiBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQpOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSB7XG4gICAgY29uc3QgZGlhZ25vc3RpY3MgPSBuZXcgRGlhZ25vc3RpY3MoKTtcbiAgICBlcnJvcnMuZm9yRWFjaChlID0+IGFkZFBhcnNlRXJyb3IoZGlhZ25vc3RpY3MsIGUpKTtcblxuICAgIGlmIChlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sICdNaXNzaW5nIGV4cGVjdGVkIDxmaWxlPiBlbGVtZW50JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgICByZXR1cm4ge2xvY2FsZTogdW5kZWZpbmVkLCB0cmFuc2xhdGlvbnM6IHt9LCBkaWFnbm9zdGljc307XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZXMgPSBlbGVtZW50LmNoaWxkcmVuLmZpbHRlcihpc05hbWVkRWxlbWVudCgnZmlsZScpKTtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbiwgJ05vIDxmaWxlPiBlbGVtZW50cyBmb3VuZCBpbiA8eGxpZmY+JyxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgfSBlbHNlIGlmIChmaWxlcy5sZW5ndGggPiAxKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIGZpbGVzWzFdLnNvdXJjZVNwYW4sICdNb3JlIHRoYW4gb25lIDxmaWxlPiBlbGVtZW50IGZvdW5kIGluIDx4bGlmZj4nLFxuICAgICAgICAgIFBhcnNlRXJyb3JMZXZlbC5XQVJOSU5HKTtcbiAgICB9XG5cbiAgICBjb25zdCBidW5kbGU6IFBhcnNlZFRyYW5zbGF0aW9uQnVuZGxlID0ge2xvY2FsZTogdW5kZWZpbmVkLCB0cmFuc2xhdGlvbnM6IHt9LCBkaWFnbm9zdGljc307XG4gICAgY29uc3QgdHJhbnNsYXRpb25WaXNpdG9yID0gbmV3IFhsaWZmVHJhbnNsYXRpb25WaXNpdG9yKCk7XG4gICAgY29uc3QgbG9jYWxlc0ZvdW5kID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBsb2NhbGUgPSBnZXRBdHRyaWJ1dGUoZmlsZSwgJ3RhcmdldC1sYW5ndWFnZScpO1xuICAgICAgaWYgKGxvY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxvY2FsZXNGb3VuZC5hZGQobG9jYWxlKTtcbiAgICAgICAgYnVuZGxlLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgIH1cbiAgICAgIHZpc2l0QWxsKHRyYW5zbGF0aW9uVmlzaXRvciwgZmlsZS5jaGlsZHJlbiwgYnVuZGxlKTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxlc0ZvdW5kLnNpemUgPiAxKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbixcbiAgICAgICAgICBgTW9yZSB0aGFuIG9uZSBsb2NhbGUgZm91bmQgaW4gdHJhbnNsYXRpb24gZmlsZTogJHtcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoQXJyYXkuZnJvbShsb2NhbGVzRm91bmQpKX0uIFVzaW5nIFwiJHtidW5kbGUubG9jYWxlfVwiYCxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1bmRsZTtcbiAgfVxuXG4gIHByaXZhdGUgZXh0cmFjdEJ1bmRsZURlcHJlY2F0ZWQoZmlsZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xuICAgIGNvbnN0IGhpbnQgPSB0aGlzLmNhblBhcnNlKGZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgaWYgKCFoaW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBwYXJzZSBcIiR7ZmlsZVBhdGh9XCIgYXMgWExJRkYgMS4yIGZvcm1hdC5gKTtcbiAgICB9XG4gICAgY29uc3QgYnVuZGxlID0gdGhpcy5leHRyYWN0QnVuZGxlKGhpbnQpO1xuICAgIGlmIChidW5kbGUuZGlhZ25vc3RpY3MuaGFzRXJyb3JzKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICBidW5kbGUuZGlhZ25vc3RpY3MuZm9ybWF0RGlhZ25vc3RpY3MoYEZhaWxlZCB0byBwYXJzZSBcIiR7ZmlsZVBhdGh9XCIgYXMgWExJRkYgMS4yIGZvcm1hdGApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gYnVuZGxlO1xuICB9XG59XG5cbmNsYXNzIFhsaWZmRmlsZUVsZW1lbnRWaXNpdG9yIGV4dGVuZHMgQmFzZVZpc2l0b3Ige1xuICB2aXNpdEVsZW1lbnQoZmlsZUVsZW1lbnQ6IEVsZW1lbnQpOiBhbnkge1xuICAgIGlmIChmaWxlRWxlbWVudC5uYW1lID09PSAnZmlsZScpIHtcbiAgICAgIHJldHVybiB7ZmlsZUVsZW1lbnQsIGxvY2FsZTogZ2V0QXR0cmlidXRlKGZpbGVFbGVtZW50LCAndGFyZ2V0LWxhbmd1YWdlJyl9O1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBYbGlmZlRyYW5zbGF0aW9uVmlzaXRvciBleHRlbmRzIEJhc2VWaXNpdG9yIHtcbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIGJ1bmRsZTogUGFyc2VkVHJhbnNsYXRpb25CdW5kbGUpOiB2b2lkIHtcbiAgICBpZiAoZWxlbWVudC5uYW1lID09PSAndHJhbnMtdW5pdCcpIHtcbiAgICAgIHRoaXMudmlzaXRUcmFuc1VuaXRFbGVtZW50KGVsZW1lbnQsIGJ1bmRsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4sIGJ1bmRsZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2aXNpdFRyYW5zVW5pdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgYnVuZGxlOiBQYXJzZWRUcmFuc2xhdGlvbkJ1bmRsZSk6IHZvaWQge1xuICAgIC8vIEVycm9yIGlmIG5vIGBpZGAgYXR0cmlidXRlXG4gICAgY29uc3QgaWQgPSBnZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ2lkJyk7XG4gICAgaWYgKGlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGFkZFBhcnNlRGlhZ25vc3RpYyhcbiAgICAgICAgICBidW5kbGUuZGlhZ25vc3RpY3MsIGVsZW1lbnQuc291cmNlU3BhbixcbiAgICAgICAgICBgTWlzc2luZyByZXF1aXJlZCBcImlkXCIgYXR0cmlidXRlIG9uIDx0cmFucy11bml0PiBlbGVtZW50LmAsIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRXJyb3IgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIHRyYW5zbGF0aW9uIHdpdGggdGhlIHNhbWUgaWRcbiAgICBpZiAoYnVuZGxlLnRyYW5zbGF0aW9uc1tpZF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgICAgICAgIGJ1bmRsZS5kaWFnbm9zdGljcywgZWxlbWVudC5zb3VyY2VTcGFuLCBgRHVwbGljYXRlZCB0cmFuc2xhdGlvbnMgZm9yIG1lc3NhZ2UgXCIke2lkfVwiYCxcbiAgICAgICAgICBQYXJzZUVycm9yTGV2ZWwuRVJST1IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEVycm9yIGlmIHRoZXJlIGlzIG5vIGA8dGFyZ2V0PmAgY2hpbGQgZWxlbWVudFxuICAgIGNvbnN0IHRhcmdldE1lc3NhZ2UgPSBlbGVtZW50LmNoaWxkcmVuLmZpbmQoaXNOYW1lZEVsZW1lbnQoJ3RhcmdldCcpKTtcbiAgICBpZiAodGFyZ2V0TWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZGRQYXJzZURpYWdub3N0aWMoXG4gICAgICAgICAgYnVuZGxlLmRpYWdub3N0aWNzLCBlbGVtZW50LnNvdXJjZVNwYW4sICdNaXNzaW5nIHJlcXVpcmVkIDx0YXJnZXQ+IGVsZW1lbnQnLFxuICAgICAgICAgIFBhcnNlRXJyb3JMZXZlbC5FUlJPUik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGJ1bmRsZS50cmFuc2xhdGlvbnNbaWRdID0gc2VyaWFsaXplVGFyZ2V0TWVzc2FnZSh0YXJnZXRNZXNzYWdlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBDYXB0dXJlIGFueSBlcnJvcnMgZnJvbSBzZXJpYWxpemUgdGhlIHRhcmdldCBtZXNzYWdlXG4gICAgICBpZiAoZS5zcGFuICYmIGUubXNnICYmIGUubGV2ZWwpIHtcbiAgICAgICAgYWRkUGFyc2VEaWFnbm9zdGljKGJ1bmRsZS5kaWFnbm9zdGljcywgZS5zcGFuLCBlLm1zZywgZS5sZXZlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVUYXJnZXRNZXNzYWdlKHNvdXJjZTogRWxlbWVudCk6IMm1UGFyc2VkVHJhbnNsYXRpb24ge1xuICBjb25zdCBzZXJpYWxpemVyID0gbmV3IE1lc3NhZ2VTZXJpYWxpemVyKG5ldyBUYXJnZXRNZXNzYWdlUmVuZGVyZXIoKSwge1xuICAgIGlubGluZUVsZW1lbnRzOiBbJ2cnLCAnYngnLCAnZXgnLCAnYnB0JywgJ2VwdCcsICdwaCcsICdpdCcsICdtcmsnXSxcbiAgICBwbGFjZWhvbGRlcjoge2VsZW1lbnROYW1lOiAneCcsIG5hbWVBdHRyaWJ1dGU6ICdpZCd9XG4gIH0pO1xuICByZXR1cm4gc2VyaWFsaXplci5zZXJpYWxpemUocGFyc2VJbm5lclJhbmdlKHNvdXJjZSkpO1xufVxuIl19