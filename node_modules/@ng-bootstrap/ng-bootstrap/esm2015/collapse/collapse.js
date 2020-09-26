import { __decorate } from "tslib";
import { Directive, Input } from '@angular/core';
/**
 * A directive to provide a simple way of hiding and showing elements on the page.
 */
let NgbCollapse = class NgbCollapse {
    constructor() {
        /**
         * If `true`, will collapse the element or show it otherwise.
         */
        this.collapsed = false;
    }
};
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
export { NgbCollapse };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNvbGxhcHNlL2NvbGxhcHNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvQzs7R0FFRztBQU1ILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFBeEI7UUFDRTs7V0FFRztRQUNtQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzFDLENBQUM7Q0FBQSxDQUFBO0FBRHVCO0lBQXJCLEtBQUssQ0FBQyxhQUFhLENBQUM7OENBQW1CO0FBSjdCLFdBQVc7SUFMdkIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUSxFQUFFLGFBQWE7UUFDdkIsSUFBSSxFQUFFLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUM7S0FDakUsQ0FBQztHQUNXLFdBQVcsQ0FLdkI7U0FMWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBwcm92aWRlIGEgc2ltcGxlIHdheSBvZiBoaWRpbmcgYW5kIHNob3dpbmcgZWxlbWVudHMgb24gdGhlIHBhZ2UuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ2JDb2xsYXBzZV0nLFxuICBleHBvcnRBczogJ25nYkNvbGxhcHNlJyxcbiAgaG9zdDogeydbY2xhc3MuY29sbGFwc2VdJzogJ3RydWUnLCAnW2NsYXNzLnNob3ddJzogJyFjb2xsYXBzZWQnfVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JDb2xsYXBzZSB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHdpbGwgY29sbGFwc2UgdGhlIGVsZW1lbnQgb3Igc2hvdyBpdCBvdGhlcndpc2UuXG4gICAqL1xuICBASW5wdXQoJ25nYkNvbGxhcHNlJykgY29sbGFwc2VkID0gZmFsc2U7XG59XG4iXX0=