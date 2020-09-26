import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BLOCK_MARKER } from './constants';
import { parseMessage } from './messages';
var MissingTranslationError = /** @class */ (function (_super) {
    __extends(MissingTranslationError, _super);
    function MissingTranslationError(parsedMessage) {
        var _this = _super.call(this, "No translation found for " + describeMessage(parsedMessage) + ".") || this;
        _this.parsedMessage = parsedMessage;
        _this.type = 'MissingTranslationError';
        return _this;
    }
    return MissingTranslationError;
}(Error));
export { MissingTranslationError };
export function isMissingTranslationError(e) {
    return e.type === 'MissingTranslationError';
}
/**
 * Translate the text of the `$localize` tagged-string (i.e. `messageParts` and
 * `substitutions`) using the given `translations`.
 *
 * The tagged-string is parsed to extract its `messageId` which is used to find an appropriate
 * `ParsedTranslation`. If this doesn't match and there are legacy ids then try matching a
 * translation using those.
 *
 * If one is found then it is used to translate the message into a new set of `messageParts` and
 * `substitutions`.
 * The translation may reorder (or remove) substitutions as appropriate.
 *
 * If there is no translation with a matching message id then an error is thrown.
 * If a translation contains a placeholder that is not found in the message being translated then an
 * error is thrown.
 */
export function translate(translations, messageParts, substitutions) {
    var message = parseMessage(messageParts, substitutions);
    // Look up the translation using the messageId, and then the legacyId if available.
    var translation = translations[message.id];
    // If the messageId did not match a translation, try matching the legacy ids instead
    if (message.legacyIds !== undefined) {
        for (var i = 0; i < message.legacyIds.length && translation === undefined; i++) {
            translation = translations[message.legacyIds[i]];
        }
    }
    if (translation === undefined) {
        throw new MissingTranslationError(message);
    }
    return [
        translation.messageParts, translation.placeholderNames.map(function (placeholder) {
            if (message.substitutions.hasOwnProperty(placeholder)) {
                return message.substitutions[placeholder];
            }
            else {
                throw new Error("There is a placeholder name mismatch with the translation provided for the message " + describeMessage(message) + ".\n" +
                    ("The translation contains a placeholder with name " + placeholder + ", which does not exist in the message."));
            }
        })
    ];
}
/**
 * Parse the `messageParts` and `placeholderNames` out of a target `message`.
 *
 * Used by `loadTranslations()` to convert target message strings into a structure that is more
 * appropriate for doing translation.
 *
 * @param message the message to be parsed.
 */
export function parseTranslation(messageString) {
    var parts = messageString.split(/{\$([^}]*)}/);
    var messageParts = [parts[0]];
    var placeholderNames = [];
    for (var i = 1; i < parts.length - 1; i += 2) {
        placeholderNames.push(parts[i]);
        messageParts.push("" + parts[i + 1]);
    }
    var rawMessageParts = messageParts.map(function (part) { return part.charAt(0) === BLOCK_MARKER ? '\\' + part : part; });
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, rawMessageParts),
        placeholderNames: placeholderNames,
    };
}
/**
 * Create a `ParsedTranslation` from a set of `messageParts` and `placeholderNames`.
 *
 * @param messageParts The message parts to appear in the ParsedTranslation.
 * @param placeholderNames The names of the placeholders to intersperse between the `messageParts`.
 */
export function makeParsedTranslation(messageParts, placeholderNames) {
    if (placeholderNames === void 0) { placeholderNames = []; }
    var messageString = messageParts[0];
    for (var i = 0; i < placeholderNames.length - 1; i++) {
        messageString += "{$" + placeholderNames[i] + "}" + messageParts[i + 1];
    }
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, messageParts),
        placeholderNames: placeholderNames
    };
}
/**
 * Create the specialized array that is passed to tagged-string tag functions.
 *
 * @param cooked The message parts with their escape codes processed.
 * @param raw The message parts with their escaped codes as-is.
 */
export function makeTemplateObject(cooked, raw) {
    Object.defineProperty(cooked, 'raw', { value: raw });
    return cooked;
}
function describeMessage(message) {
    var meaningString = message.meaning && " - \"" + message.meaning + "\"";
    var legacy = message.legacyIds && message.legacyIds.length > 0 ?
        " [" + message.legacyIds.map(function (l) { return "\"" + l + "\""; }).join(', ') + "]" :
        '';
    return "\"" + message.id + "\"" + legacy + " (\"" + message.text + "\"" + meaningString + ")";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3V0aWxzL3NyYy90cmFuc2xhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUE0QyxZQUFZLEVBQWdCLE1BQU0sWUFBWSxDQUFDO0FBZ0JsRztJQUE2QywyQ0FBSztJQUVoRCxpQ0FBcUIsYUFBNEI7UUFBakQsWUFDRSxrQkFBTSw4QkFBNEIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFHLENBQUMsU0FDckU7UUFGb0IsbUJBQWEsR0FBYixhQUFhLENBQWU7UUFEaEMsVUFBSSxHQUFHLHlCQUF5QixDQUFDOztJQUdsRCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBNkMsS0FBSyxHQUtqRDs7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsQ0FBTTtJQUM5QyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUsseUJBQXlCLENBQUM7QUFDOUMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQ3JCLFlBQStDLEVBQUUsWUFBa0MsRUFDbkYsYUFBNkI7SUFDL0IsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRCxtRkFBbUY7SUFDbkYsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxvRkFBb0Y7SUFDcEYsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFN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QyxDQUFDLENBQUM7SUFDbkQsT0FBTyxNQUFhLENBQUM7QUFDdkIsQ0FBQztBQUdELFNBQVMsZUFBZSxDQUFDLE9BQXNCO0lBQzdDLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksVUFBTyxPQUFPLENBQUMsT0FBTyxPQUFHLENBQUM7SUFDbkUsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RCxPQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBSSxDQUFDLE9BQUcsRUFBUixDQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQyxDQUFDO1FBQ3pELEVBQUUsQ0FBQztJQUNQLE9BQU8sT0FBSSxPQUFPLENBQUMsRUFBRSxVQUFJLE1BQU0sWUFBTSxPQUFPLENBQUMsSUFBSSxVQUFJLGFBQWEsTUFBRyxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0JMT0NLX01BUktFUn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtNZXNzYWdlSWQsIE1lc3NhZ2VNZXRhZGF0YSwgUGFyc2VkTWVzc2FnZSwgcGFyc2VNZXNzYWdlLCBUYXJnZXRNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2VzJztcblxuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gbWVzc2FnZSB0aGF0IGhhcyBiZWVuIHByb2Nlc3NlZCB0byBleHRyYWN0IHRoZSBtZXNzYWdlIHBhcnRzIGFuZCBwbGFjZWhvbGRlcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkVHJhbnNsYXRpb24gZXh0ZW5kcyBNZXNzYWdlTWV0YWRhdGEge1xuICBtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5O1xuICBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBUaGUgaW50ZXJuYWwgc3RydWN0dXJlIHVzZWQgYnkgdGhlIHJ1bnRpbWUgbG9jYWxpemF0aW9uIHRvIHRyYW5zbGF0ZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IHR5cGUgUGFyc2VkVHJhbnNsYXRpb25zID0gUmVjb3JkPE1lc3NhZ2VJZCwgUGFyc2VkVHJhbnNsYXRpb24+O1xuXG5leHBvcnQgY2xhc3MgTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHlwZSA9ICdNaXNzaW5nVHJhbnNsYXRpb25FcnJvcic7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHBhcnNlZE1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpIHtcbiAgICBzdXBlcihgTm8gdHJhbnNsYXRpb24gZm91bmQgZm9yICR7ZGVzY3JpYmVNZXNzYWdlKHBhcnNlZE1lc3NhZ2UpfS5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNaXNzaW5nVHJhbnNsYXRpb25FcnJvcihlOiBhbnkpOiBlIGlzIE1pc3NpbmdUcmFuc2xhdGlvbkVycm9yIHtcbiAgcmV0dXJuIGUudHlwZSA9PT0gJ01pc3NpbmdUcmFuc2xhdGlvbkVycm9yJztcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGUgdGhlIHRleHQgb2YgdGhlIGAkbG9jYWxpemVgIHRhZ2dlZC1zdHJpbmcgKGkuZS4gYG1lc3NhZ2VQYXJ0c2AgYW5kXG4gKiBgc3Vic3RpdHV0aW9uc2ApIHVzaW5nIHRoZSBnaXZlbiBgdHJhbnNsYXRpb25zYC5cbiAqXG4gKiBUaGUgdGFnZ2VkLXN0cmluZyBpcyBwYXJzZWQgdG8gZXh0cmFjdCBpdHMgYG1lc3NhZ2VJZGAgd2hpY2ggaXMgdXNlZCB0byBmaW5kIGFuIGFwcHJvcHJpYXRlXG4gKiBgUGFyc2VkVHJhbnNsYXRpb25gLiBJZiB0aGlzIGRvZXNuJ3QgbWF0Y2ggYW5kIHRoZXJlIGFyZSBsZWdhY3kgaWRzIHRoZW4gdHJ5IG1hdGNoaW5nIGFcbiAqIHRyYW5zbGF0aW9uIHVzaW5nIHRob3NlLlxuICpcbiAqIElmIG9uZSBpcyBmb3VuZCB0aGVuIGl0IGlzIHVzZWQgdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSBuZXcgc2V0IG9mIGBtZXNzYWdlUGFydHNgIGFuZFxuICogYHN1YnN0aXR1dGlvbnNgLlxuICogVGhlIHRyYW5zbGF0aW9uIG1heSByZW9yZGVyIChvciByZW1vdmUpIHN1YnN0aXR1dGlvbnMgYXMgYXBwcm9wcmlhdGUuXG4gKlxuICogSWYgdGhlcmUgaXMgbm8gdHJhbnNsYXRpb24gd2l0aCBhIG1hdGNoaW5nIG1lc3NhZ2UgaWQgdGhlbiBhbiBlcnJvciBpcyB0aHJvd24uXG4gKiBJZiBhIHRyYW5zbGF0aW9uIGNvbnRhaW5zIGEgcGxhY2Vob2xkZXIgdGhhdCBpcyBub3QgZm91bmQgaW4gdGhlIG1lc3NhZ2UgYmVpbmcgdHJhbnNsYXRlZCB0aGVuIGFuXG4gKiBlcnJvciBpcyB0aHJvd24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoXG4gICAgdHJhbnNsYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBQYXJzZWRUcmFuc2xhdGlvbj4sIG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICAgc3Vic3RpdHV0aW9uczogcmVhZG9ubHkgYW55W10pOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIHJlYWRvbmx5IGFueVtdXSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBwYXJzZU1lc3NhZ2UobWVzc2FnZVBhcnRzLCBzdWJzdGl0dXRpb25zKTtcbiAgLy8gTG9vayB1cCB0aGUgdHJhbnNsYXRpb24gdXNpbmcgdGhlIG1lc3NhZ2VJZCwgYW5kIHRoZW4gdGhlIGxlZ2FjeUlkIGlmIGF2YWlsYWJsZS5cbiAgbGV0IHRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25zW21lc3NhZ2UuaWRdO1xuICAvLyBJZiB0aGUgbWVzc2FnZUlkIGRpZCBub3QgbWF0Y2ggYSB0cmFuc2xhdGlvbiwgdHJ5IG1hdGNoaW5nIHRoZSBsZWdhY3kgaWRzIGluc3RlYWRcbiAgaWYgKG1lc3NhZ2UubGVnYWN5SWRzICE9PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc3NhZ2UubGVnYWN5SWRzLmxlbmd0aCAmJiB0cmFuc2xhdGlvbiA9PT0gdW5kZWZpbmVkOyBpKyspIHtcbiAgICAgIHRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25zW21lc3NhZ2UubGVnYWN5SWRzW2ldXTtcbiAgICB9XG4gIH1cbiAgaWYgKHRyYW5zbGF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgcmV0dXJuIFtcbiAgICB0cmFuc2xhdGlvbi5tZXNzYWdlUGFydHMsIHRyYW5zbGF0aW9uLnBsYWNlaG9sZGVyTmFtZXMubWFwKHBsYWNlaG9sZGVyID0+IHtcbiAgICAgIGlmIChtZXNzYWdlLnN1YnN0aXR1dGlvbnMuaGFzT3duUHJvcGVydHkocGxhY2Vob2xkZXIpKSB7XG4gICAgICAgIHJldHVybiBtZXNzYWdlLnN1YnN0aXR1dGlvbnNbcGxhY2Vob2xkZXJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFRoZXJlIGlzIGEgcGxhY2Vob2xkZXIgbmFtZSBtaXNtYXRjaCB3aXRoIHRoZSB0cmFuc2xhdGlvbiBwcm92aWRlZCBmb3IgdGhlIG1lc3NhZ2UgJHtcbiAgICAgICAgICAgICAgICBkZXNjcmliZU1lc3NhZ2UobWVzc2FnZSl9LlxcbmAgK1xuICAgICAgICAgICAgYFRoZSB0cmFuc2xhdGlvbiBjb250YWlucyBhIHBsYWNlaG9sZGVyIHdpdGggbmFtZSAke1xuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyfSwgd2hpY2ggZG9lcyBub3QgZXhpc3QgaW4gdGhlIG1lc3NhZ2UuYCk7XG4gICAgICB9XG4gICAgfSlcbiAgXTtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgYG1lc3NhZ2VQYXJ0c2AgYW5kIGBwbGFjZWhvbGRlck5hbWVzYCBvdXQgb2YgYSB0YXJnZXQgYG1lc3NhZ2VgLlxuICpcbiAqIFVzZWQgYnkgYGxvYWRUcmFuc2xhdGlvbnMoKWAgdG8gY29udmVydCB0YXJnZXQgbWVzc2FnZSBzdHJpbmdzIGludG8gYSBzdHJ1Y3R1cmUgdGhhdCBpcyBtb3JlXG4gKiBhcHByb3ByaWF0ZSBmb3IgZG9pbmcgdHJhbnNsYXRpb24uXG4gKlxuICogQHBhcmFtIG1lc3NhZ2UgdGhlIG1lc3NhZ2UgdG8gYmUgcGFyc2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUcmFuc2xhdGlvbihtZXNzYWdlU3RyaW5nOiBUYXJnZXRNZXNzYWdlKTogUGFyc2VkVHJhbnNsYXRpb24ge1xuICBjb25zdCBwYXJ0cyA9IG1lc3NhZ2VTdHJpbmcuc3BsaXQoL3tcXCQoW159XSopfS8pO1xuICBjb25zdCBtZXNzYWdlUGFydHMgPSBbcGFydHNbMF1dO1xuICBjb25zdCBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgIHBsYWNlaG9sZGVyTmFtZXMucHVzaChwYXJ0c1tpXSk7XG4gICAgbWVzc2FnZVBhcnRzLnB1c2goYCR7cGFydHNbaSArIDFdfWApO1xuICB9XG4gIGNvbnN0IHJhd01lc3NhZ2VQYXJ0cyA9XG4gICAgICBtZXNzYWdlUGFydHMubWFwKHBhcnQgPT4gcGFydC5jaGFyQXQoMCkgPT09IEJMT0NLX01BUktFUiA/ICdcXFxcJyArIHBhcnQgOiBwYXJ0KTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiBtZXNzYWdlU3RyaW5nLFxuICAgIG1lc3NhZ2VQYXJ0czogbWFrZVRlbXBsYXRlT2JqZWN0KG1lc3NhZ2VQYXJ0cywgcmF3TWVzc2FnZVBhcnRzKSxcbiAgICBwbGFjZWhvbGRlck5hbWVzLFxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBQYXJzZWRUcmFuc2xhdGlvbmAgZnJvbSBhIHNldCBvZiBgbWVzc2FnZVBhcnRzYCBhbmQgYHBsYWNlaG9sZGVyTmFtZXNgLlxuICpcbiAqIEBwYXJhbSBtZXNzYWdlUGFydHMgVGhlIG1lc3NhZ2UgcGFydHMgdG8gYXBwZWFyIGluIHRoZSBQYXJzZWRUcmFuc2xhdGlvbi5cbiAqIEBwYXJhbSBwbGFjZWhvbGRlck5hbWVzIFRoZSBuYW1lcyBvZiB0aGUgcGxhY2Vob2xkZXJzIHRvIGludGVyc3BlcnNlIGJldHdlZW4gdGhlIGBtZXNzYWdlUGFydHNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBhcnNlZFRyYW5zbGF0aW9uKFxuICAgIG1lc3NhZ2VQYXJ0czogc3RyaW5nW10sIHBsYWNlaG9sZGVyTmFtZXM6IHN0cmluZ1tdID0gW10pOiBQYXJzZWRUcmFuc2xhdGlvbiB7XG4gIGxldCBtZXNzYWdlU3RyaW5nID0gbWVzc2FnZVBhcnRzWzBdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYWNlaG9sZGVyTmFtZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgbWVzc2FnZVN0cmluZyArPSBgeyQke3BsYWNlaG9sZGVyTmFtZXNbaV19fSR7bWVzc2FnZVBhcnRzW2kgKyAxXX1gO1xuICB9XG4gIHJldHVybiB7XG4gICAgdGV4dDogbWVzc2FnZVN0cmluZyxcbiAgICBtZXNzYWdlUGFydHM6IG1ha2VUZW1wbGF0ZU9iamVjdChtZXNzYWdlUGFydHMsIG1lc3NhZ2VQYXJ0cyksXG4gICAgcGxhY2Vob2xkZXJOYW1lc1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3BlY2lhbGl6ZWQgYXJyYXkgdGhhdCBpcyBwYXNzZWQgdG8gdGFnZ2VkLXN0cmluZyB0YWcgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSBjb29rZWQgVGhlIG1lc3NhZ2UgcGFydHMgd2l0aCB0aGVpciBlc2NhcGUgY29kZXMgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHJhdyBUaGUgbWVzc2FnZSBwYXJ0cyB3aXRoIHRoZWlyIGVzY2FwZWQgY29kZXMgYXMtaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVGVtcGxhdGVPYmplY3QoY29va2VkOiBzdHJpbmdbXSwgcmF3OiBzdHJpbmdbXSk6IFRlbXBsYXRlU3RyaW5nc0FycmF5IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgJ3JhdycsIHt2YWx1ZTogcmF3fSk7XG4gIHJldHVybiBjb29rZWQgYXMgYW55O1xufVxuXG5cbmZ1bmN0aW9uIGRlc2NyaWJlTWVzc2FnZShtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogc3RyaW5nIHtcbiAgY29uc3QgbWVhbmluZ1N0cmluZyA9IG1lc3NhZ2UubWVhbmluZyAmJiBgIC0gXCIke21lc3NhZ2UubWVhbmluZ31cImA7XG4gIGNvbnN0IGxlZ2FjeSA9IG1lc3NhZ2UubGVnYWN5SWRzICYmIG1lc3NhZ2UubGVnYWN5SWRzLmxlbmd0aCA+IDAgP1xuICAgICAgYCBbJHttZXNzYWdlLmxlZ2FjeUlkcy5tYXAobCA9PiBgXCIke2x9XCJgKS5qb2luKCcsICcpfV1gIDpcbiAgICAgICcnO1xuICByZXR1cm4gYFwiJHttZXNzYWdlLmlkfVwiJHtsZWdhY3l9IChcIiR7bWVzc2FnZS50ZXh0fVwiJHttZWFuaW5nU3RyaW5nfSlgO1xufSJdfQ==