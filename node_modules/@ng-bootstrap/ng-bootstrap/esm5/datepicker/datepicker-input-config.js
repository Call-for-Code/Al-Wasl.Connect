import { __decorate, __extends } from "tslib";
import { Injectable } from '@angular/core';
import { NgbDatepickerConfig } from './datepicker-config';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
var NgbInputDatepickerConfig = /** @class */ (function (_super) {
    __extends(NgbInputDatepickerConfig, _super);
    function NgbInputDatepickerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        _this.restoreFocus = true;
        return _this;
    }
    NgbInputDatepickerConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbInputDatepickerConfig_Factory() { return new NgbInputDatepickerConfig(); }, token: NgbInputDatepickerConfig, providedIn: "root" });
    NgbInputDatepickerConfig = __decorate([
        Injectable({ providedIn: 'root' })
    ], NgbInputDatepickerConfig);
    return NgbInputDatepickerConfig;
}(NgbDatepickerConfig));
export { NgbInputDatepickerConfig };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIvZGF0ZXBpY2tlci1pbnB1dC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBR3hEOzs7Ozs7O0dBT0c7QUFFSDtJQUE4Qyw0Q0FBbUI7SUFBakU7UUFBQSxxRUFNQztRQUxDLGVBQVMsR0FBbUMsSUFBSSxDQUFDO1FBR2pELGVBQVMsR0FBbUIsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNyRixrQkFBWSxHQUFnQyxJQUFJLENBQUM7O0tBQ2xEOztJQU5ZLHdCQUF3QjtRQURwQyxVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7T0FDcEIsd0JBQXdCLENBTXBDO21DQXBCRDtDQW9CQyxBQU5ELENBQThDLG1CQUFtQixHQU1oRTtTQU5ZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TmdiRGF0ZXBpY2tlckNvbmZpZ30gZnJvbSAnLi9kYXRlcGlja2VyLWNvbmZpZyc7XG5pbXBvcnQge1BsYWNlbWVudEFycmF5fSBmcm9tICcuLi91dGlsL3Bvc2l0aW9uaW5nJztcblxuLyoqXG4gKiBBIGNvbmZpZ3VyYXRpb24gc2VydmljZSBmb3IgdGhlIFtgTmdiRGF0ZXBpY2tlcklucHV0YF0oIy9jb21wb25lbnRzL2RhdGVwaWNrZXIvYXBpI05nYkRhdGVwaWNrZXIpIGNvbXBvbmVudC5cbiAqXG4gKiBZb3UgY2FuIGluamVjdCB0aGlzIHNlcnZpY2UsIHR5cGljYWxseSBpbiB5b3VyIHJvb3QgY29tcG9uZW50LCBhbmQgY3VzdG9taXplIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW5cbiAqIG9yZGVyIHRvIHByb3ZpZGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGFsbCB0aGUgZGF0ZXBpY2tlciBpbnB1dHMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKlxuICogQHNpbmNlIDUuMi4wXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYklucHV0RGF0ZXBpY2tlckNvbmZpZyBleHRlbmRzIE5nYkRhdGVwaWNrZXJDb25maWcge1xuICBhdXRvQ2xvc2U6IGJvb2xlYW4gfCAnaW5zaWRlJyB8ICdvdXRzaWRlJyA9IHRydWU7XG4gIGNvbnRhaW5lcjogbnVsbCB8ICdib2R5JztcbiAgcG9zaXRpb25UYXJnZXQ6IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuICBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gWydib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLCAndG9wLWxlZnQnLCAndG9wLXJpZ2h0J107XG4gIHJlc3RvcmVGb2N1czogdHJ1ZSB8IEhUTUxFbGVtZW50IHwgc3RyaW5nID0gdHJ1ZTtcbn1cbiJdfQ==