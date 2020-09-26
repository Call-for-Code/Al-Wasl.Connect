(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/packages/entry_point", ["require", "exports", "tslib", "canonical-path", "path", "typescript", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/ngcc/src/host/umd_host", "@angular/compiler-cli/ngcc/src/utils"], factory);
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
    var canonical_path_1 = require("canonical-path");
    var path_1 = require("path");
    var ts = require("typescript");
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var umd_host_1 = require("@angular/compiler-cli/ngcc/src/host/umd_host");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/utils");
    // We need to keep the elements of this const and the `EntryPointJsonProperty` type in sync.
    exports.SUPPORTED_FORMAT_PROPERTIES = ['fesm2015', 'fesm5', 'es2015', 'esm2015', 'esm5', 'main', 'module'];
    /**
     * The path does not represent an entry-point:
     * * there is no package.json at the path and there is no config to force an entry-point
     * * or the entrypoint is `ignored` by a config.
     */
    exports.NO_ENTRY_POINT = 'no-entry-point';
    /**
     * The path has a package.json, but it is not a valid entry-point for ngcc processing.
     */
    exports.INVALID_ENTRY_POINT = 'invalid-entry-point';
    /**
     * Try to create an entry-point from the given paths and properties.
     *
     * @param packagePath the absolute path to the containing npm package
     * @param entryPointPath the absolute path to the potential entry-point.
     * @returns
     * - An entry-point if it is valid.
     * - `undefined` when there is no package.json at the path and there is no config to force an
     * entry-point or the entrypoint is `ignored`.
     * - `null` there is a package.json but it is not a valid Angular compiled entry-point.
     */
    function getEntryPointInfo(fs, config, logger, packagePath, entryPointPath) {
        var packageJsonPath = file_system_1.resolve(entryPointPath, 'package.json');
        var packageVersion = getPackageVersion(fs, packageJsonPath);
        var entryPointConfig = config.getConfig(packagePath, packageVersion).entryPoints[entryPointPath];
        var hasConfig = entryPointConfig !== undefined;
        if (!hasConfig && !fs.exists(packageJsonPath)) {
            // No package.json and no config
            return exports.NO_ENTRY_POINT;
        }
        if (hasConfig && entryPointConfig.ignore === true) {
            // Explicitly ignored
            return exports.NO_ENTRY_POINT;
        }
        var loadedEntryPointPackageJson = loadEntryPointPackage(fs, logger, packageJsonPath, hasConfig);
        var entryPointPackageJson = hasConfig ?
            mergeConfigAndPackageJson(loadedEntryPointPackageJson, entryPointConfig, packagePath, entryPointPath) :
            loadedEntryPointPackageJson;
        if (entryPointPackageJson === null) {
            // package.json exists but could not be parsed and there was no redeeming config
            return exports.INVALID_ENTRY_POINT;
        }
        var typings = entryPointPackageJson.typings || entryPointPackageJson.types ||
            guessTypingsFromPackageJson(fs, entryPointPath, entryPointPackageJson);
        if (typeof typings !== 'string') {
            // Missing the required `typings` property
            return exports.INVALID_ENTRY_POINT;
        }
        // An entry-point is assumed to be compiled by Angular if there is either:
        // * a `metadata.json` file next to the typings entry-point
        // * a custom config for this entry-point
        var metadataPath = file_system_1.resolve(entryPointPath, typings.replace(/\.d\.ts$/, '') + '.metadata.json');
        var compiledByAngular = entryPointConfig !== undefined || fs.exists(metadataPath);
        var entryPointInfo = {
            name: entryPointPackageJson.name,
            packageJson: entryPointPackageJson,
            package: packagePath,
            path: entryPointPath,
            typings: file_system_1.resolve(entryPointPath, typings), compiledByAngular: compiledByAngular,
            ignoreMissingDependencies: entryPointConfig !== undefined ? !!entryPointConfig.ignoreMissingDependencies : false,
            generateDeepReexports: entryPointConfig !== undefined ? !!entryPointConfig.generateDeepReexports : false,
        };
        return entryPointInfo;
    }
    exports.getEntryPointInfo = getEntryPointInfo;
    /**
     * Convert a package.json property into an entry-point format.
     *
     * @param property The property to convert to a format.
     * @returns An entry-point format or `undefined` if none match the given property.
     */
    function getEntryPointFormat(fs, entryPoint, property) {
        switch (property) {
            case 'fesm2015':
                return 'esm2015';
            case 'fesm5':
                return 'esm5';
            case 'es2015':
                return 'esm2015';
            case 'esm2015':
                return 'esm2015';
            case 'esm5':
                return 'esm5';
            case 'main':
                var mainFile = entryPoint.packageJson['main'];
                if (mainFile === undefined) {
                    return undefined;
                }
                var pathToMain = file_system_1.join(entryPoint.path, mainFile);
                return isUmdModule(fs, pathToMain) ? 'umd' : 'commonjs';
            case 'module':
                return 'esm5';
            default:
                return undefined;
        }
    }
    exports.getEntryPointFormat = getEntryPointFormat;
    /**
     * Parses the JSON from a package.json file.
     * @param packageJsonPath the absolute path to the package.json file.
     * @returns JSON from the package.json file if it is valid, `null` otherwise.
     */
    function loadEntryPointPackage(fs, logger, packageJsonPath, hasConfig) {
        try {
            return JSON.parse(fs.readFile(packageJsonPath));
        }
        catch (e) {
            if (!hasConfig) {
                // We may have run into a package.json with unexpected symbols
                logger.warn("Failed to read entry point info from " + packageJsonPath + " with error " + e + ".");
            }
            return null;
        }
    }
    function isUmdModule(fs, sourceFilePath) {
        var resolvedPath = utils_1.resolveFileWithPostfixes(fs, sourceFilePath, ['', '.js', '/index.js']);
        if (resolvedPath === null) {
            return false;
        }
        var sourceFile = ts.createSourceFile(sourceFilePath, fs.readFile(resolvedPath), ts.ScriptTarget.ES5);
        return sourceFile.statements.length > 0 &&
            umd_host_1.parseStatementForUmdModule(sourceFile.statements[0]) !== null;
    }
    function mergeConfigAndPackageJson(entryPointPackageJson, entryPointConfig, packagePath, entryPointPath) {
        if (entryPointPackageJson !== null) {
            return tslib_1.__assign(tslib_1.__assign({}, entryPointPackageJson), entryPointConfig.override);
        }
        else {
            var name = path_1.basename(packagePath) + "/" + canonical_path_1.relative(packagePath, entryPointPath);
            return tslib_1.__assign({ name: name }, entryPointConfig.override);
        }
    }
    function guessTypingsFromPackageJson(fs, entryPointPath, entryPointPackageJson) {
        var e_1, _a;
        try {
            for (var SUPPORTED_FORMAT_PROPERTIES_1 = tslib_1.__values(exports.SUPPORTED_FORMAT_PROPERTIES), SUPPORTED_FORMAT_PROPERTIES_1_1 = SUPPORTED_FORMAT_PROPERTIES_1.next(); !SUPPORTED_FORMAT_PROPERTIES_1_1.done; SUPPORTED_FORMAT_PROPERTIES_1_1 = SUPPORTED_FORMAT_PROPERTIES_1.next()) {
                var prop = SUPPORTED_FORMAT_PROPERTIES_1_1.value;
                var field = entryPointPackageJson[prop];
                if (typeof field !== 'string') {
                    // Some crazy packages have things like arrays in these fields!
                    continue;
                }
                var relativeTypingsPath = field.replace(/\.js$/, '.d.ts');
                var typingsPath = file_system_1.resolve(entryPointPath, relativeTypingsPath);
                if (fs.exists(typingsPath)) {
                    return typingsPath;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (SUPPORTED_FORMAT_PROPERTIES_1_1 && !SUPPORTED_FORMAT_PROPERTIES_1_1.done && (_a = SUPPORTED_FORMAT_PROPERTIES_1.return)) _a.call(SUPPORTED_FORMAT_PROPERTIES_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    }
    /**
     * Find the version of the package at `packageJsonPath`.
     *
     * @returns the version string or `null` if the package.json does not exist or is invalid.
     */
    function getPackageVersion(fs, packageJsonPath) {
        try {
            if (fs.exists(packageJsonPath)) {
                var packageJson = JSON.parse(fs.readFile(packageJsonPath));
                return packageJson['version'] || null;
            }
        }
        catch (_a) {
            // Do nothing
        }
        return null;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvcGFja2FnZXMvZW50cnlfcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsaURBQXdDO0lBQ3hDLDZCQUE4QjtJQUM5QiwrQkFBaUM7SUFDakMsMkVBQXlGO0lBQ3pGLHlFQUE0RDtJQUU1RCw4REFBa0Q7SUE0RGxELDRGQUE0RjtJQUMvRSxRQUFBLDJCQUEyQixHQUNwQyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBR3pFOzs7O09BSUc7SUFDVSxRQUFBLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztJQUUvQzs7T0FFRztJQUNVLFFBQUEsbUJBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFjekQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQWdCLGlCQUFpQixDQUM3QixFQUFjLEVBQUUsTUFBeUIsRUFBRSxNQUFjLEVBQUUsV0FBMkIsRUFDdEYsY0FBOEI7UUFDaEMsSUFBTSxlQUFlLEdBQUcscUJBQU8sQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDaEUsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQU0sZ0JBQWdCLEdBQ2xCLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RSxJQUFNLFNBQVMsR0FBRyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7UUFFakQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDN0Ms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RyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDO2FBQ3ZDO1NBQ0Y7UUFBQyxXQUFNO1lBQ04sYUFBYTtTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtyZWxhdGl2ZX0gZnJvbSAnY2Fub25pY2FsLXBhdGgnO1xuaW1wb3J0IHtiYXNlbmFtZX0gZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIGpvaW4sIHJlc29sdmV9IGZyb20gJy4uLy4uLy4uL3NyYy9uZ3RzYy9maWxlX3N5c3RlbSc7XG5pbXBvcnQge3BhcnNlU3RhdGVtZW50Rm9yVW1kTW9kdWxlfSBmcm9tICcuLi9ob3N0L3VtZF9ob3N0JztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi9sb2dnaW5nL2xvZ2dlcic7XG5pbXBvcnQge3Jlc29sdmVGaWxlV2l0aFBvc3RmaXhlc30gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtOZ2NjQ29uZmlndXJhdGlvbiwgTmdjY0VudHJ5UG9pbnRDb25maWd9IGZyb20gJy4vY29uZmlndXJhdGlvbic7XG5cbi8qKlxuICogVGhlIHBvc3NpYmxlIHZhbHVlcyBmb3IgdGhlIGZvcm1hdCBvZiBhbiBlbnRyeS1wb2ludC5cbiAqL1xuZXhwb3J0IHR5cGUgRW50cnlQb2ludEZvcm1hdCA9ICdlc201JyB8ICdlc20yMDE1JyB8ICd1bWQnIHwgJ2NvbW1vbmpzJztcblxuLyoqXG4gKiBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBhbiBlbnRyeS1wb2ludCwgaW5jbHVkaW5nIHBhdGhzXG4gKiB0byBlYWNoIG9mIHRoZSBwb3NzaWJsZSBlbnRyeS1wb2ludCBmb3JtYXRzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5UG9pbnQgZXh0ZW5kcyBKc29uT2JqZWN0IHtcbiAgLyoqIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIChlLmcuIGBAYW5ndWxhci9jb3JlYCkuICovXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqIFRoZSBwYXJzZWQgcGFja2FnZS5qc29uIGZpbGUgZm9yIHRoaXMgZW50cnktcG9pbnQuICovXG4gIHBhY2thZ2VKc29uOiBFbnRyeVBvaW50UGFja2FnZUpzb247XG4gIC8qKiBUaGUgcGF0aCB0byB0aGUgcGFja2FnZSB0aGF0IGNvbnRhaW5zIHRoaXMgZW50cnktcG9pbnQuICovXG4gIHBhY2thZ2U6IEFic29sdXRlRnNQYXRoO1xuICAvKiogVGhlIHBhdGggdG8gdGhpcyBlbnRyeSBwb2ludC4gKi9cbiAgcGF0aDogQWJzb2x1dGVGc1BhdGg7XG4gIC8qKiBUaGUgcGF0aCB0byBhIHR5cGluZ3MgKC5kLnRzKSBmaWxlIGZvciB0aGlzIGVudHJ5LXBvaW50LiAqL1xuICB0eXBpbmdzOiBBYnNvbHV0ZUZzUGF0aDtcbiAgLyoqIElzIHRoaXMgRW50cnlQb2ludCBjb21waWxlZCB3aXRoIHRoZSBBbmd1bGFyIFZpZXcgRW5naW5lIGNvbXBpbGVyPyAqL1xuICBjb21waWxlZEJ5QW5ndWxhcjogYm9vbGVhbjtcbiAgLyoqIFNob3VsZCBuZ2NjIGlnbm9yZSBtaXNzaW5nIGRlcGVuZGVuY2llcyBhbmQgcHJvY2VzcyB0aGlzIGVudHJ5cG9pbnQgYW55d2F5PyAqL1xuICBpZ25vcmVNaXNzaW5nRGVwZW5kZW5jaWVzOiBib29sZWFuO1xuICAvKiogU2hvdWxkIG5nY2MgZ2VuZXJhdGUgZGVlcCByZS1leHBvcnRzIGZvciB0aGlzIGVudHJ5cG9pbnQ/ICovXG4gIGdlbmVyYXRlRGVlcFJlZXhwb3J0czogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgSnNvblByaW1pdGl2ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsO1xuZXhwb3J0IHR5cGUgSnNvblZhbHVlID0gSnNvblByaW1pdGl2ZSB8IEpzb25BcnJheSB8IEpzb25PYmplY3QgfCB1bmRlZmluZWQ7XG5leHBvcnQgaW50ZXJmYWNlIEpzb25BcnJheSBleHRlbmRzIEFycmF5PEpzb25WYWx1ZT4ge31cbmV4cG9ydCBpbnRlcmZhY2UgSnNvbk9iamVjdCB7IFtrZXk6IHN0cmluZ106IEpzb25WYWx1ZTsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhY2thZ2VKc29uRm9ybWF0UHJvcGVydGllc01hcCB7XG4gIGZlc20yMDE1Pzogc3RyaW5nO1xuICBmZXNtNT86IHN0cmluZztcbiAgZXMyMDE1Pzogc3RyaW5nOyAgLy8gaWYgZXhpc3RzIHRoZW4gaXQgaXMgYWN0dWFsbHkgRkVTTTIwMTVcbiAgZXNtMjAxNT86IHN0cmluZztcbiAgZXNtNT86IHN0cmluZztcbiAgbWFpbj86IHN0cmluZzsgICAgIC8vIFVNRFxuICBtb2R1bGU/OiBzdHJpbmc7ICAgLy8gaWYgZXhpc3RzIHRoZW4gaXQgaXMgYWN0dWFsbHkgRkVTTTVcbiAgdHlwZXM/OiBzdHJpbmc7ICAgIC8vIFN5bm9ueW1vdXMgdG8gYHR5cGluZ3NgIHByb3BlcnR5IC0gc2VlIGh0dHBzOi8vYml0Lmx5LzJPZ1dwMkhcbiAgdHlwaW5ncz86IHN0cmluZzsgIC8vIFR5cGVTY3JpcHQgLmQudHMgZmlsZXNcbn1cblxuZXhwb3J0IHR5cGUgUGFja2FnZUpzb25Gb3JtYXRQcm9wZXJ0aWVzID0ga2V5b2YgUGFja2FnZUpzb25Gb3JtYXRQcm9wZXJ0aWVzTWFwO1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbWF5IGJlIGxvYWRlZCBmcm9tIHRoZSBgcGFja2FnZS5qc29uYCBmaWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5UG9pbnRQYWNrYWdlSnNvbiBleHRlbmRzIEpzb25PYmplY3QsIFBhY2thZ2VKc29uRm9ybWF0UHJvcGVydGllc01hcCB7XG4gIG5hbWU6IHN0cmluZztcbiAgc2NyaXB0cz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIF9fcHJvY2Vzc2VkX2J5X2l2eV9uZ2NjX18/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG5leHBvcnQgdHlwZSBFbnRyeVBvaW50SnNvblByb3BlcnR5ID0gRXhjbHVkZTxQYWNrYWdlSnNvbkZvcm1hdFByb3BlcnRpZXMsICd0eXBlcyd8J3R5cGluZ3MnPjtcbi8vIFdlIG5lZWQgdG8ga2VlcCB0aGUgZWxlbWVudHMgb2YgdGhpcyBjb25zdCBhbmQgdGhlIGBFbnRyeVBvaW50SnNvblByb3BlcnR5YCB0eXBlIGluIHN5bmMuXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX0ZPUk1BVF9QUk9QRVJUSUVTOiBFbnRyeVBvaW50SnNvblByb3BlcnR5W10gPVxuICAgIFsnZmVzbTIwMTUnLCAnZmVzbTUnLCAnZXMyMDE1JywgJ2VzbTIwMTUnLCAnZXNtNScsICdtYWluJywgJ21vZHVsZSddO1xuXG5cbi8qKlxuICogVGhlIHBhdGggZG9lcyBub3QgcmVwcmVzZW50IGFuIGVudHJ5LXBvaW50OlxuICogKiB0aGVyZSBpcyBubyBwYWNrYWdlLmpzb24gYXQgdGhlIHBhdGggYW5kIHRoZXJlIGlzIG5vIGNvbmZpZyB0byBmb3JjZSBhbiBlbnRyeS1wb2ludFxuICogKiBvciB0aGUgZW50cnlwb2ludCBpcyBgaWdub3JlZGAgYnkgYSBjb25maWcuXG4gKi9cbmV4cG9ydCBjb25zdCBOT19FTlRSWV9QT0lOVCA9ICduby1lbnRyeS1wb2ludCc7XG5cbi8qKlxuICogVGhlIHBhdGggaGFzIGEgcGFja2FnZS5qc29uLCBidXQgaXQgaXMgbm90IGEgdmFsaWQgZW50cnktcG9pbnQgZm9yIG5nY2MgcHJvY2Vzc2luZy5cbiAqL1xuZXhwb3J0IGNvbnN0IElOVkFMSURfRU5UUllfUE9JTlQgPSAnaW52YWxpZC1lbnRyeS1wb2ludCc7XG5cbi8qKlxuICogVGhlIHJlc3VsdCBvZiBjYWxsaW5nIGBnZXRFbnRyeVBvaW50SW5mbygpYC5cbiAqXG4gKiBUaGlzIHdpbGwgYmUgYW4gYEVudHJ5UG9pbnRgIG9iamVjdCBpZiBhbiBBbmd1bGFyIGVudHJ5LXBvaW50IHdhcyBpZGVudGlmaWVkO1xuICogT3RoZXJ3aXNlIGl0IHdpbGwgYmUgYSBmbGFnIGluZGljYXRpbmcgb25lIG9mOlxuICogKiBOT19FTlRSWV9QT0lOVCAtIHRoZSBwYXRoIGlzIG5vdCBhbiBlbnRyeS1wb2ludCBvciBuZ2NjIGlzIGNvbmZpZ3VyZWQgdG8gaWdub3JlIGl0XG4gKiAqIElOVkFMSURfRU5UUllfUE9JTlQgLSB0aGUgcGF0aCB3YXMgYSBub24tcHJvY2Vzc2FibGUgZW50cnktcG9pbnQgdGhhdCBzaG91bGQgYmUgc2VhcmNoZWRcbiAqIGZvciBzdWItZW50cnktcG9pbnRzXG4gKi9cbmV4cG9ydCB0eXBlIEdldEVudHJ5UG9pbnRSZXN1bHQgPSBFbnRyeVBvaW50IHwgdHlwZW9mIElOVkFMSURfRU5UUllfUE9JTlQgfCB0eXBlb2YgTk9fRU5UUllfUE9JTlQ7XG5cblxuLyoqXG4gKiBUcnkgdG8gY3JlYXRlIGFuIGVudHJ5LXBvaW50IGZyb20gdGhlIGdpdmVuIHBhdGhzIGFuZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSBwYWNrYWdlUGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgY29udGFpbmluZyBucG0gcGFja2FnZVxuICogQHBhcmFtIGVudHJ5UG9pbnRQYXRoIHRoZSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBwb3RlbnRpYWwgZW50cnktcG9pbnQuXG4gKiBAcmV0dXJuc1xuICogLSBBbiBlbnRyeS1wb2ludCBpZiBpdCBpcyB2YWxpZC5cbiAqIC0gYHVuZGVmaW5lZGAgd2hlbiB0aGVyZSBpcyBubyBwYWNrYWdlLmpzb24gYXQgdGhlIHBhdGggYW5kIHRoZXJlIGlzIG5vIGNvbmZpZyB0byBmb3JjZSBhblxuICogZW50cnktcG9pbnQgb3IgdGhlIGVudHJ5cG9pbnQgaXMgYGlnbm9yZWRgLlxuICogLSBgbnVsbGAgdGhlcmUgaXMgYSBwYWNrYWdlLmpzb24gYnV0IGl0IGlzIG5vdCBhIHZhbGlkIEFuZ3VsYXIgY29tcGlsZWQgZW50cnktcG9pbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRyeVBvaW50SW5mbyhcbiAgICBmczogRmlsZVN5c3RlbSwgY29uZmlnOiBOZ2NjQ29uZmlndXJhdGlvbiwgbG9nZ2VyOiBMb2dnZXIsIHBhY2thZ2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCxcbiAgICBlbnRyeVBvaW50UGF0aDogQWJzb2x1dGVGc1BhdGgpOiBHZXRFbnRyeVBvaW50UmVzdWx0IHtcbiAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gcmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgJ3BhY2thZ2UuanNvbicpO1xuICBjb25zdCBwYWNrYWdlVmVyc2lvbiA9IGdldFBhY2thZ2VWZXJzaW9uKGZzLCBwYWNrYWdlSnNvblBhdGgpO1xuICBjb25zdCBlbnRyeVBvaW50Q29uZmlnID1cbiAgICAgIGNvbmZpZy5nZXRDb25maWcocGFja2FnZVBhdGgsIHBhY2thZ2VWZXJzaW9uKS5lbnRyeVBvaW50c1tlbnRyeVBvaW50UGF0aF07XG4gIGNvbnN0IGhhc0NvbmZpZyA9IGVudHJ5UG9pbnRDb25maWcgIT09IHVuZGVmaW5lZDtcblxuICBpZiAoIWhhc0NvbmZpZyAmJiAhZnMuZXhpc3RzKHBhY2thZ2VKc29uUGF0aCkpIHtcbiAgICAvLyBObyBwYWNrYWdlLmpzb24gYW5kIG5vIGNvbmZpZ1xuICAgIHJldHVybiBOT19FTlRSWV9QT0lOVDtcbiAgfVxuXG4gIGlmIChoYXNDb25maWcgJiYgZW50cnlQb2ludENvbmZpZy5pZ25vcmUgPT09IHRydWUpIHtcbiAgICAvLyBFeHBsaWNpdGx5IGlnbm9yZWRcbiAgICByZXR1cm4gTk9fRU5UUllfUE9JTlQ7XG4gIH1cblxuICBjb25zdCBsb2FkZWRFbnRyeVBvaW50UGFja2FnZUpzb24gPSBsb2FkRW50cnlQb2ludFBhY2thZ2UoZnMsIGxvZ2dlciwgcGFja2FnZUpzb25QYXRoLCBoYXNDb25maWcpO1xuICBjb25zdCBlbnRyeVBvaW50UGFja2FnZUpzb24gPSBoYXNDb25maWcgP1xuICAgICAgbWVyZ2VDb25maWdBbmRQYWNrYWdlSnNvbihcbiAgICAgICAgICBsb2FkZWRFbnRyeVBvaW50UGFja2FnZUpzb24sIGVudHJ5UG9pbnRDb25maWcsIHBhY2thZ2VQYXRoLCBlbnRyeVBvaW50UGF0aCkgOlxuICAgICAgbG9hZGVkRW50cnlQb2ludFBhY2thZ2VKc29uO1xuXG4gIGlmIChlbnRyeVBvaW50UGFja2FnZUpzb24gPT09IG51bGwpIHtcbiAgICAvLyBwYWNrYWdlLmpzb24gZXhpc3RzIGJ1dCBjb3VsZCBub3QgYmUgcGFyc2VkIGFuZCB0aGVyZSB3YXMgbm8gcmVkZWVtaW5nIGNvbmZpZ1xuICAgIHJldHVybiBJTlZBTElEX0VOVFJZX1BPSU5UO1xuICB9XG5cbiAgY29uc3QgdHlwaW5ncyA9IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi50eXBpbmdzIHx8IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi50eXBlcyB8fFxuICAgICAgZ3Vlc3NUeXBpbmdzRnJvbVBhY2thZ2VKc29uKGZzLCBlbnRyeVBvaW50UGF0aCwgZW50cnlQb2ludFBhY2thZ2VKc29uKTtcbiAgaWYgKHR5cGVvZiB0eXBpbmdzICE9PSAnc3RyaW5nJykge1xuICAgIC8vIE1pc3NpbmcgdGhlIHJlcXVpcmVkIGB0eXBpbmdzYCBwcm9wZXJ0eVxuICAgIHJldHVybiBJTlZBTElEX0VOVFJZX1BPSU5UO1xuICB9XG5cbiAgLy8gQW4gZW50cnktcG9pbnQgaXMgYXNzdW1lZCB0byBiZSBjb21waWxlZCBieSBBbmd1bGFyIGlmIHRoZXJlIGlzIGVpdGhlcjpcbiAgLy8gKiBhIGBtZXRhZGF0YS5qc29uYCBmaWxlIG5leHQgdG8gdGhlIHR5cGluZ3MgZW50cnktcG9pbnRcbiAgLy8gKiBhIGN1c3RvbSBjb25maWcgZm9yIHRoaXMgZW50cnktcG9pbnRcbiAgY29uc3QgbWV0YWRhdGFQYXRoID0gcmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgdHlwaW5ncy5yZXBsYWNlKC9cXC5kXFwudHMkLywgJycpICsgJy5tZXRhZGF0YS5qc29uJyk7XG4gIGNvbnN0IGNvbXBpbGVkQnlBbmd1bGFyID0gZW50cnlQb2ludENvbmZpZyAhPT0gdW5kZWZpbmVkIHx8IGZzLmV4aXN0cyhtZXRhZGF0YVBhdGgpO1xuXG4gIGNvbnN0IGVudHJ5UG9pbnRJbmZvOiBFbnRyeVBvaW50ID0ge1xuICAgIG5hbWU6IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi5uYW1lLFxuICAgIHBhY2thZ2VKc29uOiBlbnRyeVBvaW50UGFja2FnZUpzb24sXG4gICAgcGFja2FnZTogcGFja2FnZVBhdGgsXG4gICAgcGF0aDogZW50cnlQb2ludFBhdGgsXG4gICAgdHlwaW5nczogcmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgdHlwaW5ncyksIGNvbXBpbGVkQnlBbmd1bGFyLFxuICAgIGlnbm9yZU1pc3NpbmdEZXBlbmRlbmNpZXM6XG4gICAgICAgIGVudHJ5UG9pbnRDb25maWcgIT09IHVuZGVmaW5lZCA/ICEhZW50cnlQb2ludENvbmZpZy5pZ25vcmVNaXNzaW5nRGVwZW5kZW5jaWVzIDogZmFsc2UsXG4gICAgZ2VuZXJhdGVEZWVwUmVleHBvcnRzOlxuICAgICAgICBlbnRyeVBvaW50Q29uZmlnICE9PSB1bmRlZmluZWQgPyAhIWVudHJ5UG9pbnRDb25maWcuZ2VuZXJhdGVEZWVwUmVleHBvcnRzIDogZmFsc2UsXG4gIH07XG5cbiAgcmV0dXJuIGVudHJ5UG9pbnRJbmZvO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBwYWNrYWdlLmpzb24gcHJvcGVydHkgaW50byBhbiBlbnRyeS1wb2ludCBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHByb3BlcnR5IFRoZSBwcm9wZXJ0eSB0byBjb252ZXJ0IHRvIGEgZm9ybWF0LlxuICogQHJldHVybnMgQW4gZW50cnktcG9pbnQgZm9ybWF0IG9yIGB1bmRlZmluZWRgIGlmIG5vbmUgbWF0Y2ggdGhlIGdpdmVuIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlQb2ludEZvcm1hdChcbiAgICBmczogRmlsZVN5c3RlbSwgZW50cnlQb2ludDogRW50cnlQb2ludCwgcHJvcGVydHk6IEVudHJ5UG9pbnRKc29uUHJvcGVydHkpOiBFbnRyeVBvaW50Rm9ybWF0fFxuICAgIHVuZGVmaW5lZCB7XG4gIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICBjYXNlICdmZXNtMjAxNSc6XG4gICAgICByZXR1cm4gJ2VzbTIwMTUnO1xuICAgIGNhc2UgJ2Zlc201JzpcbiAgICAgIHJldHVybiAnZXNtNSc7XG4gICAgY2FzZSAnZXMyMDE1JzpcbiAgICAgIHJldHVybiAnZXNtMjAxNSc7XG4gICAgY2FzZSAnZXNtMjAxNSc6XG4gICAgICByZXR1cm4gJ2VzbTIwMTUnO1xuICAgIGNhc2UgJ2VzbTUnOlxuICAgICAgcmV0dXJuICdlc201JztcbiAgICBjYXNlICdtYWluJzpcbiAgICAgIGNvbnN0IG1haW5GaWxlID0gZW50cnlQb2ludC5wYWNrYWdlSnNvblsnbWFpbiddO1xuICAgICAgaWYgKG1haW5GaWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhdGhUb01haW4gPSBqb2luKGVudHJ5UG9pbnQucGF0aCwgbWFpbkZpbGUpO1xuICAgICAgcmV0dXJuIGlzVW1kTW9kdWxlKGZzLCBwYXRoVG9NYWluKSA/ICd1bWQnIDogJ2NvbW1vbmpzJztcbiAgICBjYXNlICdtb2R1bGUnOlxuICAgICAgcmV0dXJuICdlc201JztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgSlNPTiBmcm9tIGEgcGFja2FnZS5qc29uIGZpbGUuXG4gKiBAcGFyYW0gcGFja2FnZUpzb25QYXRoIHRoZSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBwYWNrYWdlLmpzb24gZmlsZS5cbiAqIEByZXR1cm5zIEpTT04gZnJvbSB0aGUgcGFja2FnZS5qc29uIGZpbGUgaWYgaXQgaXMgdmFsaWQsIGBudWxsYCBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGxvYWRFbnRyeVBvaW50UGFja2FnZShcbiAgICBmczogRmlsZVN5c3RlbSwgbG9nZ2VyOiBMb2dnZXIsIHBhY2thZ2VKc29uUGF0aDogQWJzb2x1dGVGc1BhdGgsXG4gICAgaGFzQ29uZmlnOiBib29sZWFuKTogRW50cnlQb2ludFBhY2thZ2VKc29ufG51bGwge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlKHBhY2thZ2VKc29uUGF0aCkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKCFoYXNDb25maWcpIHtcbiAgICAgIC8vIFdlIG1heSBoYXZlIHJ1biBpbnRvIGEgcGFja2FnZS5qc29uIHdpdGggdW5leHBlY3RlZCBzeW1ib2xzXG4gICAgICBsb2dnZXIud2FybihgRmFpbGVkIHRvIHJlYWQgZW50cnkgcG9pbnQgaW5mbyBmcm9tICR7cGFja2FnZUpzb25QYXRofSB3aXRoIGVycm9yICR7ZX0uYCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzVW1kTW9kdWxlKGZzOiBGaWxlU3lzdGVtLCBzb3VyY2VGaWxlUGF0aDogQWJzb2x1dGVGc1BhdGgpOiBib29sZWFuIHtcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZUZpbGVXaXRoUG9zdGZpeGVzKGZzLCBzb3VyY2VGaWxlUGF0aCwgWycnLCAnLmpzJywgJy9pbmRleC5qcyddKTtcbiAgaWYgKHJlc29sdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBzb3VyY2VGaWxlID1cbiAgICAgIHRzLmNyZWF0ZVNvdXJjZUZpbGUoc291cmNlRmlsZVBhdGgsIGZzLnJlYWRGaWxlKHJlc29sdmVkUGF0aCksIHRzLlNjcmlwdFRhcmdldC5FUzUpO1xuICByZXR1cm4gc291cmNlRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aCA+IDAgJiZcbiAgICAgIHBhcnNlU3RhdGVtZW50Rm9yVW1kTW9kdWxlKHNvdXJjZUZpbGUuc3RhdGVtZW50c1swXSkgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIG1lcmdlQ29uZmlnQW5kUGFja2FnZUpzb24oXG4gICAgZW50cnlQb2ludFBhY2thZ2VKc29uOiBFbnRyeVBvaW50UGFja2FnZUpzb24gfCBudWxsLCBlbnRyeVBvaW50Q29uZmlnOiBOZ2NjRW50cnlQb2ludENvbmZpZyxcbiAgICBwYWNrYWdlUGF0aDogQWJzb2x1dGVGc1BhdGgsIGVudHJ5UG9pbnRQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IEVudHJ5UG9pbnRQYWNrYWdlSnNvbiB7XG4gIGlmIChlbnRyeVBvaW50UGFja2FnZUpzb24gIT09IG51bGwpIHtcbiAgICByZXR1cm4gey4uLmVudHJ5UG9pbnRQYWNrYWdlSnNvbiwgLi4uZW50cnlQb2ludENvbmZpZy5vdmVycmlkZX07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmFtZSA9IGAke2Jhc2VuYW1lKHBhY2thZ2VQYXRoKX0vJHtyZWxhdGl2ZShwYWNrYWdlUGF0aCwgZW50cnlQb2ludFBhdGgpfWA7XG4gICAgcmV0dXJuIHtuYW1lLCAuLi5lbnRyeVBvaW50Q29uZmlnLm92ZXJyaWRlfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBndWVzc1R5cGluZ3NGcm9tUGFja2FnZUpzb24oXG4gICAgZnM6IEZpbGVTeXN0ZW0sIGVudHJ5UG9pbnRQYXRoOiBBYnNvbHV0ZUZzUGF0aCxcbiAgICBlbnRyeVBvaW50UGFja2FnZUpzb246IEVudHJ5UG9pbnRQYWNrYWdlSnNvbik6IEFic29sdXRlRnNQYXRofG51bGwge1xuICBmb3IgKGNvbnN0IHByb3Agb2YgU1VQUE9SVEVEX0ZPUk1BVF9QUk9QRVJUSUVTKSB7XG4gICAgY29uc3QgZmllbGQgPSBlbnRyeVBvaW50UGFja2FnZUpzb25bcHJvcF07XG4gICAgaWYgKHR5cGVvZiBmaWVsZCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFNvbWUgY3JhenkgcGFja2FnZXMgaGF2ZSB0aGluZ3MgbGlrZSBhcnJheXMgaW4gdGhlc2UgZmllbGRzIVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHJlbGF0aXZlVHlwaW5nc1BhdGggPSBmaWVsZC5yZXBsYWNlKC9cXC5qcyQvLCAnLmQudHMnKTtcbiAgICBjb25zdCB0eXBpbmdzUGF0aCA9IHJlc29sdmUoZW50cnlQb2ludFBhdGgsIHJlbGF0aXZlVHlwaW5nc1BhdGgpO1xuICAgIGlmIChmcy5leGlzdHModHlwaW5nc1BhdGgpKSB7XG4gICAgICByZXR1cm4gdHlwaW5nc1BhdGg7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEZpbmQgdGhlIHZlcnNpb24gb2YgdGhlIHBhY2thZ2UgYXQgYHBhY2thZ2VKc29uUGF0aGAuXG4gKlxuICogQHJldHVybnMgdGhlIHZlcnNpb24gc3RyaW5nIG9yIGBudWxsYCBpZiB0aGUgcGFja2FnZS5qc29uIGRvZXMgbm90IGV4aXN0IG9yIGlzIGludmFsaWQuXG4gKi9cbmZ1bmN0aW9uIGdldFBhY2thZ2VWZXJzaW9uKGZzOiBGaWxlU3lzdGVtLCBwYWNrYWdlSnNvblBhdGg6IEFic29sdXRlRnNQYXRoKTogc3RyaW5nfG51bGwge1xuICB0cnkge1xuICAgIGlmIChmcy5leGlzdHMocGFja2FnZUpzb25QYXRoKSkge1xuICAgICAgY29uc3QgcGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlKHBhY2thZ2VKc29uUGF0aCkpO1xuICAgICAgcmV0dXJuIHBhY2thZ2VKc29uWyd2ZXJzaW9uJ10gfHwgbnVsbDtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiJdfQ==