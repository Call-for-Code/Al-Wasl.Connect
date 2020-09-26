import { __read } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { computeMsgId } from '@angular/compiler';
import { BLOCK_MARKER, ID_SEPARATOR, LEGACY_ID_INDICATOR, MEANING_SEPARATOR } from './constants';
/**
 * Re-export this helper function so that users of `@angular/localize` don't need to actively import
 * from `@angular/compiler`.
 */
export { computeMsgId } from '@angular/compiler';
/**
 * Parse a `$localize` tagged string into a structure that can be used for translation.
 *
 * See `ParsedMessage` for an example.
 */
export function parseMessage(messageParts, expressions, location) {
    var substitutions = {};
    var metadata = parseMetadata(messageParts[0], messageParts.raw[0]);
    var cleanedMessageParts = [metadata.text];
    var placeholderNames = [];
    var messageString = metadata.text;
    for (var i = 1; i < messageParts.length; i++) {
        var _a = splitBlock(messageParts[i], messageParts.raw[i]), messagePart = _a.text, _b = _a.block, placeholderName = _b === void 0 ? computePlaceholderName(i) : _b;
        messageString += "{$" + placeholderName + "}" + messagePart;
        if (expressions !== undefined) {
            substitutions[placeholderName] = expressions[i - 1];
        }
        placeholderNames.push(placeholderName);
        cleanedMessageParts.push(messagePart);
    }
    var messageId = metadata.id || computeMsgId(messageString, metadata.meaning || '');
    var legacyIds = metadata.legacyIds && metadata.legacyIds.filter(function (id) { return id !== messageId; });
    return {
        id: messageId,
        legacyIds: legacyIds,
        substitutions: substitutions,
        text: messageString,
        meaning: metadata.meaning || '',
        description: metadata.description || '',
        messageParts: cleanedMessageParts,
        placeholderNames: placeholderNames,
        location: location,
    };
}
/**
 * Parse the given message part (`cooked` + `raw`) to extract the message metadata from the text.
 *
 * If the message part has a metadata block this function will extract the `meaning`,
 * `description`, `customId` and `legacyId` (if provided) from the block. These metadata properties
 * are serialized in the string delimited by `|`, `@@` and `␟` respectively.
 *
 * (Note that `␟` is the `LEGACY_ID_INDICATOR` - see `constants.ts`.)
 *
 * For example:
 *
 * ```ts
 * `:meaning|description@@custom-id`
 * `:meaning|@@custom-id`
 * `:meaning|description`
 * `description@@custom-id`
 * `meaning|`
 * `description`
 * `@@custom-id`
 * `:meaning|description@@custom-id␟legacy-id-1␟legacy-id-2`
 * ```
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns A object containing any metadata that was parsed from the message part.
 */
export function parseMetadata(cooked, raw) {
    var _a = splitBlock(cooked, raw), messageString = _a.text, block = _a.block;
    if (block === undefined) {
        return { text: messageString };
    }
    else {
        var _b = __read(block.split(LEGACY_ID_INDICATOR)), meaningDescAndId = _b[0], legacyIds = _b.slice(1);
        var _c = __read(meaningDescAndId.split(ID_SEPARATOR, 2), 2), meaningAndDesc = _c[0], id = _c[1];
        var _d = __read(meaningAndDesc.split(MEANING_SEPARATOR, 2), 2), meaning = _d[0], description = _d[1];
        if (description === undefined) {
            description = meaning;
            meaning = undefined;
        }
        if (description === '') {
            description = undefined;
        }
        return { text: messageString, meaning: meaning, description: description, id: id, legacyIds: legacyIds };
    }
}
/**
 * Split a message part (`cooked` + `raw`) into an optional delimited "block" off the front and the
 * rest of the text of the message part.
 *
 * Blocks appear at the start of message parts. They are delimited by a colon `:` character at the
 * start and end of the block.
 *
 * If the block is in the first message part then it will be metadata about the whole message:
 * meaning, description, id.  Otherwise it will be metadata about the immediately preceding
 * substitution: placeholder name.
 *
 * Since blocks are optional, it is possible that the content of a message block actually starts
 * with a block marker. In this case the marker must be escaped `\:`.
 *
 * @param cooked The cooked version of the message part to parse.
 * @param raw The raw version of the message part to parse.
 * @returns An object containing the `text` of the message part and the text of the `block`, if it
 * exists.
 * @throws an error if the `block` is unterminated
 */
export function splitBlock(cooked, raw) {
    if (raw.charAt(0) !== BLOCK_MARKER) {
        return { text: cooked };
    }
    else {
        var endOfBlock = findEndOfBlock(cooked, raw);
        return {
            block: cooked.substring(1, endOfBlock),
            text: cooked.substring(endOfBlock + 1),
        };
    }
}
function computePlaceholderName(index) {
    return index === 1 ? 'PH' : "PH_" + (index - 1);
}
/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
export function findEndOfBlock(cooked, raw) {
    /************************************************************************************************
     * This function is repeated in `src/localize/src/localize.ts` and the two should be kept in sync.
     * (See that file for more explanation of why.)
     ************************************************************************************************/
    for (var cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
        if (raw[rawIndex] === '\\') {
            rawIndex++;
        }
        else if (cooked[cookedIndex] === BLOCK_MARKER) {
            return cookedIndex;
        }
    }
    throw new Error("Unterminated $localize metadata block in \"" + raw + "\".");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdXRpbHMvc3JjL21lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFL0MsT0FBTyxFQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFL0Y7OztHQUdHO0FBQ0gsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBZ0gvQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FDeEIsWUFBa0MsRUFBRSxXQUE0QixFQUNoRSxRQUF5QjtJQUMzQixJQUFNLGFBQWEsR0FBcUMsRUFBRSxDQUFDO0lBQzNELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLElBQU0sbUJBQW1CLEdBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsSUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7SUFDdEMsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFBLHFEQUM4QyxFQUQ3QyxxQkFBaUIsRUFBRSxhQUFrRCxFQUFsRCxnRUFDMEIsQ0FBQztRQUNyRCxhQUFhLElBQUksT0FBSyxlQUFlLFNBQUksV0FBYSxDQUFDO1FBQ3ZELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUM3QixhQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNyRDtRQUNELGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdkM7SUFDRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRixJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxLQUFLLFNBQVMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQzFGLE9BQU87UUFDTCxFQUFFLEVBQUUsU0FBUztRQUNiLFNBQVMsV0FBQTtRQUNULGFBQWEsZUFBQTtRQUNiLElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUU7UUFDL0IsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRTtRQUN2QyxZQUFZLEVBQUUsbUJBQW1CO1FBQ2pDLGdCQUFnQixrQkFBQTtRQUNoQixRQUFRLFVBQUE7S0FDVCxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFjLEVBQUUsR0FBVztJQUNqRCxJQUFBLDRCQUFzRCxFQUFyRCx1QkFBbUIsRUFBRSxnQkFBZ0MsQ0FBQztJQUM3RCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsT0FBTyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUMsQ0FBQztLQUM5QjtTQUFNO1FBQ0MsSUFBQSw2Q0FBbUUsRUFBbEUsd0JBQWdCLEVBQUUsdUJBQWdELENBQUM7UUFDcEUsSUFBQSx1REFBOEQsRUFBN0Qsc0JBQWMsRUFBRSxVQUE2QyxDQUFDO1FBQ2pFLElBQUEsMERBQXlGLEVBQXhGLGVBQU8sRUFBRSxtQkFBK0UsQ0FBQztRQUM5RixJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDN0IsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUN0QixPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ3RCLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDekI7UUFDRCxPQUFPLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLFNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxFQUFFLElBQUEsRUFBRSxTQUFTLFdBQUEsRUFBQyxDQUFDO0tBQ25FO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxNQUFjLEVBQUUsR0FBVztJQUNwRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxFQUFFO1FBQ2xDLE9BQU8sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7S0FDdkI7U0FBTTtRQUNMLElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsT0FBTztZQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDdEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QyxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBR0QsU0FBUyxzQkFBc0IsQ0FBQyxLQUFhO0lBQzNDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFNLEtBQUssR0FBRyxDQUFDLENBQUUsQ0FBQztBQUNoRCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxHQUFXO0lBQ3hEOzs7c0dBR2tHO0lBQ2xHLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDOUYsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzFCLFFBQVEsRUFBRSxDQUFDO1NBQ1o7YUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxZQUFZLEVBQUU7WUFDL0MsT0FBTyxXQUFXLENBQUM7U0FDcEI7S0FDRjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQTZDLEdBQUcsUUFBSSxDQUFDLENBQUM7QUFDeEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7Y29tcHV0ZU1zZ0lkfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5cbmltcG9ydCB7QkxPQ0tfTUFSS0VSLCBJRF9TRVBBUkFUT1IsIExFR0FDWV9JRF9JTkRJQ0FUT1IsIE1FQU5JTkdfU0VQQVJBVE9SfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogUmUtZXhwb3J0IHRoaXMgaGVscGVyIGZ1bmN0aW9uIHNvIHRoYXQgdXNlcnMgb2YgYEBhbmd1bGFyL2xvY2FsaXplYCBkb24ndCBuZWVkIHRvIGFjdGl2ZWx5IGltcG9ydFxuICogZnJvbSBgQGFuZ3VsYXIvY29tcGlsZXJgLlxuICovXG5leHBvcnQge2NvbXB1dGVNc2dJZH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuXG4vKipcbiAqIEEgc3RyaW5nIGNvbnRhaW5pbmcgYSB0cmFuc2xhdGlvbiBzb3VyY2UgbWVzc2FnZS5cbiAqXG4gKiBJLkUuIHRoZSBtZXNzYWdlIHRoYXQgaW5kaWNhdGVzIHdoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGZyb20uXG4gKlxuICogVXNlcyBgeyRwbGFjZWhvbGRlci1uYW1lfWAgdG8gaW5kaWNhdGUgYSBwbGFjZWhvbGRlci5cbiAqL1xuZXhwb3J0IHR5cGUgU291cmNlTWVzc2FnZSA9IHN0cmluZztcblxuLyoqXG4gKiBBIHN0cmluZyBjb250YWluaW5nIGEgdHJhbnNsYXRpb24gdGFyZ2V0IG1lc3NhZ2UuXG4gKlxuICogSS5FLiB0aGUgbWVzc2FnZSB0aGF0IGluZGljYXRlcyB3aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCB0by5cbiAqXG4gKiBVc2VzIGB7JHBsYWNlaG9sZGVyLW5hbWV9YCB0byBpbmRpY2F0ZSBhIHBsYWNlaG9sZGVyLlxuICovXG5leHBvcnQgdHlwZSBUYXJnZXRNZXNzYWdlID0gc3RyaW5nO1xuXG4vKipcbiAqIEEgc3RyaW5nIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyBhIG1lc3NhZ2UsIHRvIGJlIHVzZWQgZm9yIG1hdGNoaW5nIHRyYW5zbGF0aW9ucy5cbiAqL1xuZXhwb3J0IHR5cGUgTWVzc2FnZUlkID0gc3RyaW5nO1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZUxvY2F0aW9uIHtcbiAgc3RhcnQ6IHtsaW5lOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyfTtcbiAgZW5kOiB7bGluZTogbnVtYmVyLCBjb2x1bW46IG51bWJlcn07XG4gIGZpbGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBZGRpdGlvbmFsIGluZm9ybWF0aW9uIHRoYXQgY2FuIGJlIGFzc29jaWF0ZWQgd2l0aCBhIG1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZU1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEEgaHVtYW4gcmVhZGFibGUgcmVuZGVyaW5nIG9mIHRoZSBtZXNzYWdlXG4gICAqL1xuICB0ZXh0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGlzIG1lc3NhZ2UuXG4gICAqL1xuICBpZD86IE1lc3NhZ2VJZDtcbiAgLyoqXG4gICAqIExlZ2FjeSBtZXNzYWdlIGlkcywgaWYgcHJvdmlkZWQuXG4gICAqXG4gICAqIEluIGxlZ2FjeSBtZXNzYWdlIGZvcm1hdHMgdGhlIG1lc3NhZ2UgaWQgY2FuIG9ubHkgYmUgY29tcHV0ZWQgZGlyZWN0bHkgZnJvbSB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgc291cmNlLlxuICAgKlxuICAgKiBTaW5jZSB0aGlzIGluZm9ybWF0aW9uIGlzIG5vdCBhdmFpbGFibGUgaW4gYCRsb2NhbGl6ZWAgY2FsbHMsIHRoZSBsZWdhY3kgbWVzc2FnZSBpZHMgbWF5IGJlXG4gICAqIGF0dGFjaGVkIGJ5IHRoZSBjb21waWxlciB0byB0aGUgYCRsb2NhbGl6ZWAgbWV0YWJsb2NrIHNvIGl0IGNhbiBiZSB1c2VkIGlmIG5lZWRlZCBhdCB0aGUgcG9pbnRcbiAgICogb2YgdHJhbnNsYXRpb24gaWYgdGhlIHRyYW5zbGF0aW9ucyBhcmUgZW5jb2RlZCB1c2luZyB0aGUgbGVnYWN5IG1lc3NhZ2UgaWQuXG4gICAqL1xuICBsZWdhY3lJZHM/OiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIFRoZSBtZWFuaW5nIG9mIHRoZSBgbWVzc2FnZWAsIHVzZWQgdG8gZGlzdGluZ3Vpc2ggaWRlbnRpY2FsIGBtZXNzYWdlU3RyaW5nYHMuXG4gICAqL1xuICBtZWFuaW5nPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBgbWVzc2FnZWAsIHVzZWQgdG8gYWlkIHRyYW5zbGF0aW9uLlxuICAgKi9cbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbG9jYXRpb24gb2YgdGhlIG1lc3NhZ2UgaW4gdGhlIHNvdXJjZS5cbiAgICovXG4gIGxvY2F0aW9uPzogU291cmNlTG9jYXRpb247XG59XG5cbi8qKlxuICogSW5mb3JtYXRpb24gcGFyc2VkIGZyb20gYSBgJGxvY2FsaXplYCB0YWdnZWQgc3RyaW5nIHRoYXQgaXMgdXNlZCB0byB0cmFuc2xhdGUgaXQuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBjb25zdCBuYW1lID0gJ0pvIEJsb2dncyc7XG4gKiAkbG9jYWxpemVgSGVsbG8gJHtuYW1lfTp0aXRsZSFgO1xuICogYGBgXG4gKlxuICogTWF5IGJlIHBhcnNlZCBpbnRvOlxuICpcbiAqIGBgYFxuICoge1xuICogICBpZDogJzY5OTgxOTQ1MDc1OTc3MzA1OTEnLFxuICogICBzdWJzdGl0dXRpb25zOiB7IHRpdGxlOiAnSm8gQmxvZ2dzJyB9LFxuICogICBtZXNzYWdlU3RyaW5nOiAnSGVsbG8geyR0aXRsZX0hJyxcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZE1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlTWV0YWRhdGEge1xuICAvKipcbiAgICogVGhlIGtleSB1c2VkIHRvIGxvb2sgdXAgdGhlIGFwcHJvcHJpYXRlIHRyYW5zbGF0aW9uIHRhcmdldC5cbiAgICpcbiAgICogSW4gYFBhcnNlZE1lc3NhZ2VgIHRoaXMgaXMgYSByZXF1aXJlZCBmaWVsZCwgd2hlcmVhcyBpdCBpcyBvcHRpb25hbCBpbiBgTWVzc2FnZU1ldGFkYXRhYC5cbiAgICovXG4gIGlkOiBNZXNzYWdlSWQ7XG4gIC8qKlxuICAgKiBBIG1hcHBpbmcgb2YgcGxhY2Vob2xkZXIgbmFtZXMgdG8gc3Vic3RpdHV0aW9uIHZhbHVlcy5cbiAgICovXG4gIHN1YnN0aXR1dGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT47XG4gIC8qKlxuICAgKiBUaGUgc3RhdGljIHBhcnRzIG9mIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgbWVzc2FnZVBhcnRzOiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIFRoZSBuYW1lcyBvZiB0aGUgcGxhY2Vob2xkZXJzIHRoYXQgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHN1YnN0aXR1dGlvbnMuXG4gICAqL1xuICBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBQYXJzZSBhIGAkbG9jYWxpemVgIHRhZ2dlZCBzdHJpbmcgaW50byBhIHN0cnVjdHVyZSB0aGF0IGNhbiBiZSB1c2VkIGZvciB0cmFuc2xhdGlvbi5cbiAqXG4gKiBTZWUgYFBhcnNlZE1lc3NhZ2VgIGZvciBhbiBleGFtcGxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNZXNzYWdlKFxuICAgIG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksIGV4cHJlc3Npb25zPzogcmVhZG9ubHkgYW55W10sXG4gICAgbG9jYXRpb24/OiBTb3VyY2VMb2NhdGlvbik6IFBhcnNlZE1lc3NhZ2Uge1xuICBjb25zdCBzdWJzdGl0dXRpb25zOiB7W3BsYWNlaG9sZGVyTmFtZTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjb25zdCBtZXRhZGF0YSA9IHBhcnNlTWV0YWRhdGEobWVzc2FnZVBhcnRzWzBdLCBtZXNzYWdlUGFydHMucmF3WzBdKTtcbiAgY29uc3QgY2xlYW5lZE1lc3NhZ2VQYXJ0czogc3RyaW5nW10gPSBbbWV0YWRhdGEudGV4dF07XG4gIGNvbnN0IHBsYWNlaG9sZGVyTmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGxldCBtZXNzYWdlU3RyaW5nID0gbWV0YWRhdGEudGV4dDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtZXNzYWdlUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7dGV4dDogbWVzc2FnZVBhcnQsIGJsb2NrOiBwbGFjZWhvbGRlck5hbWUgPSBjb21wdXRlUGxhY2Vob2xkZXJOYW1lKGkpfSA9XG4gICAgICAgIHNwbGl0QmxvY2sobWVzc2FnZVBhcnRzW2ldLCBtZXNzYWdlUGFydHMucmF3W2ldKTtcbiAgICBtZXNzYWdlU3RyaW5nICs9IGB7JCR7cGxhY2Vob2xkZXJOYW1lfX0ke21lc3NhZ2VQYXJ0fWA7XG4gICAgaWYgKGV4cHJlc3Npb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHN1YnN0aXR1dGlvbnNbcGxhY2Vob2xkZXJOYW1lXSA9IGV4cHJlc3Npb25zW2kgLSAxXTtcbiAgICB9XG4gICAgcGxhY2Vob2xkZXJOYW1lcy5wdXNoKHBsYWNlaG9sZGVyTmFtZSk7XG4gICAgY2xlYW5lZE1lc3NhZ2VQYXJ0cy5wdXNoKG1lc3NhZ2VQYXJ0KTtcbiAgfVxuICBjb25zdCBtZXNzYWdlSWQgPSBtZXRhZGF0YS5pZCB8fCBjb21wdXRlTXNnSWQobWVzc2FnZVN0cmluZywgbWV0YWRhdGEubWVhbmluZyB8fCAnJyk7XG4gIGNvbnN0IGxlZ2FjeUlkcyA9IG1ldGFkYXRhLmxlZ2FjeUlkcyAmJiBtZXRhZGF0YS5sZWdhY3lJZHMuZmlsdGVyKGlkID0+IGlkICE9PSBtZXNzYWdlSWQpO1xuICByZXR1cm4ge1xuICAgIGlkOiBtZXNzYWdlSWQsXG4gICAgbGVnYWN5SWRzLFxuICAgIHN1YnN0aXR1dGlvbnMsXG4gICAgdGV4dDogbWVzc2FnZVN0cmluZyxcbiAgICBtZWFuaW5nOiBtZXRhZGF0YS5tZWFuaW5nIHx8ICcnLFxuICAgIGRlc2NyaXB0aW9uOiBtZXRhZGF0YS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICBtZXNzYWdlUGFydHM6IGNsZWFuZWRNZXNzYWdlUGFydHMsXG4gICAgcGxhY2Vob2xkZXJOYW1lcyxcbiAgICBsb2NhdGlvbixcbiAgfTtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gbWVzc2FnZSBwYXJ0IChgY29va2VkYCArIGByYXdgKSB0byBleHRyYWN0IHRoZSBtZXNzYWdlIG1ldGFkYXRhIGZyb20gdGhlIHRleHQuXG4gKlxuICogSWYgdGhlIG1lc3NhZ2UgcGFydCBoYXMgYSBtZXRhZGF0YSBibG9jayB0aGlzIGZ1bmN0aW9uIHdpbGwgZXh0cmFjdCB0aGUgYG1lYW5pbmdgLFxuICogYGRlc2NyaXB0aW9uYCwgYGN1c3RvbUlkYCBhbmQgYGxlZ2FjeUlkYCAoaWYgcHJvdmlkZWQpIGZyb20gdGhlIGJsb2NrLiBUaGVzZSBtZXRhZGF0YSBwcm9wZXJ0aWVzXG4gKiBhcmUgc2VyaWFsaXplZCBpbiB0aGUgc3RyaW5nIGRlbGltaXRlZCBieSBgfGAsIGBAQGAgYW5kIGDikJ9gIHJlc3BlY3RpdmVseS5cbiAqXG4gKiAoTm90ZSB0aGF0IGDikJ9gIGlzIHRoZSBgTEVHQUNZX0lEX0lORElDQVRPUmAgLSBzZWUgYGNvbnN0YW50cy50c2AuKVxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHRzXG4gKiBgOm1lYW5pbmd8ZGVzY3JpcHRpb25AQGN1c3RvbS1pZGBcbiAqIGA6bWVhbmluZ3xAQGN1c3RvbS1pZGBcbiAqIGA6bWVhbmluZ3xkZXNjcmlwdGlvbmBcbiAqIGBkZXNjcmlwdGlvbkBAY3VzdG9tLWlkYFxuICogYG1lYW5pbmd8YFxuICogYGRlc2NyaXB0aW9uYFxuICogYEBAY3VzdG9tLWlkYFxuICogYDptZWFuaW5nfGRlc2NyaXB0aW9uQEBjdXN0b20taWTikJ9sZWdhY3ktaWQtMeKQn2xlZ2FjeS1pZC0yYFxuICogYGBgXG4gKlxuICogQHBhcmFtIGNvb2tlZCBUaGUgY29va2VkIHZlcnNpb24gb2YgdGhlIG1lc3NhZ2UgcGFydCB0byBwYXJzZS5cbiAqIEBwYXJhbSByYXcgVGhlIHJhdyB2ZXJzaW9uIG9mIHRoZSBtZXNzYWdlIHBhcnQgdG8gcGFyc2UuXG4gKiBAcmV0dXJucyBBIG9iamVjdCBjb250YWluaW5nIGFueSBtZXRhZGF0YSB0aGF0IHdhcyBwYXJzZWQgZnJvbSB0aGUgbWVzc2FnZSBwYXJ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNZXRhZGF0YShjb29rZWQ6IHN0cmluZywgcmF3OiBzdHJpbmcpOiBNZXNzYWdlTWV0YWRhdGEge1xuICBjb25zdCB7dGV4dDogbWVzc2FnZVN0cmluZywgYmxvY2t9ID0gc3BsaXRCbG9jayhjb29rZWQsIHJhdyk7XG4gIGlmIChibG9jayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHt0ZXh0OiBtZXNzYWdlU3RyaW5nfTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbbWVhbmluZ0Rlc2NBbmRJZCwgLi4ubGVnYWN5SWRzXSA9IGJsb2NrLnNwbGl0KExFR0FDWV9JRF9JTkRJQ0FUT1IpO1xuICAgIGNvbnN0IFttZWFuaW5nQW5kRGVzYywgaWRdID0gbWVhbmluZ0Rlc2NBbmRJZC5zcGxpdChJRF9TRVBBUkFUT1IsIDIpO1xuICAgIGxldCBbbWVhbmluZywgZGVzY3JpcHRpb25dOiAoc3RyaW5nfHVuZGVmaW5lZClbXSA9IG1lYW5pbmdBbmREZXNjLnNwbGl0KE1FQU5JTkdfU0VQQVJBVE9SLCAyKTtcbiAgICBpZiAoZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGVzY3JpcHRpb24gPSBtZWFuaW5nO1xuICAgICAgbWVhbmluZyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGRlc2NyaXB0aW9uID09PSAnJykge1xuICAgICAgZGVzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB7dGV4dDogbWVzc2FnZVN0cmluZywgbWVhbmluZywgZGVzY3JpcHRpb24sIGlkLCBsZWdhY3lJZHN9O1xuICB9XG59XG5cbi8qKlxuICogU3BsaXQgYSBtZXNzYWdlIHBhcnQgKGBjb29rZWRgICsgYHJhd2ApIGludG8gYW4gb3B0aW9uYWwgZGVsaW1pdGVkIFwiYmxvY2tcIiBvZmYgdGhlIGZyb250IGFuZCB0aGVcbiAqIHJlc3Qgb2YgdGhlIHRleHQgb2YgdGhlIG1lc3NhZ2UgcGFydC5cbiAqXG4gKiBCbG9ja3MgYXBwZWFyIGF0IHRoZSBzdGFydCBvZiBtZXNzYWdlIHBhcnRzLiBUaGV5IGFyZSBkZWxpbWl0ZWQgYnkgYSBjb2xvbiBgOmAgY2hhcmFjdGVyIGF0IHRoZVxuICogc3RhcnQgYW5kIGVuZCBvZiB0aGUgYmxvY2suXG4gKlxuICogSWYgdGhlIGJsb2NrIGlzIGluIHRoZSBmaXJzdCBtZXNzYWdlIHBhcnQgdGhlbiBpdCB3aWxsIGJlIG1ldGFkYXRhIGFib3V0IHRoZSB3aG9sZSBtZXNzYWdlOlxuICogbWVhbmluZywgZGVzY3JpcHRpb24sIGlkLiAgT3RoZXJ3aXNlIGl0IHdpbGwgYmUgbWV0YWRhdGEgYWJvdXQgdGhlIGltbWVkaWF0ZWx5IHByZWNlZGluZ1xuICogc3Vic3RpdHV0aW9uOiBwbGFjZWhvbGRlciBuYW1lLlxuICpcbiAqIFNpbmNlIGJsb2NrcyBhcmUgb3B0aW9uYWwsIGl0IGlzIHBvc3NpYmxlIHRoYXQgdGhlIGNvbnRlbnQgb2YgYSBtZXNzYWdlIGJsb2NrIGFjdHVhbGx5IHN0YXJ0c1xuICogd2l0aCBhIGJsb2NrIG1hcmtlci4gSW4gdGhpcyBjYXNlIHRoZSBtYXJrZXIgbXVzdCBiZSBlc2NhcGVkIGBcXDpgLlxuICpcbiAqIEBwYXJhbSBjb29rZWQgVGhlIGNvb2tlZCB2ZXJzaW9uIG9mIHRoZSBtZXNzYWdlIHBhcnQgdG8gcGFyc2UuXG4gKiBAcGFyYW0gcmF3IFRoZSByYXcgdmVyc2lvbiBvZiB0aGUgbWVzc2FnZSBwYXJ0IHRvIHBhcnNlLlxuICogQHJldHVybnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGB0ZXh0YCBvZiB0aGUgbWVzc2FnZSBwYXJ0IGFuZCB0aGUgdGV4dCBvZiB0aGUgYGJsb2NrYCwgaWYgaXRcbiAqIGV4aXN0cy5cbiAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIGBibG9ja2AgaXMgdW50ZXJtaW5hdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEJsb2NrKGNvb2tlZDogc3RyaW5nLCByYXc6IHN0cmluZyk6IHt0ZXh0OiBzdHJpbmcsIGJsb2NrPzogc3RyaW5nfSB7XG4gIGlmIChyYXcuY2hhckF0KDApICE9PSBCTE9DS19NQVJLRVIpIHtcbiAgICByZXR1cm4ge3RleHQ6IGNvb2tlZH07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZW5kT2ZCbG9jayA9IGZpbmRFbmRPZkJsb2NrKGNvb2tlZCwgcmF3KTtcbiAgICByZXR1cm4ge1xuICAgICAgYmxvY2s6IGNvb2tlZC5zdWJzdHJpbmcoMSwgZW5kT2ZCbG9jayksXG4gICAgICB0ZXh0OiBjb29rZWQuc3Vic3RyaW5nKGVuZE9mQmxvY2sgKyAxKSxcbiAgICB9O1xuICB9XG59XG5cblxuZnVuY3Rpb24gY29tcHV0ZVBsYWNlaG9sZGVyTmFtZShpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBpbmRleCA9PT0gMSA/ICdQSCcgOiBgUEhfJHtpbmRleCAtIDF9YDtcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBlbmQgb2YgYSBcIm1hcmtlZCBibG9ja1wiIGluZGljYXRlZCBieSB0aGUgZmlyc3Qgbm9uLWVzY2FwZWQgY29sb24uXG4gKlxuICogQHBhcmFtIGNvb2tlZCBUaGUgY29va2VkIHN0cmluZyAod2hlcmUgZXNjYXBlZCBjaGFycyBoYXZlIGJlZW4gcHJvY2Vzc2VkKVxuICogQHBhcmFtIHJhdyBUaGUgcmF3IHN0cmluZyAod2hlcmUgZXNjYXBlIHNlcXVlbmNlcyBhcmUgc3RpbGwgaW4gcGxhY2UpXG4gKlxuICogQHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBlbmQgb2YgYmxvY2sgbWFya2VyXG4gKiBAdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBibG9jayBpcyB1bnRlcm1pbmF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRFbmRPZkJsb2NrKGNvb2tlZDogc3RyaW5nLCByYXc6IHN0cmluZyk6IG51bWJlciB7XG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogVGhpcyBmdW5jdGlvbiBpcyByZXBlYXRlZCBpbiBgc3JjL2xvY2FsaXplL3NyYy9sb2NhbGl6ZS50c2AgYW5kIHRoZSB0d28gc2hvdWxkIGJlIGtlcHQgaW4gc3luYy5cbiAgICogKFNlZSB0aGF0IGZpbGUgZm9yIG1vcmUgZXhwbGFuYXRpb24gb2Ygd2h5LilcbiAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgZm9yIChsZXQgY29va2VkSW5kZXggPSAxLCByYXdJbmRleCA9IDE7IGNvb2tlZEluZGV4IDwgY29va2VkLmxlbmd0aDsgY29va2VkSW5kZXgrKywgcmF3SW5kZXgrKykge1xuICAgIGlmIChyYXdbcmF3SW5kZXhdID09PSAnXFxcXCcpIHtcbiAgICAgIHJhd0luZGV4Kys7XG4gICAgfSBlbHNlIGlmIChjb29rZWRbY29va2VkSW5kZXhdID09PSBCTE9DS19NQVJLRVIpIHtcbiAgICAgIHJldHVybiBjb29rZWRJbmRleDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBVbnRlcm1pbmF0ZWQgJGxvY2FsaXplIG1ldGFkYXRhIGJsb2NrIGluIFwiJHtyYXd9XCIuYCk7XG59Il19