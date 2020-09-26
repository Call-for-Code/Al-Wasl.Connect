(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/file_utils", ["require", "exports", "fs", "path"], factory);
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
    var fs = require("fs");
    var path = require("path");
    var FileUtils = /** @class */ (function () {
        function FileUtils() {
        }
        FileUtils.readFile = function (absolutePath) {
            return fs.readFileSync(absolutePath, 'utf8');
        };
        FileUtils.readFileBuffer = function (absolutePath) {
            return fs.readFileSync(absolutePath);
        };
        FileUtils.writeFile = function (absolutePath, contents) {
            FileUtils.ensureDir(path.dirname(absolutePath));
            fs.writeFileSync(absolutePath, contents);
        };
        FileUtils.ensureDir = function (absolutePath) {
            var parents = [];
            while (!FileUtils.isRoot(absolutePath) && !fs.existsSync(absolutePath)) {
                parents.push(absolutePath);
                absolutePath = path.dirname(absolutePath);
            }
            while (parents.length) {
                fs.mkdirSync(parents.pop());
            }
        };
        FileUtils.remove = function (p) {
            var stat = fs.statSync(p);
            if (stat.isFile()) {
                fs.unlinkSync(p);
            }
            else if (stat.isDirectory()) {
                fs.readdirSync(p).forEach(function (child) {
                    var absChild = path.resolve(p, child);
                    FileUtils.remove(absChild);
                });
                fs.rmdirSync(p);
            }
        };
        FileUtils.isRoot = function (absolutePath) {
            return path.dirname(absolutePath) === absolutePath;
        };
        return FileUtils;
    }());
    exports.FileUtils = FileUtils;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZV91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvZmlsZV91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILHVCQUF5QjtJQUN6QiwyQkFBNkI7SUFFN0I7UUFBQTtRQXlDQSxDQUFDO1FBeENRLGtCQUFRLEdBQWYsVUFBZ0IsWUFBb0I7WUFDbEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRU0sd0JBQWMsR0FBckIsVUFBc0IsWUFBb0I7WUFDeEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFTSxtQkFBUyxHQUFoQixVQUFpQixZQUFvQixFQUFFLFFBQXVCO1lBQzVELFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFTSxtQkFBUyxHQUFoQixVQUFpQixZQUFvQjtZQUNuQyxJQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzQixZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFHLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUM7UUFFTSxnQkFBTSxHQUFiLFVBQWMsQ0FBUztZQUNyQixJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNqQixFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xCO2lCQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM3QixFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7b0JBQzdCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDSCxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQztRQUVNLGdCQUFNLEdBQWIsVUFBYyxZQUFvQjtZQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssWUFBWSxDQUFDO1FBQ3JELENBQUM7UUFDSCxnQkFBQztJQUFELENBQUMsQUF6Q0QsSUF5Q0M7SUF6Q1ksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgRmlsZVV0aWxzIHtcbiAgc3RhdGljIHJlYWRGaWxlKGFic29sdXRlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlUGF0aCwgJ3V0ZjgnKTtcbiAgfVxuXG4gIHN0YXRpYyByZWFkRmlsZUJ1ZmZlcihhYnNvbHV0ZVBhdGg6IHN0cmluZyk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhhYnNvbHV0ZVBhdGgpO1xuICB9XG5cbiAgc3RhdGljIHdyaXRlRmlsZShhYnNvbHV0ZVBhdGg6IHN0cmluZywgY29udGVudHM6IHN0cmluZ3xCdWZmZXIpIHtcbiAgICBGaWxlVXRpbHMuZW5zdXJlRGlyKHBhdGguZGlybmFtZShhYnNvbHV0ZVBhdGgpKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGFic29sdXRlUGF0aCwgY29udGVudHMpO1xuICB9XG5cbiAgc3RhdGljIGVuc3VyZURpcihhYnNvbHV0ZVBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHBhcmVudHM6IHN0cmluZ1tdID0gW107XG4gICAgd2hpbGUgKCFGaWxlVXRpbHMuaXNSb290KGFic29sdXRlUGF0aCkgJiYgIWZzLmV4aXN0c1N5bmMoYWJzb2x1dGVQYXRoKSkge1xuICAgICAgcGFyZW50cy5wdXNoKGFic29sdXRlUGF0aCk7XG4gICAgICBhYnNvbHV0ZVBhdGggPSBwYXRoLmRpcm5hbWUoYWJzb2x1dGVQYXRoKTtcbiAgICB9XG4gICAgd2hpbGUgKHBhcmVudHMubGVuZ3RoKSB7XG4gICAgICBmcy5ta2RpclN5bmMocGFyZW50cy5wb3AoKSEpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmUocDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKHApO1xuICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKHApO1xuICAgIH0gZWxzZSBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICBmcy5yZWFkZGlyU3luYyhwKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY29uc3QgYWJzQ2hpbGQgPSBwYXRoLnJlc29sdmUocCwgY2hpbGQpO1xuICAgICAgICBGaWxlVXRpbHMucmVtb3ZlKGFic0NoaWxkKTtcbiAgICAgIH0pO1xuICAgICAgZnMucm1kaXJTeW5jKHApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc1Jvb3QoYWJzb2x1dGVQYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGF0aC5kaXJuYW1lKGFic29sdXRlUGF0aCkgPT09IGFic29sdXRlUGF0aDtcbiAgfVxufVxuIl19