import { __decorate } from "tslib";
// tslint:disable:deprecation
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTabset`](#/components/tabset/api#NgbTabset) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 *
 * @deprecated 6.0.0 Please use NgbNav instead
 */
var NgbTabsetConfig = /** @class */ (function () {
    function NgbTabsetConfig() {
        this.justify = 'start';
        this.orientation = 'horizontal';
        this.type = 'tabs';
    }
    NgbTabsetConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTabsetConfig_Factory() { return new NgbTabsetConfig(); }, token: NgbTabsetConfig, providedIn: "root" });
    NgbTabsetConfig = __decorate([
        Injectable({ providedIn: 'root' })
    ], NgbTabsetConfig);
    return NgbTabsetConfig;
}());
export { NgbTabsetConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidGFic2V0L3RhYnNldC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2QjtBQUM3QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6Qzs7Ozs7OztHQU9HO0FBRUg7SUFBQTtRQUNFLFlBQU8sR0FBc0QsT0FBTyxDQUFDO1FBQ3JFLGdCQUFXLEdBQThCLFlBQVksQ0FBQztRQUN0RCxTQUFJLEdBQXFCLE1BQU0sQ0FBQztLQUNqQzs7SUFKWSxlQUFlO1FBRDNCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztPQUNwQixlQUFlLENBSTNCOzBCQWhCRDtDQWdCQyxBQUpELElBSUM7U0FKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6ZGVwcmVjYXRpb25cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBjb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBbYE5nYlRhYnNldGBdKCMvY29tcG9uZW50cy90YWJzZXQvYXBpI05nYlRhYnNldCkgY29tcG9uZW50LlxuICpcbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemUgdGhlIHZhbHVlcyBvZiBpdHMgcHJvcGVydGllcyBpblxuICogb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSB0YWJzZXRzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBkZXByZWNhdGVkIDYuMC4wIFBsZWFzZSB1c2UgTmdiTmF2IGluc3RlYWRcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTmdiVGFic2V0Q29uZmlnIHtcbiAganVzdGlmeTogJ3N0YXJ0JyB8ICdjZW50ZXInIHwgJ2VuZCcgfCAnZmlsbCcgfCAnanVzdGlmaWVkJyA9ICdzdGFydCc7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICB0eXBlOiAndGFicycgfCAncGlsbHMnID0gJ3RhYnMnO1xufVxuIl19