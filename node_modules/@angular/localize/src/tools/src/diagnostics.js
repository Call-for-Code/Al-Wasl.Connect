/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/diagnostics", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * This class is used to collect and then report warnings and errors that occur during the execution
     * of the tools.
     */
    var Diagnostics = /** @class */ (function () {
        function Diagnostics() {
            this.messages = [];
        }
        Object.defineProperty(Diagnostics.prototype, "hasErrors", {
            get: function () {
                return this.messages.some(function (m) { return m.type === 'error'; });
            },
            enumerable: true,
            configurable: true
        });
        Diagnostics.prototype.warn = function (message) {
            this.messages.push({ type: 'warning', message: message });
        };
        Diagnostics.prototype.error = function (message) {
            this.messages.push({ type: 'error', message: message });
        };
        Diagnostics.prototype.formatDiagnostics = function (message) {
            var errors = this.messages.filter(function (d) { return d.type === 'error'; }).map(function (d) { return ' - ' + d.message; });
            var warnings = this.messages.filter(function (d) { return d.type === 'warning'; }).map(function (d) { return ' - ' + d.message; });
            if (errors.length) {
                message += '\nERRORS:\n' + errors.join('\n');
            }
            if (warnings.length) {
                message += '\nWARNINGS:\n' + warnings.join('\n');
            }
            return message;
        };
        return Diagnostics;
    }());
    exports.Diagnostics = Diagnostics;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL2RpYWdub3N0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBRUg7OztPQUdHO0lBQ0g7UUFBQTtZQUNXLGFBQVEsR0FBaUQsRUFBRSxDQUFDO1FBcUJ2RSxDQUFDO1FBcEJDLHNCQUFJLGtDQUFTO2lCQUFiO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1lBQ3JELENBQUM7OztXQUFBO1FBQ0QsMEJBQUksR0FBSixVQUFLLE9BQWU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsMkJBQUssR0FBTCxVQUFNLE9BQWU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsdUNBQWlCLEdBQWpCLFVBQWtCLE9BQWU7WUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDMUYsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVMsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDOUYsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFPLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRDtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFDSCxrQkFBQztJQUFELENBQUMsQUF0QkQsSUFzQkM7SUF0Qlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogVGhpcyBjbGFzcyBpcyB1c2VkIHRvIGNvbGxlY3QgYW5kIHRoZW4gcmVwb3J0IHdhcm5pbmdzIGFuZCBlcnJvcnMgdGhhdCBvY2N1ciBkdXJpbmcgdGhlIGV4ZWN1dGlvblxuICogb2YgdGhlIHRvb2xzLlxuICovXG5leHBvcnQgY2xhc3MgRGlhZ25vc3RpY3Mge1xuICByZWFkb25seSBtZXNzYWdlczoge3R5cGU6ICd3YXJuaW5nJ3wnZXJyb3InLCBtZXNzYWdlOiBzdHJpbmd9W10gPSBbXTtcbiAgZ2V0IGhhc0Vycm9ycygpIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlcy5zb21lKG0gPT4gbS50eXBlID09PSAnZXJyb3InKTtcbiAgfVxuICB3YXJuKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZXMucHVzaCh7dHlwZTogJ3dhcm5pbmcnLCBtZXNzYWdlfSk7XG4gIH1cbiAgZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5tZXNzYWdlcy5wdXNoKHt0eXBlOiAnZXJyb3InLCBtZXNzYWdlfSk7XG4gIH1cbiAgZm9ybWF0RGlhZ25vc3RpY3MobWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBlcnJvcnMgPSB0aGlzLm1lc3NhZ2VzIS5maWx0ZXIoZCA9PiBkLnR5cGUgPT09ICdlcnJvcicpLm1hcChkID0+ICcgLSAnICsgZC5tZXNzYWdlKTtcbiAgICBjb25zdCB3YXJuaW5ncyA9IHRoaXMubWVzc2FnZXMhLmZpbHRlcihkID0+IGQudHlwZSA9PT0gJ3dhcm5pbmcnKS5tYXAoZCA9PiAnIC0gJyArIGQubWVzc2FnZSk7XG4gICAgaWYgKGVycm9ycy5sZW5ndGgpIHtcbiAgICAgIG1lc3NhZ2UgKz0gJ1xcbkVSUk9SUzpcXG4nICsgZXJyb3JzLmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgICBpZiAod2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICBtZXNzYWdlICs9ICdcXG5XQVJOSU5HUzpcXG4nICsgd2FybmluZ3Muam9pbignXFxuJyk7XG4gICAgfVxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG59XG4iXX0=