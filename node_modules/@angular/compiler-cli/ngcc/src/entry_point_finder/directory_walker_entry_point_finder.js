(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/entry_point_finder/directory_walker_entry_point_finder", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system", "@angular/compiler-cli/ngcc/src/packages/entry_point", "@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer", "@angular/compiler-cli/ngcc/src/entry_point_finder/utils"], factory);
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
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    var entry_point_1 = require("@angular/compiler-cli/ngcc/src/packages/entry_point");
    var new_entry_point_file_writer_1 = require("@angular/compiler-cli/ngcc/src/writing/new_entry_point_file_writer");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/entry_point_finder/utils");
    /**
     * An EntryPointFinder that searches for all entry-points that can be found given a `basePath` and
     * `pathMappings`.
     */
    var DirectoryWalkerEntryPointFinder = /** @class */ (function () {
        function DirectoryWalkerEntryPointFinder(fs, config, logger, resolver, sourceDirectory, pathMappings) {
            this.fs = fs;
            this.config = config;
            this.logger = logger;
            this.resolver = resolver;
            this.sourceDirectory = sourceDirectory;
            this.pathMappings = pathMappings;
            this.basePaths = utils_1.getBasePaths(this.sourceDirectory, this.pathMappings);
        }
        /**
         * Search the `sourceDirectory`, and sub-directories, using `pathMappings` as necessary, to find
         * all package entry-points.
         */
        DirectoryWalkerEntryPointFinder.prototype.findEntryPoints = function () {
            var _this = this;
            var unsortedEntryPoints = this.basePaths.reduce(function (entryPoints, basePath) { return entryPoints.concat(_this.walkDirectoryForEntryPoints(basePath)); }, []);
            return this.resolver.sortEntryPointsByDependency(unsortedEntryPoints);
        };
        /**
         * Look for entry points that need to be compiled, starting at the source directory.
         * The function will recurse into directories that start with `@...`, e.g. `@angular/...`.
         * @param sourceDirectory An absolute path to the root directory where searching begins.
         */
        DirectoryWalkerEntryPointFinder.prototype.walkDirectoryForEntryPoints = function (sourceDirectory) {
            var _this = this;
            var entryPoints = this.getEntryPointsForPackage(sourceDirectory);
            if (entryPoints === null) {
                return [];
            }
            if (entryPoints.length > 0) {
                // The `sourceDirectory` is an entry point itself so no need to search its sub-directories.
                // Also check for any nested node_modules in this package but only if it was compiled by
                // Angular.
                // It is unlikely that a non Angular entry point has a dependency on an Angular library.
                if (entryPoints.some(function (e) { return e.compiledByAngular; })) {
                    var nestedNodeModulesPath = this.fs.join(sourceDirectory, 'node_modules');
                    if (this.fs.exists(nestedNodeModulesPath)) {
                        entryPoints.push.apply(entryPoints, tslib_1.__spread(this.walkDirectoryForEntryPoints(nestedNodeModulesPath)));
                    }
                }
                return entryPoints;
            }
            this.fs
                .readdir(sourceDirectory)
                // Not interested in hidden files
                .filter(function (p) { return !p.startsWith('.'); })
                // Ignore node_modules
                .filter(function (p) { return p !== 'node_modules' && p !== new_entry_point_file_writer_1.NGCC_DIRECTORY; })
                // Only interested in directories (and only those that are not symlinks)
                .filter(function (p) {
                var stat = _this.fs.lstat(file_system_1.resolve(sourceDirectory, p));
                return stat.isDirectory() && !stat.isSymbolicLink();
            })
                .forEach(function (p) {
                // Package is a potential namespace containing packages (e.g `@angular`).
                var packagePath = file_system_1.join(sourceDirectory, p);
                entryPoints.push.apply(entryPoints, tslib_1.__spread(_this.walkDirectoryForEntryPoints(packagePath)));
            });
            return entryPoints;
        };
        /**
         * Recurse the folder structure looking for all the entry points
         * @param packagePath The absolute path to an npm package that may contain entry points
         * @returns An array of entry points that were discovered or null when it's not a valid entrypoint
         */
        DirectoryWalkerEntryPointFinder.prototype.getEntryPointsForPackage = function (packagePath) {
            var _this = this;
            var entryPoints = [];
            // Try to get an entry point from the top level package directory
            var topLevelEntryPoint = entry_point_1.getEntryPointInfo(this.fs, this.config, this.logger, packagePath, packagePath);
            // If there is no primary entry-point then exit
            if (topLevelEntryPoint === entry_point_1.NO_ENTRY_POINT) {
                return [];
            }
            if (topLevelEntryPoint === entry_point_1.INVALID_ENTRY_POINT) {
                return null;
            }
            // Otherwise store it and search for secondary entry-points
            entryPoints.push(topLevelEntryPoint);
            this.walkDirectory(packagePath, packagePath, function (path, isDirectory) {
                if (!path.endsWith('.js') && !isDirectory) {
                    return false;
                }
                // If the path is a JS file then strip its extension and see if we can match an entry-point.
                var possibleEntryPointPath = isDirectory ? path : stripJsExtension(path);
                var subEntryPoint = entry_point_1.getEntryPointInfo(_this.fs, _this.config, _this.logger, packagePath, possibleEntryPointPath);
                if (subEntryPoint === entry_point_1.NO_ENTRY_POINT || subEntryPoint === entry_point_1.INVALID_ENTRY_POINT) {
                    return false;
                }
                entryPoints.push(subEntryPoint);
                return true;
            });
            return entryPoints;
        };
        /**
         * Recursively walk a directory and its sub-directories, applying a given
         * function to each directory.
         * @param dir the directory to recursively walk.
         * @param fn the function to apply to each directory.
         */
        DirectoryWalkerEntryPointFinder.prototype.walkDirectory = function (packagePath, dir, fn) {
            var _this = this;
            return this.fs
                .readdir(dir)
                // Not interested in hidden files
                .filter(function (path) { return !path.startsWith('.'); })
                // Ignore node_modules
                .filter(function (path) { return path !== 'node_modules' && path !== new_entry_point_file_writer_1.NGCC_DIRECTORY; })
                .forEach(function (path) {
                var absolutePath = file_system_1.resolve(dir, path);
                var stat = _this.fs.lstat(absolutePath);
                if (stat.isSymbolicLink()) {
                    // We are not interested in symbolic links
                    return;
                }
                var containsEntryPoint = fn(absolutePath, stat.isDirectory());
                if (containsEntryPoint) {
                    _this.walkDirectory(packagePath, absolutePath, fn);
                }
            });
        };
        return DirectoryWalkerEntryPointFinder;
    }());
    exports.DirectoryWalkerEntryPointFinder = DirectoryWalkerEntryPointFinder;
    function stripJsExtension(filePath) {
        return filePath.replace(/\.js$/, '');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5X3dhbGtlcl9lbnRyeV9wb2ludF9maW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvZW50cnlfcG9pbnRfZmluZGVyL2RpcmVjdG9yeV93YWxrZXJfZW50cnlfcG9pbnRfZmluZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILDJFQUF5RjtJQUl6RixtRkFBMkc7SUFFM0csa0hBQXNFO0lBRXRFLGlGQUFxQztJQUVyQzs7O09BR0c7SUFDSDtRQUVFLHlDQUNZLEVBQWMsRUFBVSxNQUF5QixFQUFVLE1BQWMsRUFDekUsUUFBNEIsRUFBVSxlQUErQixFQUNyRSxZQUFvQztZQUZwQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ3pFLGFBQVEsR0FBUixRQUFRLENBQW9CO1lBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1lBQ3JFLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtZQUp4QyxjQUFTLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUl2QixDQUFDO1FBQ3BEOzs7V0FHRztRQUNILHlEQUFlLEdBQWY7WUFBQSxpQkFLQztZQUpDLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzdDLFVBQUMsV0FBVyxFQUFFLFFBQVEsSUFBSyxPQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQTlELENBQThELEVBQ3pGLEVBQUUsQ0FBQyxDQUFDO1lBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLG1CQUFtQixD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R0FBRyxxQkFBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRXpDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO29CQUN6QiwwQ0FBMEM7b0JBQzFDLE9BQU87aUJBQ1I7Z0JBRUQsSUFBTSxrQkFBa0IsR0FBRyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLGtCQUFrQixFQUFFO29CQUN0QixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ25EO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDO1FBQ0gsc0NBQUM7SUFBRCxDQUFDLEFBdElELElBc0lDO0lBdElZLDBFQUErQjtJQXdJNUMsU0FBUyxnQkFBZ0IsQ0FBbUIsUUFBVztRQUNyRCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBTSxDQUFDO0lBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0Fic29sdXRlRnNQYXRoLCBGaWxlU3lzdGVtLCBqb2luLCByZXNvbHZlfSBmcm9tICcuLi8uLi8uLi9zcmMvbmd0c2MvZmlsZV9zeXN0ZW0nO1xuaW1wb3J0IHtEZXBlbmRlbmN5UmVzb2x2ZXIsIFNvcnRlZEVudHJ5UG9pbnRzSW5mb30gZnJvbSAnLi4vZGVwZW5kZW5jaWVzL2RlcGVuZGVuY3lfcmVzb2x2ZXInO1xuaW1wb3J0IHtMb2dnZXJ9IGZyb20gJy4uL2xvZ2dpbmcvbG9nZ2VyJztcbmltcG9ydCB7TmdjY0NvbmZpZ3VyYXRpb259IGZyb20gJy4uL3BhY2thZ2VzL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtFbnRyeVBvaW50LCBJTlZBTElEX0VOVFJZX1BPSU5ULCBOT19FTlRSWV9QT0lOVCwgZ2V0RW50cnlQb2ludEluZm99IGZyb20gJy4uL3BhY2thZ2VzL2VudHJ5X3BvaW50JztcbmltcG9ydCB7UGF0aE1hcHBpbmdzfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQge05HQ0NfRElSRUNUT1JZfSBmcm9tICcuLi93cml0aW5nL25ld19lbnRyeV9wb2ludF9maWxlX3dyaXRlcic7XG5pbXBvcnQge0VudHJ5UG9pbnRGaW5kZXJ9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7Z2V0QmFzZVBhdGhzfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBBbiBFbnRyeVBvaW50RmluZGVyIHRoYXQgc2VhcmNoZXMgZm9yIGFsbCBlbnRyeS1wb2ludHMgdGhhdCBjYW4gYmUgZm91bmQgZ2l2ZW4gYSBgYmFzZVBhdGhgIGFuZFxuICogYHBhdGhNYXBwaW5nc2AuXG4gKi9cbmV4cG9ydCBjbGFzcyBEaXJlY3RvcnlXYWxrZXJFbnRyeVBvaW50RmluZGVyIGltcGxlbWVudHMgRW50cnlQb2ludEZpbmRlciB7XG4gIHByaXZhdGUgYmFzZVBhdGhzID0gZ2V0QmFzZVBhdGhzKHRoaXMuc291cmNlRGlyZWN0b3J5LCB0aGlzLnBhdGhNYXBwaW5ncyk7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBmczogRmlsZVN5c3RlbSwgcHJpdmF0ZSBjb25maWc6IE5nY2NDb25maWd1cmF0aW9uLCBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyLFxuICAgICAgcHJpdmF0ZSByZXNvbHZlcjogRGVwZW5kZW5jeVJlc29sdmVyLCBwcml2YXRlIHNvdXJjZURpcmVjdG9yeTogQWJzb2x1dGVGc1BhdGgsXG4gICAgICBwcml2YXRlIHBhdGhNYXBwaW5nczogUGF0aE1hcHBpbmdzfHVuZGVmaW5lZCkge31cbiAgLyoqXG4gICAqIFNlYXJjaCB0aGUgYHNvdXJjZURpcmVjdG9yeWAsIGFuZCBzdWItZGlyZWN0b3JpZXMsIHVzaW5nIGBwYXRoTWFwcGluZ3NgIGFzIG5lY2Vzc2FyeSwgdG8gZmluZFxuICAgKiBhbGwgcGFja2FnZSBlbnRyeS1wb2ludHMuXG4gICAqL1xuICBmaW5kRW50cnlQb2ludHMoKTogU29ydGVkRW50cnlQb2ludHNJbmZvIHtcbiAgICBjb25zdCB1bnNvcnRlZEVudHJ5UG9pbnRzID0gdGhpcy5iYXNlUGF0aHMucmVkdWNlPEVudHJ5UG9pbnRbXT4oXG4gICAgICAgIChlbnRyeVBvaW50cywgYmFzZVBhdGgpID0+IGVudHJ5UG9pbnRzLmNvbmNhdCh0aGlzLndhbGtEaXJlY3RvcnlGb3JFbnRyeVBvaW50cyhiYXNlUGF0aCkpLFxuICAgICAgICBbXSk7XG4gICAgcmV0dXJuIHRoaXMucmVzb2x2ZXIuc29ydEVudHJ5UG9pbnRzQnlEZXBlbmRlbmN5KHVuc29ydGVkRW50cnlQb2ludHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2sgZm9yIGVudHJ5IHBvaW50cyB0aGF0IG5lZWQgdG8gYmUgY29tcGlsZWQsIHN0YXJ0aW5nIGF0IHRoZSBzb3VyY2UgZGlyZWN0b3J5LlxuICAgKiBUaGUgZnVuY3Rpb24gd2lsbCByZWN1cnNlIGludG8gZGlyZWN0b3JpZXMgdGhhdCBzdGFydCB3aXRoIGBALi4uYCwgZS5nLiBgQGFuZ3VsYXIvLi4uYC5cbiAgICogQHBhcmFtIHNvdXJjZURpcmVjdG9yeSBBbiBhYnNvbHV0ZSBwYXRoIHRvIHRoZSByb290IGRpcmVjdG9yeSB3aGVyZSBzZWFyY2hpbmcgYmVnaW5zLlxuICAgKi9cbiAgd2Fsa0RpcmVjdG9yeUZvckVudHJ5UG9pbnRzKHNvdXJjZURpcmVjdG9yeTogQWJzb2x1dGVGc1BhdGgpOiBFbnRyeVBvaW50W10ge1xuICAgIGNvbnN0IGVudHJ5UG9pbnRzID0gdGhpcy5nZXRFbnRyeVBvaW50c0ZvclBhY2thZ2Uoc291cmNlRGlyZWN0b3J5KTtcbiAgICBpZiAoZW50cnlQb2ludHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnlQb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gVGhlIGBzb3VyY2VEaXJlY3RvcnlgIGlzIGFuIGVudHJ5IHBvaW50IGl0c2VsZiBzbyBubyBuZWVkIHRvIHNlYXJjaCBpdHMgc3ViLWRpcmVjdG9yaWVzLlxuICAgICAgLy8gQWxzbyBjaGVjayBmb3IgYW55IG5lc3RlZCBub2RlX21vZHVsZXMgaW4gdGhpcyBwYWNrYWdlIGJ1dCBvbmx5IGlmIGl0IHdhcyBjb21waWxlZCBieVxuICAgICAgLy8gQW5ndWxhci5cbiAgICAgIC8vIEl0IGlzIHVubGlrZWx5IHRoYXQgYSBub24gQW5ndWxhciBlbnRyeSBwb2ludCBoYXMgYSBkZXBlbmRlbmN5IG9uIGFuIEFuZ3VsYXIgbGlicmFyeS5cbiAgICAgIGlmIChlbnRyeVBvaW50cy5zb21lKGUgPT4gZS5jb21waWxlZEJ5QW5ndWxhcikpIHtcbiAgICAgICAgY29uc3QgbmVzdGVkTm9kZU1vZHVsZXNQYXRoID0gdGhpcy5mcy5qb2luKHNvdXJjZURpcmVjdG9yeSwgJ25vZGVfbW9kdWxlcycpO1xuICAgICAgICBpZiAodGhpcy5mcy5leGlzdHMobmVzdGVkTm9kZU1vZHVsZXNQYXRoKSkge1xuICAgICAgICAgIGVudHJ5UG9pbnRzLnB1c2goLi4udGhpcy53YWxrRGlyZWN0b3J5Rm9yRW50cnlQb2ludHMobmVzdGVkTm9kZU1vZHVsZXNQYXRoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVudHJ5UG9pbnRzO1xuICAgIH1cblxuICAgIHRoaXMuZnNcbiAgICAgICAgLnJlYWRkaXIoc291cmNlRGlyZWN0b3J5KVxuICAgICAgICAvLyBOb3QgaW50ZXJlc3RlZCBpbiBoaWRkZW4gZmlsZXNcbiAgICAgICAgLmZpbHRlcihwID0+ICFwLnN0YXJ0c1dpdGgoJy4nKSlcbiAgICAgICAgLy8gSWdub3JlIG5vZGVfbW9kdWxlc1xuICAgICAgICAuZmlsdGVyKHAgPT4gcCAhPT0gJ25vZGVfbW9kdWxlcycgJiYgcCAhPT0gTkdDQ19ESVJFQ1RPUlkpXG4gICAgICAgIC8vIE9ubHkgaW50ZXJlc3RlZCBpbiBkaXJlY3RvcmllcyAoYW5kIG9ubHkgdGhvc2UgdGhhdCBhcmUgbm90IHN5bWxpbmtzKVxuICAgICAgICAuZmlsdGVyKHAgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0YXQgPSB0aGlzLmZzLmxzdGF0KHJlc29sdmUoc291cmNlRGlyZWN0b3J5LCBwKSk7XG4gICAgICAgICAgcmV0dXJuIHN0YXQuaXNEaXJlY3RvcnkoKSAmJiAhc3RhdC5pc1N5bWJvbGljTGluaygpO1xuICAgICAgICB9KVxuICAgICAgICAuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAvLyBQYWNrYWdlIGlzIGEgcG90ZW50aWFsIG5hbWVzcGFjZSBjb250YWluaW5nIHBhY2thZ2VzIChlLmcgYEBhbmd1bGFyYCkuXG4gICAgICAgICAgY29uc3QgcGFja2FnZVBhdGggPSBqb2luKHNvdXJjZURpcmVjdG9yeSwgcCk7XG4gICAgICAgICAgZW50cnlQb2ludHMucHVzaCguLi50aGlzLndhbGtEaXJlY3RvcnlGb3JFbnRyeVBvaW50cyhwYWNrYWdlUGF0aCkpO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gZW50cnlQb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzZSB0aGUgZm9sZGVyIHN0cnVjdHVyZSBsb29raW5nIGZvciBhbGwgdGhlIGVudHJ5IHBvaW50c1xuICAgKiBAcGFyYW0gcGFja2FnZVBhdGggVGhlIGFic29sdXRlIHBhdGggdG8gYW4gbnBtIHBhY2thZ2UgdGhhdCBtYXkgY29udGFpbiBlbnRyeSBwb2ludHNcbiAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgZW50cnkgcG9pbnRzIHRoYXQgd2VyZSBkaXNjb3ZlcmVkIG9yIG51bGwgd2hlbiBpdCdzIG5vdCBhIHZhbGlkIGVudHJ5cG9pbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0RW50cnlQb2ludHNGb3JQYWNrYWdlKHBhY2thZ2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IEVudHJ5UG9pbnRbXXxudWxsIHtcbiAgICBjb25zdCBlbnRyeVBvaW50czogRW50cnlQb2ludFtdID0gW107XG5cbiAgICAvLyBUcnkgdG8gZ2V0IGFuIGVudHJ5IHBvaW50IGZyb20gdGhlIHRvcCBsZXZlbCBwYWNrYWdlIGRpcmVjdG9yeVxuICAgIGNvbnN0IHRvcExldmVsRW50cnlQb2ludCA9XG4gICAgICAgIGdldEVudHJ5UG9pbnRJbmZvKHRoaXMuZnMsIHRoaXMuY29uZmlnLCB0aGlzLmxvZ2dlciwgcGFja2FnZVBhdGgsIHBhY2thZ2VQYXRoKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIG5vIHByaW1hcnkgZW50cnktcG9pbnQgdGhlbiBleGl0XG4gICAgaWYgKHRvcExldmVsRW50cnlQb2ludCA9PT0gTk9fRU5UUllfUE9JTlQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAodG9wTGV2ZWxFbnRyeVBvaW50ID09PSBJTlZBTElEX0VOVFJZX1BPSU5UKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2Ugc3RvcmUgaXQgYW5kIHNlYXJjaCBmb3Igc2Vjb25kYXJ5IGVudHJ5LXBvaW50c1xuICAgIGVudHJ5UG9pbnRzLnB1c2godG9wTGV2ZWxFbnRyeVBvaW50KTtcbiAgICB0aGlzLndhbGtEaXJlY3RvcnkocGFja2FnZVBhdGgsIHBhY2thZ2VQYXRoLCAocGF0aCwgaXNEaXJlY3RvcnkpID0+IHtcbiAgICAgIGlmICghcGF0aC5lbmRzV2l0aCgnLmpzJykgJiYgIWlzRGlyZWN0b3J5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIHBhdGggaXMgYSBKUyBmaWxlIHRoZW4gc3RyaXAgaXRzIGV4dGVuc2lvbiBhbmQgc2VlIGlmIHdlIGNhbiBtYXRjaCBhbiBlbnRyeS1wb2ludC5cbiAgICAgIGNvbnN0IHBvc3NpYmxlRW50cnlQb2ludFBhdGggPSBpc0RpcmVjdG9yeSA/IHBhdGggOiBzdHJpcEpzRXh0ZW5zaW9uKHBhdGgpO1xuICAgICAgY29uc3Qgc3ViRW50cnlQb2ludCA9XG4gICAgICAgICAgZ2V0RW50cnlQb2ludEluZm8odGhpcy5mcywgdGhpcy5jb25maWcsIHRoaXMubG9nZ2VyLCBwYWNrYWdlUGF0aCwgcG9zc2libGVFbnRyeVBvaW50UGF0aCk7XG4gICAgICBpZiAoc3ViRW50cnlQb2ludCA9PT0gTk9fRU5UUllfUE9JTlQgfHwgc3ViRW50cnlQb2ludCA9PT0gSU5WQUxJRF9FTlRSWV9QT0lOVCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbnRyeVBvaW50cy5wdXNoKHN1YkVudHJ5UG9pbnQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZW50cnlQb2ludHM7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgd2FsayBhIGRpcmVjdG9yeSBhbmQgaXRzIHN1Yi1kaXJlY3RvcmllcywgYXBwbHlpbmcgYSBnaXZlblxuICAgKiBmdW5jdGlvbiB0byBlYWNoIGRpcmVjdG9yeS5cbiAgICogQHBhcmFtIGRpciB0aGUgZGlyZWN0b3J5IHRvIHJlY3Vyc2l2ZWx5IHdhbGsuXG4gICAqIEBwYXJhbSBmbiB0aGUgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBkaXJlY3RvcnkuXG4gICAqL1xuICBwcml2YXRlIHdhbGtEaXJlY3RvcnkoXG4gICAgICBwYWNrYWdlUGF0aDogQWJzb2x1dGVGc1BhdGgsIGRpcjogQWJzb2x1dGVGc1BhdGgsXG4gICAgICBmbjogKHBhdGg6IEFic29sdXRlRnNQYXRoLCBpc0RpcmVjdG9yeTogYm9vbGVhbikgPT4gYm9vbGVhbikge1xuICAgIHJldHVybiB0aGlzLmZzXG4gICAgICAgIC5yZWFkZGlyKGRpcilcbiAgICAgICAgLy8gTm90IGludGVyZXN0ZWQgaW4gaGlkZGVuIGZpbGVzXG4gICAgICAgIC5maWx0ZXIocGF0aCA9PiAhcGF0aC5zdGFydHNXaXRoKCcuJykpXG4gICAgICAgIC8vIElnbm9yZSBub2RlX21vZHVsZXNcbiAgICAgICAgLmZpbHRlcihwYXRoID0+IHBhdGggIT09ICdub2RlX21vZHVsZXMnICYmIHBhdGggIT09IE5HQ0NfRElSRUNUT1JZKVxuICAgICAgICAuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBjb25zdCBhYnNvbHV0ZVBhdGggPSByZXNvbHZlKGRpciwgcGF0aCk7XG4gICAgICAgICAgY29uc3Qgc3RhdCA9IHRoaXMuZnMubHN0YXQoYWJzb2x1dGVQYXRoKTtcblxuICAgICAgICAgIGlmIChzdGF0LmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbiBzeW1ib2xpYyBsaW5rc1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNvbnRhaW5zRW50cnlQb2ludCA9IGZuKGFic29sdXRlUGF0aCwgc3RhdC5pc0RpcmVjdG9yeSgpKTtcbiAgICAgICAgICBpZiAoY29udGFpbnNFbnRyeVBvaW50KSB7XG4gICAgICAgICAgICB0aGlzLndhbGtEaXJlY3RvcnkocGFja2FnZVBhdGgsIGFic29sdXRlUGF0aCwgZm4pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaXBKc0V4dGVuc2lvbjxUIGV4dGVuZHMgc3RyaW5nPihmaWxlUGF0aDogVCk6IFQge1xuICByZXR1cm4gZmlsZVBhdGgucmVwbGFjZSgvXFwuanMkLywgJycpIGFzIFQ7XG59XG4iXX0=