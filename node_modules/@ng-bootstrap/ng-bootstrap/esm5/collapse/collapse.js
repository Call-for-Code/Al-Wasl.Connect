import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
var NgbCollapse = /** @class */ (function () {
    function NgbCollapse() {
        /**
         * If `true`, will collapse the element or show it otherwise.
         */
        this.collapsed = false;
    }
    __decorate([
        Input('ngbCollapse')
    ], NgbCollapse.prototype, "collapsed", void 0);
    NgbCollapse = __decorate([
        Directive({
            selector: '[ngbCollapse]',
            exportAs: 'ngbCollapse',
            host: { '[class.collapse]': 'true', '[class.show]': '!collapsed' }
        })
    ], NgbCollapse);
    return NgbCollapse;
}());
export { NgbCollapse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL2NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvQzs7R0FFRztBQU1IO0lBQUE7UUFDRTs7V0FFRztRQUNtQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzFDLENBQUM7SUFEdUI7UUFBckIsS0FBSyxDQUFDLGFBQWEsQ0FBQztrREFBbUI7SUFKN0IsV0FBVztRQUx2QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsYUFBYTtZQUN2QixJQUFJLEVBQUUsRUFBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBQztTQUNqRSxDQUFDO09BQ1csV0FBVyxDQUt2QjtJQUFELGtCQUFDO0NBQUEsQUFMRCxJQUtDO1NBTFksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdG8gcHJvdmlkZSBhIHNpbXBsZSB3YXkgb2YgaGlkaW5nIGFuZCBzaG93aW5nIGVsZW1lbnRzIG9uIHRoZSBwYWdlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdiQ29sbGFwc2VdJyxcbiAgZXhwb3J0QXM6ICduZ2JDb2xsYXBzZScsXG4gIGhvc3Q6IHsnW2NsYXNzLmNvbGxhcHNlXSc6ICd0cnVlJywgJ1tjbGFzcy5zaG93XSc6ICchY29sbGFwc2VkJ31cbn0pXG5leHBvcnQgY2xhc3MgTmdiQ29sbGFwc2Uge1xuICAvKipcbiAgICogSWYgYHRydWVgLCB3aWxsIGNvbGxhcHNlIHRoZSBlbGVtZW50IG9yIHNob3cgaXQgb3RoZXJ3aXNlLlxuICAgKi9cbiAgQElucHV0KCduZ2JDb2xsYXBzZScpIGNvbGxhcHNlZCA9IGZhbHNlO1xufVxuIl19