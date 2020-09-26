import { __decorate, __param } from "tslib";
import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { NgbToastConfig } from './toast-config';
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
var NgbToastHeader = /** @class */ (function () {
    function NgbToastHeader() {
    }
    NgbToastHeader = __decorate([
        Directive({ selector: '[ngbToastHeader]' })
    ], NgbToastHeader);
    return NgbToastHeader;
}());
export { NgbToastHeader };
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
var NgbToast = /** @class */ (function () {
    function NgbToast(ariaLive, config) {
        this.ariaLive = ariaLive;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired immediately when toast's `hide()` method has been called.
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross (&times)
         *
         * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
         * that.
         */
        this.hideOutput = new EventEmitter();
        if (this.ariaLive == null) {
            this.ariaLive = config.ariaLive;
        }
        this.delay = config.delay;
        this.autohide = config.autohide;
    }
    NgbToast.prototype.ngAfterContentInit = function () { this._init(); };
    NgbToast.prototype.ngOnChanges = function (changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    };
    NgbToast.prototype.hide = function () {
        this._clearTimeout();
        this.hideOutput.emit();
    };
    NgbToast.prototype._init = function () {
        var _this = this;
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(function () { return _this.hide(); }, this.delay);
        }
    };
    NgbToast.prototype._clearTimeout = function () {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    };
    NgbToast.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
        { type: NgbToastConfig }
    ]; };
    __decorate([
        Input()
    ], NgbToast.prototype, "delay", void 0);
    __decorate([
        Input()
    ], NgbToast.prototype, "autohide", void 0);
    __decorate([
        Input()
    ], NgbToast.prototype, "header", void 0);
    __decorate([
        ContentChild(NgbToastHeader, { read: TemplateRef, static: true })
    ], NgbToast.prototype, "contentHeaderTpl", void 0);
    __decorate([
        Output('hide')
    ], NgbToast.prototype, "hideOutput", void 0);
    NgbToast = __decorate([
        Component({
            selector: 'ngb-toast',
            exportAs: 'ngbToast',
            encapsulation: ViewEncapsulation.None,
            host: {
                'role': 'alert',
                '[attr.aria-live]': 'ariaLive',
                'aria-atomic': 'true',
                '[class.toast]': 'true',
                '[class.show]': 'true',
            },
            template: "\n    <ng-template #headerTpl>\n      <strong class=\"mr-auto\">{{header}}</strong>\n    </ng-template>\n    <ng-template [ngIf]=\"contentHeaderTpl || header\">\n      <div class=\"toast-header\">\n        <ng-template [ngTemplateOutlet]=\"contentHeaderTpl || headerTpl\"></ng-template>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.toast.close-aria\" (click)=\"hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n    </ng-template>\n    <div class=\"toast-body\">\n      <ng-content></ng-content>\n    </div>\n  ",
            styles: [".ngb-toasts{position:fixed;top:0;right:0;margin:.5em;z-index:1200}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}"]
        }),
        __param(0, Attribute('aria-live'))
    ], NgbToast);
    return NgbToast;
}());
export { NgbToast };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvYXN0L3RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUg7SUFBQTtJQUNBLENBQUM7SUFEWSxjQUFjO1FBRDFCLFNBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQyxDQUFDO09BQzdCLGNBQWMsQ0FDMUI7SUFBRCxxQkFBQztDQUFBLEFBREQsSUFDQztTQURZLGNBQWM7QUFHM0I7Ozs7O0dBS0c7QUE4Qkg7SUF1Q0Usa0JBQTJDLFFBQWdCLEVBQUUsTUFBc0I7UUFBeEMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQWpCM0Q7OztXQUdHO1FBQzhELHFCQUFnQixHQUEyQixJQUFJLENBQUM7UUFFakg7Ozs7Ozs7O1dBUUc7UUFDYSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUdwRCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQixjQUF1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRDLDhCQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLFVBQVUsSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELHVCQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sd0JBQUssR0FBYjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0lBRU8sZ0NBQWEsR0FBckI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNILENBQUM7OzZDQWpDWSxTQUFTLFNBQUMsV0FBVztnQkFBbUMsY0FBYzs7SUEvQjFFO1FBQVIsS0FBSyxFQUFFOzJDQUFlO0lBTWQ7UUFBUixLQUFLLEVBQUU7OENBQW1CO0lBTWxCO1FBQVIsS0FBSyxFQUFFOzRDQUFnQjtJQU15QztRQUFoRSxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7c0RBQWlEO0lBV2pHO1FBQWYsTUFBTSxDQUFDLE1BQU0sQ0FBQztnREFBdUM7SUFyQzNDLFFBQVE7UUE3QnBCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLElBQUksRUFBRTtnQkFDSixNQUFNLEVBQUUsT0FBTztnQkFDZixrQkFBa0IsRUFBRSxVQUFVO2dCQUM5QixhQUFhLEVBQUUsTUFBTTtnQkFDckIsZUFBZSxFQUFFLE1BQU07Z0JBQ3ZCLGNBQWMsRUFBRSxNQUFNO2FBQ3ZCO1lBQ0QsUUFBUSxFQUFFLGdtQkFlVDs7U0FFRixDQUFDO1FBd0NhLFdBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BdkN4QixRQUFRLENBeUVwQjtJQUFELGVBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXpFWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JUb2FzdENvbmZpZ30gZnJvbSAnLi90b2FzdC1jb25maWcnO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGFsbG93cyB0aGUgdXNhZ2Ugb2YgSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlc1xuICogaW5zaWRlIG9mIHRoZSB0b2FzdCdzIGhlYWRlci5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiVG9hc3RIZWFkZXJdJ30pXG5leHBvcnQgY2xhc3MgTmdiVG9hc3RIZWFkZXIge1xufVxuXG4vKipcbiAqIFRvYXN0cyBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzIGFzIG5vdGlmaWNhdGlvbnMgdG8gdGhlIHVzZXIuXG4gKiBHb2FsIGlzIHRvIG1pbWljIHRoZSBwdXNoIG5vdGlmaWNhdGlvbnMgYXZhaWxhYmxlIGJvdGggb24gbW9iaWxlIGFuZCBkZXNrdG9wIG9wZXJhdGluZyBzeXN0ZW1zLlxuICpcbiAqIEBzaW5jZSA1LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItdG9hc3QnLFxuICBleHBvcnRBczogJ25nYlRvYXN0JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2FsZXJ0JyxcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdhcmlhTGl2ZScsXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxuICAgICdbY2xhc3MudG9hc3RdJzogJ3RydWUnLFxuICAgICdbY2xhc3Muc2hvd10nOiAndHJ1ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkZXJUcGw+XG4gICAgICA8c3Ryb25nIGNsYXNzPVwibXItYXV0b1wiPnt7aGVhZGVyfX08L3N0cm9uZz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb250ZW50SGVhZGVyVHBsIHx8IGhlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJUcGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudG9hc3QuY2xvc2UtYXJpYVwiIChjbGljayk9XCJoaWRlKClcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vdG9hc3Quc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBPbkNoYW5nZXMge1xuICBwcml2YXRlIF90aW1lb3V0SUQ7XG5cbiAgLyoqXG4gICAqIERlbGF5IGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGhpZGUgKG1zKS5cbiAgICogZGVmYXVsdDogYDUwMGAgKG1zKSAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBdXRvIGhpZGUgdGhlIHRvYXN0IGFmdGVyIGEgZGVsYXkgaW4gbXMuXG4gICAqIGRlZmF1bHQ6IGB0cnVlYCAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBhdXRvaGlkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGV4dCB0byBiZSB1c2VkIGFzIHRvYXN0J3MgaGVhZGVyLlxuICAgKiBJZ25vcmVkIGlmIGEgQ29udGVudENoaWxkIHRlbXBsYXRlIGlzIHNwZWNpZmllZCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgbGlrZSBgPG5nLXRlbXBsYXRlIG5nYlRvYXN0SGVhZGVyPjwvbmctdGVtcGxhdGU+YCBjYW4gYmVcbiAgICogdXNlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQgdG8gYWxsb3cgbWFya3VwIHVzYWdlLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChOZ2JUb2FzdEhlYWRlciwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KSBjb250ZW50SGVhZGVyVHBsOiBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgaW1tZWRpYXRlbHkgd2hlbiB0b2FzdCdzIGBoaWRlKClgIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAqIEl0IGNhbiBvbmx5IG9jY3VyIGluIDIgZGlmZmVyZW50IHNjZW5hcmlvczpcbiAgICogLSBgYXV0b2hpZGVgIHRpbWVvdXQgZmlyZXNcbiAgICogLSB1c2VyIGNsaWNrcyBvbiBhIGNsb3NpbmcgY3Jvc3MgKCZ0aW1lcylcbiAgICpcbiAgICogQWRkaXRpb25hbGx5IHRoaXMgb3V0cHV0IGlzIHB1cmVseSBpbmZvcm1hdGl2ZS4gVGhlIHRvYXN0IHdvbid0IGRpc2FwcGVhci4gSXQncyB1cCB0byB0aGUgdXNlciB0byB0YWtlIGNhcmUgb2ZcbiAgICogdGhhdC5cbiAgICovXG4gIEBPdXRwdXQoJ2hpZGUnKSBoaWRlT3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpIHB1YmxpYyBhcmlhTGl2ZTogc3RyaW5nLCBjb25maWc6IE5nYlRvYXN0Q29uZmlnKSB7XG4gICAgaWYgKHRoaXMuYXJpYUxpdmUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5hcmlhTGl2ZSA9IGNvbmZpZy5hcmlhTGl2ZTtcbiAgICB9XG4gICAgdGhpcy5kZWxheSA9IGNvbmZpZy5kZWxheTtcbiAgICB0aGlzLmF1dG9oaWRlID0gY29uZmlnLmF1dG9oaWRlO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkgeyB0aGlzLl9pbml0KCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdhdXRvaGlkZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLl9jbGVhclRpbWVvdXQoKTtcbiAgICB0aGlzLmhpZGVPdXRwdXQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICBpZiAodGhpcy5hdXRvaGlkZSAmJiAhdGhpcy5fdGltZW91dElEKSB7XG4gICAgICB0aGlzLl90aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLmRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbGVhclRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMuX3RpbWVvdXRJRCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRJRCk7XG4gICAgICB0aGlzLl90aW1lb3V0SUQgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19