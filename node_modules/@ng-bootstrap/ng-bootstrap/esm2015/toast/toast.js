import { __decorate, __param } from "tslib";
import { Attribute, Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation, } from '@angular/core';
import { NgbToastConfig } from './toast-config';
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
let NgbToastHeader = class NgbToastHeader {
};
NgbToastHeader = __decorate([
    Directive({ selector: '[ngbToastHeader]' })
], NgbToastHeader);
export { NgbToastHeader };
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
let NgbToast = class NgbToast {
    constructor(ariaLive, config) {
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
    ngAfterContentInit() { this._init(); }
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
    hide() {
        this._clearTimeout();
        this.hideOutput.emit();
    }
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
};
NgbToast.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['aria-live',] }] },
    { type: NgbToastConfig }
];
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
        template: `
    <ng-template #headerTpl>
      <strong class="mr-auto">{{header}}</strong>
    </ng-template>
    <ng-template [ngIf]="contentHeaderTpl || header">
      <div class="toast-header">
        <ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl"></ng-template>
        <button type="button" class="close" aria-label="Close" i18n-aria-label="@@ngb.toast.close-aria" (click)="hide()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </ng-template>
    <div class="toast-body">
      <ng-content></ng-content>
    </div>
  `,
        styles: [".ngb-toasts{position:fixed;top:0;right:0;margin:.5em;z-index:1200}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}"]
    }),
    __param(0, Attribute('aria-live'))
], NgbToast);
export { NgbToast };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInRvYXN0L3RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFdBQVcsRUFDWCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlDOzs7OztHQUtHO0FBRUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUMxQixDQUFBO0FBRFksY0FBYztJQUQxQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQztHQUM3QixjQUFjLENBQzFCO1NBRFksY0FBYztBQUczQjs7Ozs7R0FLRztBQThCSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBdUNuQixZQUEyQyxRQUFnQixFQUFFLE1BQXNCO1FBQXhDLGFBQVEsR0FBUixRQUFRLENBQVE7UUFqQjNEOzs7V0FHRztRQUM4RCxxQkFBZ0IsR0FBMkIsSUFBSSxDQUFDO1FBRWpIOzs7Ozs7OztXQVFHO1FBQ2EsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFHcEQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDakM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQkFBa0IsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLFVBQVUsSUFBSSxPQUFPLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sS0FBSztRQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUNGLENBQUE7O3lDQWxDYyxTQUFTLFNBQUMsV0FBVztZQUFtQyxjQUFjOztBQS9CMUU7SUFBUixLQUFLLEVBQUU7dUNBQWU7QUFNZDtJQUFSLEtBQUssRUFBRTswQ0FBbUI7QUFNbEI7SUFBUixLQUFLLEVBQUU7d0NBQWdCO0FBTXlDO0lBQWhFLFlBQVksQ0FBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztrREFBaUQ7QUFXakc7SUFBZixNQUFNLENBQUMsTUFBTSxDQUFDOzRDQUF1QztBQXJDM0MsUUFBUTtJQTdCcEIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLFVBQVU7UUFDcEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsSUFBSSxFQUFFO1lBQ0osTUFBTSxFQUFFLE9BQU87WUFDZixrQkFBa0IsRUFBRSxVQUFVO1lBQzlCLGFBQWEsRUFBRSxNQUFNO1lBQ3JCLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLGNBQWMsRUFBRSxNQUFNO1NBQ3ZCO1FBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDs7S0FFRixDQUFDO0lBd0NhLFdBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBdkN4QixRQUFRLENBeUVwQjtTQXpFWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JUb2FzdENvbmZpZ30gZnJvbSAnLi90b2FzdC1jb25maWcnO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGFsbG93cyB0aGUgdXNhZ2Ugb2YgSFRNTCBtYXJrdXAgb3Igb3RoZXIgZGlyZWN0aXZlc1xuICogaW5zaWRlIG9mIHRoZSB0b2FzdCdzIGhlYWRlci5cbiAqXG4gKiBAc2luY2UgNS4wLjBcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdiVG9hc3RIZWFkZXJdJ30pXG5leHBvcnQgY2xhc3MgTmdiVG9hc3RIZWFkZXIge1xufVxuXG4vKipcbiAqIFRvYXN0cyBwcm92aWRlIGZlZWRiYWNrIG1lc3NhZ2VzIGFzIG5vdGlmaWNhdGlvbnMgdG8gdGhlIHVzZXIuXG4gKiBHb2FsIGlzIHRvIG1pbWljIHRoZSBwdXNoIG5vdGlmaWNhdGlvbnMgYXZhaWxhYmxlIGJvdGggb24gbW9iaWxlIGFuZCBkZXNrdG9wIG9wZXJhdGluZyBzeXN0ZW1zLlxuICpcbiAqIEBzaW5jZSA1LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItdG9hc3QnLFxuICBleHBvcnRBczogJ25nYlRvYXN0JyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2FsZXJ0JyxcbiAgICAnW2F0dHIuYXJpYS1saXZlXSc6ICdhcmlhTGl2ZScsXG4gICAgJ2FyaWEtYXRvbWljJzogJ3RydWUnLFxuICAgICdbY2xhc3MudG9hc3RdJzogJ3RydWUnLFxuICAgICdbY2xhc3Muc2hvd10nOiAndHJ1ZScsXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkZXJUcGw+XG4gICAgICA8c3Ryb25nIGNsYXNzPVwibXItYXV0b1wiPnt7aGVhZGVyfX08L3N0cm9uZz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb250ZW50SGVhZGVyVHBsIHx8IGhlYWRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudEhlYWRlclRwbCB8fCBoZWFkZXJUcGxcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgaTE4bi1hcmlhLWxhYmVsPVwiQEBuZ2IudG9hc3QuY2xvc2UtYXJpYVwiIChjbGljayk9XCJoaWRlKClcIj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vdG9hc3Quc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIE5nYlRvYXN0IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBPbkNoYW5nZXMge1xuICBwcml2YXRlIF90aW1lb3V0SUQ7XG5cbiAgLyoqXG4gICAqIERlbGF5IGFmdGVyIHdoaWNoIHRoZSB0b2FzdCB3aWxsIGhpZGUgKG1zKS5cbiAgICogZGVmYXVsdDogYDUwMGAgKG1zKSAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBkZWxheTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBdXRvIGhpZGUgdGhlIHRvYXN0IGFmdGVyIGEgZGVsYXkgaW4gbXMuXG4gICAqIGRlZmF1bHQ6IGB0cnVlYCAoaW5oZXJpdGVkIGZyb20gTmdiVG9hc3RDb25maWcpXG4gICAqL1xuICBASW5wdXQoKSBhdXRvaGlkZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGV4dCB0byBiZSB1c2VkIGFzIHRvYXN0J3MgaGVhZGVyLlxuICAgKiBJZ25vcmVkIGlmIGEgQ29udGVudENoaWxkIHRlbXBsYXRlIGlzIHNwZWNpZmllZCBhdCB0aGUgc2FtZSB0aW1lLlxuICAgKi9cbiAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgbGlrZSBgPG5nLXRlbXBsYXRlIG5nYlRvYXN0SGVhZGVyPjwvbmctdGVtcGxhdGU+YCBjYW4gYmVcbiAgICogdXNlZCBpbiB0aGUgcHJvamVjdGVkIGNvbnRlbnQgdG8gYWxsb3cgbWFya3VwIHVzYWdlLlxuICAgKi9cbiAgQENvbnRlbnRDaGlsZChOZ2JUb2FzdEhlYWRlciwge3JlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWV9KSBjb250ZW50SGVhZGVyVHBsOiBUZW1wbGF0ZVJlZjxhbnk+fCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgaW1tZWRpYXRlbHkgd2hlbiB0b2FzdCdzIGBoaWRlKClgIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAqIEl0IGNhbiBvbmx5IG9jY3VyIGluIDIgZGlmZmVyZW50IHNjZW5hcmlvczpcbiAgICogLSBgYXV0b2hpZGVgIHRpbWVvdXQgZmlyZXNcbiAgICogLSB1c2VyIGNsaWNrcyBvbiBhIGNsb3NpbmcgY3Jvc3MgKCZ0aW1lcylcbiAgICpcbiAgICogQWRkaXRpb25hbGx5IHRoaXMgb3V0cHV0IGlzIHB1cmVseSBpbmZvcm1hdGl2ZS4gVGhlIHRvYXN0IHdvbid0IGRpc2FwcGVhci4gSXQncyB1cCB0byB0aGUgdXNlciB0byB0YWtlIGNhcmUgb2ZcbiAgICogdGhhdC5cbiAgICovXG4gIEBPdXRwdXQoJ2hpZGUnKSBoaWRlT3V0cHV0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpIHB1YmxpYyBhcmlhTGl2ZTogc3RyaW5nLCBjb25maWc6IE5nYlRvYXN0Q29uZmlnKSB7XG4gICAgaWYgKHRoaXMuYXJpYUxpdmUgPT0gbnVsbCkge1xuICAgICAgdGhpcy5hcmlhTGl2ZSA9IGNvbmZpZy5hcmlhTGl2ZTtcbiAgICB9XG4gICAgdGhpcy5kZWxheSA9IGNvbmZpZy5kZWxheTtcbiAgICB0aGlzLmF1dG9oaWRlID0gY29uZmlnLmF1dG9oaWRlO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkgeyB0aGlzLl9pbml0KCk7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdhdXRvaGlkZScgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy5fY2xlYXJUaW1lb3V0KCk7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLl9jbGVhclRpbWVvdXQoKTtcbiAgICB0aGlzLmhpZGVPdXRwdXQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpIHtcbiAgICBpZiAodGhpcy5hdXRvaGlkZSAmJiAhdGhpcy5fdGltZW91dElEKSB7XG4gICAgICB0aGlzLl90aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCB0aGlzLmRlbGF5KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbGVhclRpbWVvdXQoKSB7XG4gICAgaWYgKHRoaXMuX3RpbWVvdXRJRCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRJRCk7XG4gICAgICB0aGlzLl90aW1lb3V0SUQgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19