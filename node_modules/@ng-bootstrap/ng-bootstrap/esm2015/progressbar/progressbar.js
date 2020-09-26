import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
let NgbProgressbar = class NgbProgressbar {
    constructor(config) {
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        this.max = config.max;
        this.animated = config.animated;
        this.striped = config.striped;
        this.textType = config.textType;
        this.type = config.type;
        this.showValue = config.showValue;
        this.height = config.height;
    }
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() { return this._max; }
    getValue() { return getValueInRange(this.value, this.max); }
    getPercentValue() { return 100 * this.getValue() / this.max; }
};
NgbProgressbar.ctorParameters = () => [
    { type: NgbProgressbarConfig }
];
__decorate([
    Input()
], NgbProgressbar.prototype, "max", null);
__decorate([
    Input()
], NgbProgressbar.prototype, "animated", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "striped", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "showValue", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "textType", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "type", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "value", void 0);
__decorate([
    Input()
], NgbProgressbar.prototype, "height", void 0);
NgbProgressbar = __decorate([
    Component({
        selector: 'ngb-progressbar',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        template: `
    <div class="progress" [style.height]="height">
      <div class="progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}
      {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}"
      role="progressbar" [style.width.%]="getPercentValue()"
      [attr.aria-valuenow]="getValue()" aria-valuemin="0" [attr.aria-valuemax]="max">
        <span *ngIf="showValue" i18n="@@ngb.progressbar.value">{{getPercentValue()}}%</span><ng-content></ng-content>
      </div>
    </div>
  `
    })
], NgbProgressbar);
export { NgbProgressbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDs7R0FFRztBQWdCSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBZ0V6QixZQUFZLE1BQTRCO1FBZHhDOzs7O1dBSUc7UUFDTSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBVWpCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDO0lBckVEOzs7O09BSUc7SUFFSCxJQUFJLEdBQUcsQ0FBQyxHQUFXO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVELElBQUksR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUE2RHZDLFFBQVEsS0FBSyxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsZUFBZSxLQUFLLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUMvRCxDQUFBOztZQWJxQixvQkFBb0I7O0FBdkR4QztJQURDLEtBQUssRUFBRTt5Q0FHUDtBQVNRO0lBQVIsS0FBSyxFQUFFO2dEQUFtQjtBQUtsQjtJQUFSLEtBQUssRUFBRTsrQ0FBa0I7QUFLakI7SUFBUixLQUFLLEVBQUU7aURBQW9CO0FBVW5CO0lBQVIsS0FBSyxFQUFFO2dEQUFrQjtBQVFqQjtJQUFSLEtBQUssRUFBRTs0Q0FBYztBQU9iO0lBQVIsS0FBSyxFQUFFOzZDQUFXO0FBT1Y7SUFBUixLQUFLLEVBQUU7OENBQWdCO0FBOURiLGNBQWM7SUFmMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO0tBQ0YsQ0FBQztHQUNXLGNBQWMsQ0E2RTFCO1NBN0VZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2dldFZhbHVlSW5SYW5nZSwgaXNOdW1iZXJ9IGZyb20gJy4uL3V0aWwvdXRpbCc7XG5pbXBvcnQge05nYlByb2dyZXNzYmFyQ29uZmlnfSBmcm9tICcuL3Byb2dyZXNzYmFyLWNvbmZpZyc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBwcm92aWRlcyBmZWVkYmFjayBvbiB0aGUgcHJvZ3Jlc3Mgb2YgYSB3b3JrZmxvdyBvciBhbiBhY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1wcm9ncmVzc2JhcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFye3t0eXBlID8gJyBiZy0nICsgdHlwZSA6ICcnfX17e3RleHRUeXBlID8gJyB0ZXh0LScgKyB0ZXh0VHlwZSA6ICcnfX1cbiAgICAgIHt7YW5pbWF0ZWQgPyAnIHByb2dyZXNzLWJhci1hbmltYXRlZCcgOiAnJ319e3tzdHJpcGVkID8gJyBwcm9ncmVzcy1iYXItc3RyaXBlZCcgOiAnJ319XCJcbiAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtzdHlsZS53aWR0aC4lXT1cImdldFBlcmNlbnRWYWx1ZSgpXCJcbiAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VmFsdWUoKVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJzaG93VmFsdWVcIiBpMThuPVwiQEBuZ2IucHJvZ3Jlc3NiYXIudmFsdWVcIj57e2dldFBlcmNlbnRWYWx1ZSgpfX0lPC9zcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE5nYlByb2dyZXNzYmFyIHtcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbWFsIHZhbHVlIHRvIGJlIGRpc3BsYXllZCBpbiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBTaG91bGQgYmUgYSBwb3NpdGl2ZSBudW1iZXIuIFdpbGwgZGVmYXVsdCB0byAxMDAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG1heChtYXg6IG51bWJlcikge1xuICAgIHRoaXMuX21heCA9ICFpc051bWJlcihtYXgpIHx8IG1heCA8PSAwID8gMTAwIDogbWF4O1xuICB9XG5cbiAgZ2V0IG1heCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4OyB9XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIHN0cmlwZXMgb24gdGhlIHByb2dyZXNzIGJhciBhcmUgYW5pbWF0ZWQuXG4gICAqXG4gICAqIFRha2VzIGVmZmVjdCBvbmx5IGZvciBicm93c2VycyBzdXBwb3J0aW5nIENTUzMgYW5pbWF0aW9ucywgYW5kIGlmIGBzdHJpcGVkYCBpcyBgdHJ1ZWAuXG4gICAqL1xuICBASW5wdXQoKSBhbmltYXRlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgcHJvZ3Jlc3MgYmFycyB3aWxsIGJlIGRpc3BsYXllZCBhcyBzdHJpcGVkLlxuICAgKi9cbiAgQElucHV0KCkgc3RyaXBlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSWYgYHRydWVgLCB0aGUgY3VycmVudCBwZXJjZW50YWdlIHdpbGwgYmUgc2hvd24gaW4gdGhlIGB4eCVgIGZvcm1hdC5cbiAgICovXG4gIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogT3B0aW9uYWwgdGV4dCB2YXJpYW50IHR5cGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU3VwcG9ydHMgdHlwZXMgYmFzZWQgb24gQm9vdHN0cmFwIGJhY2tncm91bmQgY29sb3IgdmFyaWFudHMsIGxpa2U6XG4gICAqICBgXCJzdWNjZXNzXCJgLCBgXCJpbmZvXCJgLCBgXCJ3YXJuaW5nXCJgLCBgXCJkYW5nZXJcImAsIGBcInByaW1hcnlcImAsIGBcInNlY29uZGFyeVwiYCwgYFwiZGFya1wiYCBhbmQgc28gb24uXG4gICAqXG4gICAqIEBzaW5jZSA1LjIuMFxuICAgKi9cbiAgQElucHV0KCkgdGV4dFR5cGU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU3VwcG9ydHMgdHlwZXMgYmFzZWQgb24gQm9vdHN0cmFwIGJhY2tncm91bmQgY29sb3IgdmFyaWFudHMsIGxpa2U6XG4gICAqICBgXCJzdWNjZXNzXCJgLCBgXCJpbmZvXCJgLCBgXCJ3YXJuaW5nXCJgLCBgXCJkYW5nZXJcImAsIGBcInByaW1hcnlcImAsIGBcInNlY29uZGFyeVwiYCwgYFwiZGFya1wiYCBhbmQgc28gb24uXG4gICAqL1xuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHZhbHVlIGZvciB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBTaG91bGQgYmUgaW4gdGhlIGBbMCwgbWF4XWAgcmFuZ2UuXG4gICAqL1xuICBASW5wdXQoKSB2YWx1ZSA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogQWNjZXB0cyBhbnkgdmFsaWQgQ1NTIGhlaWdodCB2YWx1ZXMsIGV4LiBgXCIycmVtXCJgXG4gICAqL1xuICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlByb2dyZXNzYmFyQ29uZmlnKSB7XG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xuICAgIHRoaXMuYW5pbWF0ZWQgPSBjb25maWcuYW5pbWF0ZWQ7XG4gICAgdGhpcy5zdHJpcGVkID0gY29uZmlnLnN0cmlwZWQ7XG4gICAgdGhpcy50ZXh0VHlwZSA9IGNvbmZpZy50ZXh0VHlwZTtcbiAgICB0aGlzLnR5cGUgPSBjb25maWcudHlwZTtcbiAgICB0aGlzLnNob3dWYWx1ZSA9IGNvbmZpZy5zaG93VmFsdWU7XG4gICAgdGhpcy5oZWlnaHQgPSBjb25maWcuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiBnZXRWYWx1ZUluUmFuZ2UodGhpcy52YWx1ZSwgdGhpcy5tYXgpOyB9XG5cbiAgZ2V0UGVyY2VudFZhbHVlKCkgeyByZXR1cm4gMTAwICogdGhpcy5nZXRWYWx1ZSgpIC8gdGhpcy5tYXg7IH1cbn1cbiJdfQ==