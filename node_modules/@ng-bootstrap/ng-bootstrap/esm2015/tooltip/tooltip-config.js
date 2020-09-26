import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
let NgbTooltipConfig = class NgbTooltipConfig {
    constructor() {
        this.autoClose = true;
        this.placement = 'auto';
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
};
NgbTooltipConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(); }, token: NgbTooltipConfig, providedIn: "root" });
NgbTooltipConfig = __decorate([
    Injectable({ providedIn: 'root' })
], NgbTooltipConfig);
export { NgbTooltipConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvb2x0aXAvdG9vbHRpcC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR3pDOzs7OztHQUtHO0FBRUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFBN0I7UUFDRSxjQUFTLEdBQW1DLElBQUksQ0FBQztRQUNqRCxjQUFTLEdBQW1CLE1BQU0sQ0FBQztRQUNuQyxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBRXpCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxlQUFVLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO0NBQUEsQ0FBQTs7QUFUWSxnQkFBZ0I7SUFENUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO0dBQ3BCLGdCQUFnQixDQVM1QjtTQVRZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiVG9vbHRpcGBdKCMvY29tcG9uZW50cy90b29sdGlwL2FwaSNOZ2JUb29sdGlwKSBjb21wb25lbnQuXG4gKlxuICogWW91IGNhbiBpbmplY3QgdGhpcyBzZXJ2aWNlLCB0eXBpY2FsbHkgaW4geW91ciByb290IGNvbXBvbmVudCwgYW5kIGN1c3RvbWl6ZSB0aGUgdmFsdWVzIG9mIGl0cyBwcm9wZXJ0aWVzIGluXG4gKiBvcmRlciB0byBwcm92aWRlIGRlZmF1bHQgdmFsdWVzIGZvciBhbGwgdGhlIHRvb2x0aXBzIHVzZWQgaW4gdGhlIGFwcGxpY2F0aW9uLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ2JUb29sdGlwQ29uZmlnIHtcbiAgYXV0b0Nsb3NlOiBib29sZWFuIHwgJ2luc2lkZScgfCAnb3V0c2lkZScgPSB0cnVlO1xuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2F1dG8nO1xuICB0cmlnZ2VycyA9ICdob3ZlciBmb2N1cyc7XG4gIGNvbnRhaW5lcjogc3RyaW5nO1xuICBkaXNhYmxlVG9vbHRpcCA9IGZhbHNlO1xuICB0b29sdGlwQ2xhc3M6IHN0cmluZztcbiAgb3BlbkRlbGF5ID0gMDtcbiAgY2xvc2VEZWxheSA9IDA7XG59XG4iXX0=