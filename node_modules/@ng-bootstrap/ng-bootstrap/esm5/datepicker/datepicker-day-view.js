import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerDayView = /** @class */ (function () {
    function NgbDatepickerDayView(i18n) {
        this.i18n = i18n;
    }
    NgbDatepickerDayView.prototype.isMuted = function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
    NgbDatepickerDayView.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    __decorate([
        Input()
    ], NgbDatepickerDayView.prototype, "currentMonth", void 0);
    __decorate([
        Input()
    ], NgbDatepickerDayView.prototype, "date", void 0);
    __decorate([
        Input()
    ], NgbDatepickerDayView.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NgbDatepickerDayView.prototype, "focused", void 0);
    __decorate([
        Input()
    ], NgbDatepickerDayView.prototype, "selected", void 0);
    NgbDatepickerDayView = __decorate([
        Component({
            selector: '[ngbDatepickerDayView]',
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: {
                'class': 'btn-light',
                '[class.bg-primary]': 'selected',
                '[class.text-white]': 'selected',
                '[class.text-muted]': 'isMuted()',
                '[class.outside]': 'isMuted()',
                '[class.active]': 'focused'
            },
            template: "{{ i18n.getDayNumerals(date) }}",
            styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
        })
    ], NgbDatepickerDayView);
    return NgbDatepickerDayView;
}());
export { NgbDatepickerDayView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQWlCcEQ7SUFPRSw4QkFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLHNDQUFPLEdBQVAsY0FBWSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRnZFLGlCQUFpQjs7SUFOakM7UUFBUixLQUFLLEVBQUU7OERBQXNCO0lBQ3JCO1FBQVIsS0FBSyxFQUFFO3NEQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7MERBQW1CO0lBQ2xCO1FBQVIsS0FBSyxFQUFFO3lEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTswREFBbUI7SUFMaEIsb0JBQW9CO1FBZmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFFckMsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxXQUFXO2dCQUNwQixvQkFBb0IsRUFBRSxVQUFVO2dCQUNoQyxvQkFBb0IsRUFBRSxVQUFVO2dCQUNoQyxvQkFBb0IsRUFBRSxXQUFXO2dCQUNqQyxpQkFBaUIsRUFBRSxXQUFXO2dCQUM5QixnQkFBZ0IsRUFBRSxTQUFTO2FBQzVCO1lBQ0QsUUFBUSxFQUFFLGlDQUFpQzs7U0FDNUMsQ0FBQztPQUNXLG9CQUFvQixDQVVoQztJQUFELDJCQUFDO0NBQUEsQUFWRCxJQVVDO1NBVlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlfSBmcm9tICcuL25nYi1kYXRlJztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25nYkRhdGVwaWNrZXJEYXlWaWV3XScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZVVybHM6IFsnLi9kYXRlcGlja2VyLWRheS12aWV3LnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdidG4tbGlnaHQnLFxuICAgICdbY2xhc3MuYmctcHJpbWFyeV0nOiAnc2VsZWN0ZWQnLFxuICAgICdbY2xhc3MudGV4dC13aGl0ZV0nOiAnc2VsZWN0ZWQnLFxuICAgICdbY2xhc3MudGV4dC1tdXRlZF0nOiAnaXNNdXRlZCgpJyxcbiAgICAnW2NsYXNzLm91dHNpZGVdJzogJ2lzTXV0ZWQoKScsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2ZvY3VzZWQnXG4gIH0sXG4gIHRlbXBsYXRlOiBge3sgaTE4bi5nZXREYXlOdW1lcmFscyhkYXRlKSB9fWBcbn0pXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlckRheVZpZXcge1xuICBASW5wdXQoKSBjdXJyZW50TW9udGg6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0ZTogTmdiRGF0ZTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvY3VzZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4bikge31cblxuICBpc011dGVkKCkgeyByZXR1cm4gIXRoaXMuc2VsZWN0ZWQgJiYgKHRoaXMuZGF0ZS5tb250aCAhPT0gdGhpcy5jdXJyZW50TW9udGggfHwgdGhpcy5kaXNhYmxlZCk7IH1cbn1cbiJdfQ==