/// <amd-module name="@angular/localize/src/tools/src/translate/translation_files/translation_parsers/simple_json_translation_parser" />
import { ParsedTranslationBundle, TranslationParser } from './translation_parser';
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
export declare class SimpleJsonTranslationParser implements TranslationParser<Object> {
    canParse(filePath: string, contents: string): Object | false;
    parse(_filePath: string, contents: string, json?: Object): ParsedTranslationBundle;
}
