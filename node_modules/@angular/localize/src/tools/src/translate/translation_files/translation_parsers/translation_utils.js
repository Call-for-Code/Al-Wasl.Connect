(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_utils", ["require", "exports", "tslib", "@angular/compiler", "@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error"], factory);
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
    var translation_parse_error_1 = require("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parse_error");
    function getAttrOrThrow(element, attrName) {
        var attrValue = getAttribute(element, attrName);
        if (attrValue === undefined) {
            throw new translation_parse_error_1.TranslationParseError(element.sourceSpan, "Missing required \"" + attrName + "\" attribute:");
        }
        return attrValue;
    }
    exports.getAttrOrThrow = getAttrOrThrow;
    function getAttribute(element, attrName) {
        var attr = element.attrs.find(function (a) { return a.name === attrName; });
        return attr !== undefined ? attr.value : undefined;
    }
    exports.getAttribute = getAttribute;
    /**
     * Parse the "contents" of an XML element.
     *
     * This would be equivalent to parsing the `innerHTML` string of an HTML document.
     *
     * @param element The element whose inner range we want to parse.
     * @returns a collection of XML `Node` objects that were parsed from the element's contents.
     */
    function parseInnerRange(element) {
        var xmlParser = new compiler_1.XmlParser();
        var xml = xmlParser.parse(element.sourceSpan.start.file.content, element.sourceSpan.start.file.url, { tokenizeExpansionForms: true, range: getInnerRange(element) });
        if (xml.errors.length) {
            throw xml.errors.map(function (e) { return new translation_parse_error_1.TranslationParseError(e.span, e.msg).toString(); }).join('\n');
        }
        return xml.rootNodes;
    }
    exports.parseInnerRange = parseInnerRange;
    /**
     * Compute a `LexerRange` that contains all the children of the given `element`.
     * @param element The element whose inner range we want to compute.
     */
    function getInnerRange(element) {
        var start = element.startSourceSpan.end;
        var end = element.endSourceSpan.start;
        return {
            startPos: start.offset,
            startLine: start.line,
            startCol: start.col,
            endPos: end.offset,
        };
    }
    /**
     * Can this XML be parsed for translations, given the expected `rootNodeName` and expected root node
     * `attributes` that should appear in the file.
     *
     * @param filePath The path to the file being checked.
     * @param contents The contents of the file being checked.
     * @param rootNodeName The expected name of an XML root node that should exist.
     * @param attributes The attributes (and their values) that should appear on the root node.
     * @returns The `XmlTranslationParserHint` object for use by `TranslationParser.parse()` if the XML
     * document has the expected format.
     */
    function canParseXml(filePath, contents, rootNodeName, attributes) {
        var e_1, _a;
        var xmlParser = new compiler_1.XmlParser();
        var xml = xmlParser.parse(contents, filePath);
        if (xml.rootNodes.length === 0 ||
            xml.errors.some(function (error) { return error.level === compiler_1.ParseErrorLevel.ERROR; })) {
            return false;
        }
        var rootElements = xml.rootNodes.filter(isNamedElement(rootNodeName));
        var rootElement = rootElements[0];
        if (rootElement === undefined) {
            return false;
        }
        var _loop_1 = function (attrKey) {
            var attr = rootElement.attrs.find(function (attr) { return attr.name === attrKey; });
            if (attr === undefined || attr.value !== attributes[attrKey]) {
                return { value: false };
            }
        };
        try {
            for (var _b = tslib_1.__values(Object.keys(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attrKey = _c.value;
                var state_1 = _loop_1(attrKey);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (rootElements.length > 1) {
            xml.errors.push(new compiler_1.ParseError(xml.rootNodes[1].sourceSpan, 'Unexpected root node. XLIFF 1.2 files should only have a single <xliff> root node.', compiler_1.ParseErrorLevel.WARNING));
        }
        return { element: rootElement, errors: xml.errors };
    }
    exports.canParseXml = canParseXml;
    /**
     * Create a predicate, which can be used by things like `Array.filter()`, that will match a named
     * XML Element from a collection of XML Nodes.
     *
     * @param name The expected name of the element to match.
     */
    function isNamedElement(name) {
        function predicate(node) {
            return node instanceof compiler_1.Element && node.name === name;
        }
        return predicate;
    }
    exports.isNamedElement = isNamedElement;
    /**
     * Add an XML parser related message to the given `diagnostics` object.
     */
    function addParseDiagnostic(diagnostics, sourceSpan, message, level) {
        addParseError(diagnostics, new compiler_1.ParseError(sourceSpan, message, level));
    }
    exports.addParseDiagnostic = addParseDiagnostic;
    /**
     * Copy the formatted error message from the given `parseError` object into the given `diagnostics`
     * object.
     */
    function addParseError(diagnostics, parseError) {
        if (parseError.level === compiler_1.ParseErrorLevel.ERROR) {
            diagnostics.error(parseError.toString());
        }
        else {
            diagnostics.warn(parseError.toString());
        }
    }
    exports.addParseError = addParseError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS90cmFuc2xhdGlvbl9maWxlcy90cmFuc2xhdGlvbl9wYXJzZXJzL3RyYW5zbGF0aW9uX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDhDQUFxSDtJQUVySCxtSkFBZ0U7SUFFaEUsU0FBZ0IsY0FBYyxDQUFDLE9BQWdCLEVBQUUsUUFBZ0I7UUFDL0QsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsTUFBTSxJQUFJLCtDQUFxQixDQUMzQixPQUFPLENBQUMsVUFBVSxFQUFFLHdCQUFxQixRQUFRLGtCQUFjLENBQUMsQ0FBQztTQUN0RTtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFQRCx3Q0FPQztJQUVELFNBQWdCLFlBQVksQ0FBQyxPQUFnQixFQUFFLFFBQWdCO1FBQzdELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNyRCxDQUFDO0lBSEQsb0NBR0M7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsU0FBZ0IsZUFBZSxDQUFDLE9BQWdCO1FBQzlDLElBQU0sU0FBUyxHQUFHLElBQUksb0JBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQU0sR0FBRyxHQUFHLFNB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RUFDM0Isb0ZBQW9GLEVBQ3BGLDBCQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUM7SUFDcEQsQ0FBQztJQWhDRCxrQ0FnQ0M7SUFFRDs7Ozs7T0FLRztJQUNILFNBQWdCLGNBQWMsQ0FBQyxJQUFZO1FBQ3pDLFNBQVMsU0FBUyxDQUFDLElBQVU7WUFDM0IsT0FBTyxJQUFJLFlBQVksa0JBQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztRQUN2RCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUxELHdDQUtDO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixrQkFBa0IsQ0FDOUIsV0FBd0IsRUFBRSxVQUEyQixFQUFFLE9BQWUsRUFDdEUsS0FBc0I7UUFDeEIsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLHFCQUFVLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFKRCxnREFJQztJQUVEOzs7T0FHRztJQUNILFNBQWdCLGFBQWEsQ0FBQyxXQUF3QixFQUFFLFVBQXNCO1FBQzVFLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSywwQkFBZSxDQUFDLEtBQUssRUFBRTtZQUM5QyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQU5ELHNDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtFbGVtZW50LCBMZXhlclJhbmdlLCBOb2RlLCBQYXJzZUVycm9yLCBQYXJzZUVycm9yTGV2ZWwsIFBhcnNlU291cmNlU3BhbiwgWG1sUGFyc2VyfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge0RpYWdub3N0aWNzfSBmcm9tICcuLi8uLi8uLi9kaWFnbm9zdGljcyc7XG5pbXBvcnQge1RyYW5zbGF0aW9uUGFyc2VFcnJvcn0gZnJvbSAnLi90cmFuc2xhdGlvbl9wYXJzZV9lcnJvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyT3JUaHJvdyhlbGVtZW50OiBFbGVtZW50LCBhdHRyTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgYXR0clZhbHVlID0gZ2V0QXR0cmlidXRlKGVsZW1lbnQsIGF0dHJOYW1lKTtcbiAgaWYgKGF0dHJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IFRyYW5zbGF0aW9uUGFyc2VFcnJvcihcbiAgICAgICAgZWxlbWVudC5zb3VyY2VTcGFuLCBgTWlzc2luZyByZXF1aXJlZCBcIiR7YXR0ck5hbWV9XCIgYXR0cmlidXRlOmApO1xuICB9XG4gIHJldHVybiBhdHRyVmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWxlbWVudDogRWxlbWVudCwgYXR0ck5hbWU6IHN0cmluZyk6IHN0cmluZ3x1bmRlZmluZWQge1xuICBjb25zdCBhdHRyID0gZWxlbWVudC5hdHRycy5maW5kKGEgPT4gYS5uYW1lID09PSBhdHRyTmFtZSk7XG4gIHJldHVybiBhdHRyICE9PSB1bmRlZmluZWQgPyBhdHRyLnZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBcImNvbnRlbnRzXCIgb2YgYW4gWE1MIGVsZW1lbnQuXG4gKlxuICogVGhpcyB3b3VsZCBiZSBlcXVpdmFsZW50IHRvIHBhcnNpbmcgdGhlIGBpbm5lckhUTUxgIHN0cmluZyBvZiBhbiBIVE1MIGRvY3VtZW50LlxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHdob3NlIGlubmVyIHJhbmdlIHdlIHdhbnQgdG8gcGFyc2UuXG4gKiBAcmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgWE1MIGBOb2RlYCBvYmplY3RzIHRoYXQgd2VyZSBwYXJzZWQgZnJvbSB0aGUgZWxlbWVudCdzIGNvbnRlbnRzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbm5lclJhbmdlKGVsZW1lbnQ6IEVsZW1lbnQpOiBOb2RlW10ge1xuICBjb25zdCB4bWxQYXJzZXIgPSBuZXcgWG1sUGFyc2VyKCk7XG4gIGNvbnN0IHhtbCA9IHhtbFBhcnNlci5wYXJzZShcbiAgICAgIGVsZW1lbnQuc291cmNlU3Bhbi5zdGFydC5maWxlLmNvbnRlbnQsIGVsZW1lbnQuc291cmNlU3Bhbi5zdGFydC5maWxlLnVybCxcbiAgICAgIHt0b2tlbml6ZUV4cGFuc2lvbkZvcm1zOiB0cnVlLCByYW5nZTogZ2V0SW5uZXJSYW5nZShlbGVtZW50KX0pO1xuICBpZiAoeG1sLmVycm9ycy5sZW5ndGgpIHtcbiAgICB0aHJvdyB4bWwuZXJyb3JzLm1hcChlID0+IG5ldyBUcmFuc2xhdGlvblBhcnNlRXJyb3IoZS5zcGFuLCBlLm1zZykudG9TdHJpbmcoKSkuam9pbignXFxuJyk7XG4gIH1cbiAgcmV0dXJuIHhtbC5yb290Tm9kZXM7XG59XG5cbi8qKlxuICogQ29tcHV0ZSBhIGBMZXhlclJhbmdlYCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhlIGdpdmVuIGBlbGVtZW50YC5cbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHdob3NlIGlubmVyIHJhbmdlIHdlIHdhbnQgdG8gY29tcHV0ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0SW5uZXJSYW5nZShlbGVtZW50OiBFbGVtZW50KTogTGV4ZXJSYW5nZSB7XG4gIGNvbnN0IHN0YXJ0ID0gZWxlbWVudC5zdGFydFNvdXJjZVNwYW4hLmVuZDtcbiAgY29uc3QgZW5kID0gZWxlbWVudC5lbmRTb3VyY2VTcGFuIS5zdGFydDtcbiAgcmV0dXJuIHtcbiAgICBzdGFydFBvczogc3RhcnQub2Zmc2V0LFxuICAgIHN0YXJ0TGluZTogc3RhcnQubGluZSxcbiAgICBzdGFydENvbDogc3RhcnQuY29sLFxuICAgIGVuZFBvczogZW5kLm9mZnNldCxcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIFwiaGludFwiIG9iamVjdCBpcyB1c2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gZnJvbSBgY2FuUGFyc2UoKWAgdG8gYHBhcnNlKClgIGZvclxuICogYFRyYW5zbGF0aW9uUGFyc2VyYHMgdGhhdCBleHBlY3QgWE1MIGNvbnRlbnRzLlxuICpcbiAqIFRoaXMgc2F2ZXMgdGhlIGBwYXJzZSgpYCBtZXRob2QgZnJvbSBoYXZpbmcgdG8gcmUtcGFyc2UgdGhlIFhNTC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnQge1xuICBlbGVtZW50OiBFbGVtZW50O1xuICBlcnJvcnM6IFBhcnNlRXJyb3JbXTtcbn1cblxuLyoqXG4gKiBDYW4gdGhpcyBYTUwgYmUgcGFyc2VkIGZvciB0cmFuc2xhdGlvbnMsIGdpdmVuIHRoZSBleHBlY3RlZCBgcm9vdE5vZGVOYW1lYCBhbmQgZXhwZWN0ZWQgcm9vdCBub2RlXG4gKiBgYXR0cmlidXRlc2AgdGhhdCBzaG91bGQgYXBwZWFyIGluIHRoZSBmaWxlLlxuICpcbiAqIEBwYXJhbSBmaWxlUGF0aCBUaGUgcGF0aCB0byB0aGUgZmlsZSBiZWluZyBjaGVja2VkLlxuICogQHBhcmFtIGNvbnRlbnRzIFRoZSBjb250ZW50cyBvZiB0aGUgZmlsZSBiZWluZyBjaGVja2VkLlxuICogQHBhcmFtIHJvb3ROb2RlTmFtZSBUaGUgZXhwZWN0ZWQgbmFtZSBvZiBhbiBYTUwgcm9vdCBub2RlIHRoYXQgc2hvdWxkIGV4aXN0LlxuICogQHBhcmFtIGF0dHJpYnV0ZXMgVGhlIGF0dHJpYnV0ZXMgKGFuZCB0aGVpciB2YWx1ZXMpIHRoYXQgc2hvdWxkIGFwcGVhciBvbiB0aGUgcm9vdCBub2RlLlxuICogQHJldHVybnMgVGhlIGBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnRgIG9iamVjdCBmb3IgdXNlIGJ5IGBUcmFuc2xhdGlvblBhcnNlci5wYXJzZSgpYCBpZiB0aGUgWE1MXG4gKiBkb2N1bWVudCBoYXMgdGhlIGV4cGVjdGVkIGZvcm1hdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhblBhcnNlWG1sKFxuICAgIGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcsIHJvb3ROb2RlTmFtZTogc3RyaW5nLFxuICAgIGF0dHJpYnV0ZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4pOiBYbWxUcmFuc2xhdGlvblBhcnNlckhpbnR8ZmFsc2Uge1xuICBjb25zdCB4bWxQYXJzZXIgPSBuZXcgWG1sUGFyc2VyKCk7XG4gIGNvbnN0IHhtbCA9IHhtbFBhcnNlci5wYXJzZShjb250ZW50cywgZmlsZVBhdGgpO1xuXG4gIGlmICh4bWwucm9vdE5vZGVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgeG1sLmVycm9ycy5zb21lKGVycm9yID0+IGVycm9yLmxldmVsID09PSBQYXJzZUVycm9yTGV2ZWwuRVJST1IpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgcm9vdEVsZW1lbnRzID0geG1sLnJvb3ROb2Rlcy5maWx0ZXIoaXNOYW1lZEVsZW1lbnQocm9vdE5vZGVOYW1lKSk7XG4gIGNvbnN0IHJvb3RFbGVtZW50ID0gcm9vdEVsZW1lbnRzWzBdO1xuICBpZiAocm9vdEVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAoY29uc3QgYXR0cktleSBvZiBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKSkge1xuICAgIGNvbnN0IGF0dHIgPSByb290RWxlbWVudC5hdHRycy5maW5kKGF0dHIgPT4gYXR0ci5uYW1lID09PSBhdHRyS2V5KTtcbiAgICBpZiAoYXR0ciA9PT0gdW5kZWZpbmVkIHx8IGF0dHIudmFsdWUgIT09IGF0dHJpYnV0ZXNbYXR0cktleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAocm9vdEVsZW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICB4bWwuZXJyb3JzLnB1c2gobmV3IFBhcnNlRXJyb3IoXG4gICAgICAgIHhtbC5yb290Tm9kZXNbMV0uc291cmNlU3BhbixcbiAgICAgICAgJ1VuZXhwZWN0ZWQgcm9vdCBub2RlLiBYTElGRiAxLjIgZmlsZXMgc2hvdWxkIG9ubHkgaGF2ZSBhIHNpbmdsZSA8eGxpZmY+IHJvb3Qgbm9kZS4nLFxuICAgICAgICBQYXJzZUVycm9yTGV2ZWwuV0FSTklORykpO1xuICB9XG5cbiAgcmV0dXJuIHtlbGVtZW50OiByb290RWxlbWVudCwgZXJyb3JzOiB4bWwuZXJyb3JzfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwcmVkaWNhdGUsIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHRoaW5ncyBsaWtlIGBBcnJheS5maWx0ZXIoKWAsIHRoYXQgd2lsbCBtYXRjaCBhIG5hbWVkXG4gKiBYTUwgRWxlbWVudCBmcm9tIGEgY29sbGVjdGlvbiBvZiBYTUwgTm9kZXMuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIGV4cGVjdGVkIG5hbWUgb2YgdGhlIGVsZW1lbnQgdG8gbWF0Y2guXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05hbWVkRWxlbWVudChuYW1lOiBzdHJpbmcpOiAobm9kZTogTm9kZSkgPT4gbm9kZSBpcyBFbGVtZW50IHtcbiAgZnVuY3Rpb24gcHJlZGljYXRlKG5vZGU6IE5vZGUpOiBub2RlIGlzIEVsZW1lbnQge1xuICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgRWxlbWVudCAmJiBub2RlLm5hbWUgPT09IG5hbWU7XG4gIH1cbiAgcmV0dXJuIHByZWRpY2F0ZTtcbn1cblxuLyoqXG4gKiBBZGQgYW4gWE1MIHBhcnNlciByZWxhdGVkIG1lc3NhZ2UgdG8gdGhlIGdpdmVuIGBkaWFnbm9zdGljc2Agb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUGFyc2VEaWFnbm9zdGljKFxuICAgIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcywgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBtZXNzYWdlOiBzdHJpbmcsXG4gICAgbGV2ZWw6IFBhcnNlRXJyb3JMZXZlbCk6IHZvaWQge1xuICBhZGRQYXJzZUVycm9yKGRpYWdub3N0aWNzLCBuZXcgUGFyc2VFcnJvcihzb3VyY2VTcGFuLCBtZXNzYWdlLCBsZXZlbCkpO1xufVxuXG4vKipcbiAqIENvcHkgdGhlIGZvcm1hdHRlZCBlcnJvciBtZXNzYWdlIGZyb20gdGhlIGdpdmVuIGBwYXJzZUVycm9yYCBvYmplY3QgaW50byB0aGUgZ2l2ZW4gYGRpYWdub3N0aWNzYFxuICogb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkUGFyc2VFcnJvcihkaWFnbm9zdGljczogRGlhZ25vc3RpY3MsIHBhcnNlRXJyb3I6IFBhcnNlRXJyb3IpOiB2b2lkIHtcbiAgaWYgKHBhcnNlRXJyb3IubGV2ZWwgPT09IFBhcnNlRXJyb3JMZXZlbC5FUlJPUikge1xuICAgIGRpYWdub3N0aWNzLmVycm9yKHBhcnNlRXJyb3IudG9TdHJpbmcoKSk7XG4gIH0gZWxzZSB7XG4gICAgZGlhZ25vc3RpY3Mud2FybihwYXJzZUVycm9yLnRvU3RyaW5nKCkpO1xuICB9XG59XG4iXX0=