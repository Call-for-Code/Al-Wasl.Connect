import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { getValueInRange, isNumber } from '../util/util';
import { NgbProgressbarConfig } from './progressbar-config';
/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
var NgbProgressbar = /** @class */ (function () {
    function NgbProgressbar(config) {
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
    Object.defineProperty(NgbProgressbar.prototype, "max", {
        get: function () { return this._max; },
        /**
         * The maximal value to be displayed in the progress bar.
         *
         * Should be a positive number. Will default to 100 otherwise.
         */
        set: function (max) {
            this._max = !isNumber(max) || max <= 0 ? 100 : max;
        },
        enumerable: true,
        configurable: true
    });
    NgbProgressbar.prototype.getValue = function () { return getValueInRange(this.value, this.max); };
    NgbProgressbar.prototype.getPercentValue = function () { return 100 * this.getValue() / this.max; };
    NgbProgressbar.ctorParameters = function () { return [
        { type: NgbProgressbarConfig }
    ]; };
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
            template: "\n    <div class=\"progress\" [style.height]=\"height\">\n      <div class=\"progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}\n      {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}\"\n      role=\"progressbar\" [style.width.%]=\"getPercentValue()\"\n      [attr.aria-valuenow]=\"getValue()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\">\n        <span *ngIf=\"showValue\" i18n=\"@@ngb.progressbar.value\">{{getPercentValue()}}%</span><ng-content></ng-content>\n      </div>\n    </div>\n  "
        })
    ], NgbProgressbar);
    return NgbProgressbar;
}());
export { NgbProgressbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbInByb2dyZXNzYmFyL3Byb2dyZXNzYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRixPQUFPLEVBQUMsZUFBZSxFQUFFLFFBQVEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUxRDs7R0FFRztBQWdCSDtJQWdFRSx3QkFBWSxNQUE0QjtRQWR4Qzs7OztXQUlHO1FBQ00sVUFBSyxHQUFHLENBQUMsQ0FBQztRQVVqQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQS9ERCxzQkFBSSwrQkFBRzthQUlQLGNBQW9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFWdkM7Ozs7V0FJRzthQUVILFVBQVEsR0FBVztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3JELENBQUM7OztPQUFBO0lBK0RELGlDQUFRLEdBQVIsY0FBYSxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsd0NBQWUsR0FBZixjQUFvQixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQVoxQyxvQkFBb0I7O0lBdkR4QztRQURDLEtBQUssRUFBRTs2Q0FHUDtJQVNRO1FBQVIsS0FBSyxFQUFFO29EQUFtQjtJQUtsQjtRQUFSLEtBQUssRUFBRTttREFBa0I7SUFLakI7UUFBUixLQUFLLEVBQUU7cURBQW9CO0lBVW5CO1FBQVIsS0FBSyxFQUFFO29EQUFrQjtJQVFqQjtRQUFSLEtBQUssRUFBRTtnREFBYztJQU9iO1FBQVIsS0FBSyxFQUFFO2lEQUFXO0lBT1Y7UUFBUixLQUFLLEVBQUU7a0RBQWdCO0lBOURiLGNBQWM7UUFmMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtZQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxRQUFRLEVBQUUsdWpCQVNUO1NBQ0YsQ0FBQztPQUNXLGNBQWMsQ0E2RTFCO0lBQUQscUJBQUM7Q0FBQSxBQTdFRCxJQTZFQztTQTdFWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtnZXRWYWx1ZUluUmFuZ2UsIGlzTnVtYmVyfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtOZ2JQcm9ncmVzc2JhckNvbmZpZ30gZnJvbSAnLi9wcm9ncmVzc2Jhci1jb25maWcnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgcHJvdmlkZXMgZmVlZGJhY2sgb24gdGhlIHByb2dyZXNzIG9mIGEgd29ya2Zsb3cgb3IgYW4gYWN0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItcHJvZ3Jlc3NiYXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIiBbc3R5bGUuaGVpZ2h0XT1cImhlaWdodFwiPlxuICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhcnt7dHlwZSA/ICcgYmctJyArIHR5cGUgOiAnJ319e3t0ZXh0VHlwZSA/ICcgdGV4dC0nICsgdGV4dFR5cGUgOiAnJ319XG4gICAgICB7e2FuaW1hdGVkID8gJyBwcm9ncmVzcy1iYXItYW5pbWF0ZWQnIDogJyd9fXt7c3RyaXBlZCA/ICcgcHJvZ3Jlc3MtYmFyLXN0cmlwZWQnIDogJyd9fVwiXG4gICAgICByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbc3R5bGUud2lkdGguJV09XCJnZXRQZXJjZW50VmFsdWUoKVwiXG4gICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImdldFZhbHVlKClcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwic2hvd1ZhbHVlXCIgaTE4bj1cIkBAbmdiLnByb2dyZXNzYmFyLnZhbHVlXCI+e3tnZXRQZXJjZW50VmFsdWUoKX19JTwvc3Bhbj48bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBOZ2JQcm9ncmVzc2JhciB7XG4gIHByaXZhdGUgX21heDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW1hbCB2YWx1ZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU2hvdWxkIGJlIGEgcG9zaXRpdmUgbnVtYmVyLiBXaWxsIGRlZmF1bHQgdG8gMTAwIG90aGVyd2lzZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBtYXgobWF4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSAhaXNOdW1iZXIobWF4KSB8fCBtYXggPD0gMCA/IDEwMCA6IG1heDtcbiAgfVxuXG4gIGdldCBtYXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heDsgfVxuXG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHRoZSBzdHJpcGVzIG9uIHRoZSBwcm9ncmVzcyBiYXIgYXJlIGFuaW1hdGVkLlxuICAgKlxuICAgKiBUYWtlcyBlZmZlY3Qgb25seSBmb3IgYnJvd3NlcnMgc3VwcG9ydGluZyBDU1MzIGFuaW1hdGlvbnMsIGFuZCBpZiBgc3RyaXBlZGAgaXMgYHRydWVgLlxuICAgKi9cbiAgQElucHV0KCkgYW5pbWF0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIHByb2dyZXNzIGJhcnMgd2lsbCBiZSBkaXNwbGF5ZWQgYXMgc3RyaXBlZC5cbiAgICovXG4gIEBJbnB1dCgpIHN0cmlwZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgdGhlIGN1cnJlbnQgcGVyY2VudGFnZSB3aWxsIGJlIHNob3duIGluIHRoZSBgeHglYCBmb3JtYXQuXG4gICAqL1xuICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHRleHQgdmFyaWFudCB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuICAgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuICAgKlxuICAgKiBAc2luY2UgNS4yLjBcbiAgICovXG4gIEBJbnB1dCgpIHRleHRUeXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIFN1cHBvcnRzIHR5cGVzIGJhc2VkIG9uIEJvb3RzdHJhcCBiYWNrZ3JvdW5kIGNvbG9yIHZhcmlhbnRzLCBsaWtlOlxuICAgKiAgYFwic3VjY2Vzc1wiYCwgYFwiaW5mb1wiYCwgYFwid2FybmluZ1wiYCwgYFwiZGFuZ2VyXCJgLCBgXCJwcmltYXJ5XCJgLCBgXCJzZWNvbmRhcnlcImAsIGBcImRhcmtcImAgYW5kIHNvIG9uLlxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2YWx1ZSBmb3IgdGhlIHByb2dyZXNzIGJhci5cbiAgICpcbiAgICogU2hvdWxkIGJlIGluIHRoZSBgWzAsIG1heF1gIHJhbmdlLlxuICAgKi9cbiAgQElucHV0KCkgdmFsdWUgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwcm9ncmVzcyBiYXIuXG4gICAqXG4gICAqIEFjY2VwdHMgYW55IHZhbGlkIENTUyBoZWlnaHQgdmFsdWVzLCBleC4gYFwiMnJlbVwiYFxuICAgKi9cbiAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBOZ2JQcm9ncmVzc2JhckNvbmZpZykge1xuICAgIHRoaXMubWF4ID0gY29uZmlnLm1heDtcbiAgICB0aGlzLmFuaW1hdGVkID0gY29uZmlnLmFuaW1hdGVkO1xuICAgIHRoaXMuc3RyaXBlZCA9IGNvbmZpZy5zdHJpcGVkO1xuICAgIHRoaXMudGV4dFR5cGUgPSBjb25maWcudGV4dFR5cGU7XG4gICAgdGhpcy50eXBlID0gY29uZmlnLnR5cGU7XG4gICAgdGhpcy5zaG93VmFsdWUgPSBjb25maWcuc2hvd1ZhbHVlO1xuICAgIHRoaXMuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gZ2V0VmFsdWVJblJhbmdlKHRoaXMudmFsdWUsIHRoaXMubWF4KTsgfVxuXG4gIGdldFBlcmNlbnRWYWx1ZSgpIHsgcmV0dXJuIDEwMCAqIHRoaXMuZ2V0VmFsdWUoKSAvIHRoaXMubWF4OyB9XG59XG4iXX0=