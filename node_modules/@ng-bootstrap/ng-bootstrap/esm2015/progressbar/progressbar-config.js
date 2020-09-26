import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
let NgbProgressbarConfig = class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.striped = false;
        this.showValue = false;
    }
};
NgbProgressbarConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbProgressbarConfig_Factory() { return new NgbProgressbarConfig(); }, token: NgbProgressbarConfig, providedIn: "root" });
NgbProgressbarConfig = __decorate([
    Injectable({ providedIn: 'root' })
], NgbProgressbarConfig);
export { NgbProgressbarConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXItY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJwcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDOzs7OztHQUtHO0FBRUgsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFBakM7UUFDRSxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ1YsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7S0FFbkI7Q0FBQSxDQUFBOztBQVJZLG9CQUFvQjtJQURoQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7R0FDcEIsb0JBQW9CLENBUWhDO1NBUlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiUHJvZ3Jlc3NiYXJgXSgjL2NvbXBvbmVudHMvcHJvZ3Jlc3NiYXIvYXBpI05nYlByb2dyZXNzYmFyKSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHByb2dyZXNzIGJhcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyQ29uZmlnIHtcbiAgbWF4ID0gMTAwO1xuICBhbmltYXRlZCA9IGZhbHNlO1xuICBzdHJpcGVkID0gZmFsc2U7XG4gIHRleHRUeXBlOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgc2hvd1ZhbHVlID0gZmFsc2U7XG4gIGhlaWdodDogc3RyaW5nO1xufVxuIl19