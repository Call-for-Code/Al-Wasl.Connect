(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/message_serialization/target_message_renderer", ["require", "exports", "@angular/localize"], factory);
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
    var localize_1 = require("@angular/localize");
    /**
     * A message renderer that outputs `ɵParsedTranslation` objects.
     */
    var TargetMessageRenderer = /** @class */ (function () {
        function TargetMessageRenderer() {
            this.current = { messageParts: [], placeholderNames: [], text: '' };
            this.icuDepth = 0;
        }
        Object.defineProperty(TargetMessageRenderer.prototype, "message", {
            get: function () {
                var _a = this.current, messageParts = _a.messageParts, placeholderNames = _a.placeholderNames;
                return localize_1.ɵmakeParsedTranslation(messageParts, placeholderNames);
            },
            enumerable: true,
            configurable: true
        });
        TargetMessageRenderer.prototype.startRender = function () { };
        TargetMessageRenderer.prototype.endRender = function () {
            this.storeMessagePart();
        };
        TargetMessageRenderer.prototype.text = function (text) {
            this.current.text += text;
        };
        TargetMessageRenderer.prototype.placeholder = function (name, body) {
            this.renderPlaceholder(name);
        };
        TargetMessageRenderer.prototype.startPlaceholder = function (name) {
            this.renderPlaceholder(name);
        };
        TargetMessageRenderer.prototype.closePlaceholder = function (name) {
            this.renderPlaceholder(name);
        };
        TargetMessageRenderer.prototype.startContainer = function () { };
        TargetMessageRenderer.prototype.closeContainer = function () { };
        TargetMessageRenderer.prototype.startIcu = function () {
            this.icuDepth++;
            this.text('{');
        };
        TargetMessageRenderer.prototype.endIcu = function () {
            this.icuDepth--;
            this.text('}');
        };
        TargetMessageRenderer.prototype.normalizePlaceholderName = function (name) {
            return name.replace(/-/g, '_');
        };
        TargetMessageRenderer.prototype.renderPlaceholder = function (name) {
            name = this.normalizePlaceholderName(name);
            if (this.icuDepth > 0) {
                this.text("{" + name + "}");
            }
            else {
                this.storeMessagePart();
                this.current.placeholderNames.push(name);
            }
        };
        TargetMessageRenderer.prototype.storeMessagePart = function () {
            this.current.messageParts.push(this.current.text);
            this.current.text = '';
        };
        return TargetMessageRenderer;
    }());
    exports.TargetMessageRenderer = TargetMessageRenderer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0X21lc3NhZ2VfcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvdG9vbHMvc3JjL3RyYW5zbGF0ZS90cmFuc2xhdGlvbl9maWxlcy9tZXNzYWdlX3NlcmlhbGl6YXRpb24vdGFyZ2V0X21lc3NhZ2VfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQTs7Ozs7O09BTUc7SUFDSCw4Q0FBNkU7SUFJN0U7O09BRUc7SUFDSDtRQUFBO1lBQ1UsWUFBTyxHQUFnQixFQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztZQUMxRSxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBZ0R2QixDQUFDO1FBOUNDLHNCQUFJLDBDQUFPO2lCQUFYO2dCQUNRLElBQUEsaUJBQStDLEVBQTlDLDhCQUFZLEVBQUUsc0NBQWdDLENBQUM7Z0JBQ3RELE9BQU8saUNBQXNCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFDaEUsQ0FBQzs7O1dBQUE7UUFDRCwyQ0FBVyxHQUFYLGNBQXFCLENBQUM7UUFDdEIseUNBQVMsR0FBVDtZQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxvQ0FBSSxHQUFKLFVBQUssSUFBWTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUM1QixDQUFDO1FBQ0QsMkNBQVcsR0FBWCxVQUFZLElBQVksRUFBRSxJQUFzQjtZQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELGdEQUFnQixHQUFoQixVQUFpQixJQUFZO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0QsZ0RBQWdCLEdBQWhCLFVBQWlCLElBQVk7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCw4Q0FBYyxHQUFkLGNBQXdCLENBQUM7UUFDekIsOENBQWMsR0FBZCxjQUF3QixDQUFDO1FBQ3pCLHdDQUFRLEdBQVI7WUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBQ0Qsc0NBQU0sR0FBTjtZQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUM7UUFDTyx3REFBd0IsR0FBaEMsVUFBaUMsSUFBWTtZQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDTyxpREFBaUIsR0FBekIsVUFBMEIsSUFBWTtZQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBSSxJQUFJLE1BQUcsQ0FBQyxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQztRQUNILENBQUM7UUFDTyxnREFBZ0IsR0FBeEI7WUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNILDRCQUFDO0lBQUQsQ0FBQyxBQWxERCxJQWtEQztJQWxEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge8m1bWFrZVBhcnNlZFRyYW5zbGF0aW9uLCDJtVBhcnNlZFRyYW5zbGF0aW9ufSBmcm9tICdAYW5ndWxhci9sb2NhbGl6ZSc7XG5cbmltcG9ydCB7TWVzc2FnZVJlbmRlcmVyfSBmcm9tICcuL21lc3NhZ2VfcmVuZGVyZXInO1xuXG4vKipcbiAqIEEgbWVzc2FnZSByZW5kZXJlciB0aGF0IG91dHB1dHMgYMm1UGFyc2VkVHJhbnNsYXRpb25gIG9iamVjdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYXJnZXRNZXNzYWdlUmVuZGVyZXIgaW1wbGVtZW50cyBNZXNzYWdlUmVuZGVyZXI8ybVQYXJzZWRUcmFuc2xhdGlvbj4ge1xuICBwcml2YXRlIGN1cnJlbnQ6IE1lc3NhZ2VJbmZvID0ge21lc3NhZ2VQYXJ0czogW10sIHBsYWNlaG9sZGVyTmFtZXM6IFtdLCB0ZXh0OiAnJ307XG4gIHByaXZhdGUgaWN1RGVwdGggPSAwO1xuXG4gIGdldCBtZXNzYWdlKCk6IMm1UGFyc2VkVHJhbnNsYXRpb24ge1xuICAgIGNvbnN0IHttZXNzYWdlUGFydHMsIHBsYWNlaG9sZGVyTmFtZXN9ID0gdGhpcy5jdXJyZW50O1xuICAgIHJldHVybiDJtW1ha2VQYXJzZWRUcmFuc2xhdGlvbihtZXNzYWdlUGFydHMsIHBsYWNlaG9sZGVyTmFtZXMpO1xuICB9XG4gIHN0YXJ0UmVuZGVyKCk6IHZvaWQge31cbiAgZW5kUmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmVNZXNzYWdlUGFydCgpO1xuICB9XG4gIHRleHQodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50LnRleHQgKz0gdGV4dDtcbiAgfVxuICBwbGFjZWhvbGRlcihuYW1lOiBzdHJpbmcsIGJvZHk6IHN0cmluZ3x1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlclBsYWNlaG9sZGVyKG5hbWUpO1xuICB9XG4gIHN0YXJ0UGxhY2Vob2xkZXIobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJQbGFjZWhvbGRlcihuYW1lKTtcbiAgfVxuICBjbG9zZVBsYWNlaG9sZGVyKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyUGxhY2Vob2xkZXIobmFtZSk7XG4gIH1cbiAgc3RhcnRDb250YWluZXIoKTogdm9pZCB7fVxuICBjbG9zZUNvbnRhaW5lcigpOiB2b2lkIHt9XG4gIHN0YXJ0SWN1KCk6IHZvaWQge1xuICAgIHRoaXMuaWN1RGVwdGgrKztcbiAgICB0aGlzLnRleHQoJ3snKTtcbiAgfVxuICBlbmRJY3UoKTogdm9pZCB7XG4gICAgdGhpcy5pY3VEZXB0aC0tO1xuICAgIHRoaXMudGV4dCgnfScpO1xuICB9XG4gIHByaXZhdGUgbm9ybWFsaXplUGxhY2Vob2xkZXJOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuYW1lLnJlcGxhY2UoLy0vZywgJ18nKTtcbiAgfVxuICBwcml2YXRlIHJlbmRlclBsYWNlaG9sZGVyKG5hbWU6IHN0cmluZykge1xuICAgIG5hbWUgPSB0aGlzLm5vcm1hbGl6ZVBsYWNlaG9sZGVyTmFtZShuYW1lKTtcbiAgICBpZiAodGhpcy5pY3VEZXB0aCA+IDApIHtcbiAgICAgIHRoaXMudGV4dChgeyR7bmFtZX19YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmVNZXNzYWdlUGFydCgpO1xuICAgICAgdGhpcy5jdXJyZW50LnBsYWNlaG9sZGVyTmFtZXMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdG9yZU1lc3NhZ2VQYXJ0KCkge1xuICAgIHRoaXMuY3VycmVudC5tZXNzYWdlUGFydHMucHVzaCh0aGlzLmN1cnJlbnQudGV4dCk7XG4gICAgdGhpcy5jdXJyZW50LnRleHQgPSAnJztcbiAgfVxufVxuXG5pbnRlcmZhY2UgTWVzc2FnZUluZm8ge1xuICBtZXNzYWdlUGFydHM6IHN0cmluZ1tdO1xuICBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXTtcbiAgdGV4dDogc3RyaW5nO1xufSJdfQ==