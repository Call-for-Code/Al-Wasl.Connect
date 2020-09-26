import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbDatepickerI18n } from './datepicker-i18n';
let NgbDatepickerDayView = class NgbDatepickerDayView {
    constructor(i18n) {
        this.i18n = i18n;
    }
    isMuted() { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); }
};
NgbDatepickerDayView.ctorParameters = () => [
    { type: NgbDatepickerI18n }
];
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
        template: `{{ i18n.getDayNumerals(date) }}`,
        styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:0 0}[ngbDatepickerDayView].outside{opacity:.5}"]
    })
], NgbDatepickerDayView);
export { NgbDatepickerDayView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQWlCcEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFPL0IsWUFBbUIsSUFBdUI7UUFBdkIsU0FBSSxHQUFKLElBQUksQ0FBbUI7SUFBRyxDQUFDO0lBRTlDLE9BQU8sS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRyxDQUFBOztZQUgwQixpQkFBaUI7O0FBTmpDO0lBQVIsS0FBSyxFQUFFOzBEQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTtrREFBZTtBQUNkO0lBQVIsS0FBSyxFQUFFO3NEQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtxREFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7c0RBQW1CO0FBTGhCLG9CQUFvQjtJQWZoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1FBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBRXJDLElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLG9CQUFvQixFQUFFLFVBQVU7WUFDaEMsb0JBQW9CLEVBQUUsVUFBVTtZQUNoQyxvQkFBb0IsRUFBRSxXQUFXO1lBQ2pDLGlCQUFpQixFQUFFLFdBQVc7WUFDOUIsZ0JBQWdCLEVBQUUsU0FBUztTQUM1QjtRQUNELFFBQVEsRUFBRSxpQ0FBaUM7O0tBQzVDLENBQUM7R0FDVyxvQkFBb0IsQ0FVaEM7U0FWWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VySTE4bn0gZnJvbSAnLi9kYXRlcGlja2VyLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbmdiRGF0ZXBpY2tlckRheVZpZXddJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXItZGF5LXZpZXcuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ2J0bi1saWdodCcsXG4gICAgJ1tjbGFzcy5iZy1wcmltYXJ5XSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LXdoaXRlXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy50ZXh0LW11dGVkXSc6ICdpc011dGVkKCknLFxuICAgICdbY2xhc3Mub3V0c2lkZV0nOiAnaXNNdXRlZCgpJyxcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnZm9jdXNlZCdcbiAgfSxcbiAgdGVtcGxhdGU6IGB7eyBpMThuLmdldERheU51bWVyYWxzKGRhdGUpIH19YFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyRGF5VmlldyB7XG4gIEBJbnB1dCgpIGN1cnJlbnRNb250aDogbnVtYmVyO1xuICBASW5wdXQoKSBkYXRlOiBOZ2JEYXRlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9jdXNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGkxOG46IE5nYkRhdGVwaWNrZXJJMThuKSB7fVxuXG4gIGlzTXV0ZWQoKSB7IHJldHVybiAhdGhpcy5zZWxlY3RlZCAmJiAodGhpcy5kYXRlLm1vbnRoICE9PSB0aGlzLmN1cnJlbnRNb250aCB8fCB0aGlzLmRpc2FibGVkKTsgfVxufVxuIl19