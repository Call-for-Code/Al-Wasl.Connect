import { __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
var noop = function () { };
var ɵ0 = noop;
/**
 * Utility to handle the scrollbar.
 *
 * It allows to compensate the lack of a vertical scrollbar by adding an
 * equivalent padding on the right of the body, and to remove this compensation.
 */
var ScrollBar = /** @class */ (function () {
    function ScrollBar(_document) {
        this._document = _document;
    }
    /**
     * To be called right before a potential vertical scrollbar would be removed:
     *
     * - if there was a scrollbar, adds some compensation padding to the body
     * to keep the same layout as when the scrollbar is there
     * - if there was none, there is nothing to do
     *
     * @return a callback used to revert the compensation (noop if there was none,
     * otherwise a function removing the padding)
     */
    ScrollBar.prototype.compensate = function () {
        var width = this._getWidth();
        return !this._isPresent(width) ? noop : this._adjustBody(width);
    };
    /**
     * Adds a padding of the given width on the right of the body.
     *
     * @return a callback used to revert the padding to its previous value
     */
    ScrollBar.prototype._adjustBody = function (scrollbarWidth) {
        var body = this._document.body;
        var userSetPaddingStyle = body.style.paddingRight;
        var actualPadding = parseFloat(window.getComputedStyle(body)['padding-right']);
        body.style['padding-right'] = actualPadding + scrollbarWidth + "px";
        return function () { return body.style['padding-right'] = userSetPaddingStyle; };
    };
    /**
     * Tells whether a scrollbar is currently present on the body.
     *
     * @return true if scrollbar is present, false otherwise
     */
    ScrollBar.prototype._isPresent = function (scrollbarWidth) {
        var rect = this._document.body.getBoundingClientRect();
        var bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
        var uncertainty = 0.1 * scrollbarWidth;
        return bodyToViewportGap >= scrollbarWidth - uncertainty;
    };
    /**
     * Calculates and returns the width of a scrollbar.
     *
     * @return the width of a scrollbar on this page
     */
    ScrollBar.prototype._getWidth = function () {
        var measurer = this._document.createElement('div');
        measurer.className = 'modal-scrollbar-measure';
        var body = this._document.body;
        body.appendChild(measurer);
        var width = measurer.getBoundingClientRect().width - measurer.clientWidth;
        body.removeChild(measurer);
        return width;
    };
    ScrollBar.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ScrollBar.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(i0.ɵɵinject(i1.DOCUMENT)); }, token: ScrollBar, providedIn: "root" });
    ScrollBar = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(0, Inject(DOCUMENT))
    ], ScrollBar);
    return ScrollBar;
}());
export { ScrollBar };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ1dGlsL3Njcm9sbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7QUFHekMsSUFBTSxJQUFJLEdBQUcsY0FBTyxDQUFDLENBQUM7O0FBU3RCOzs7OztHQUtHO0FBRUg7SUFDRSxtQkFBc0MsU0FBYztRQUFkLGNBQVMsR0FBVCxTQUFTLENBQUs7SUFBRyxDQUFDO0lBRXhEOzs7Ozs7Ozs7T0FTRztJQUNILDhCQUFVLEdBQVY7UUFDRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLCtCQUFXLEdBQW5CLFVBQW9CLGNBQXNCO1FBQ3hDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDcEQsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQU0sYUFBYSxHQUFHLGNBQWMsT0FBSSxDQUFDO1FBQ3BFLE9BQU8sY0FBTSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsbUJBQW1CLEVBQWpELENBQWlELENBQUM7SUFDakUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw4QkFBVSxHQUFsQixVQUFtQixjQUFzQjtRQUN2QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3pELElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLElBQU0sV0FBVyxHQUFHLEdBQUcsR0FBRyxjQUFjLENBQUM7UUFDekMsT0FBTyxpQkFBaUIsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDO0lBQzNELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssNkJBQVMsR0FBakI7UUFDRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxRQUFRLENBQUMsU0FBUyxHQUFHLHlCQUF5QixDQUFDO1FBRS9DLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7UUFDNUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dEQXpEWSxNQUFNLFNBQUMsUUFBUTs7O0lBRGpCLFNBQVM7UUFEckIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO1FBRWxCLFdBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO09BRGxCLFNBQVMsQ0EyRHJCO29CQS9FRDtDQStFQyxBQTNERCxJQTJEQztTQTNEWSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cblxuXG4vKiogVHlwZSBmb3IgdGhlIGNhbGxiYWNrIHVzZWQgdG8gcmV2ZXJ0IHRoZSBzY3JvbGxiYXIgY29tcGVuc2F0aW9uLiAqL1xuZXhwb3J0IHR5cGUgQ29tcGVuc2F0aW9uUmV2ZXJ0ZXIgPSAoKSA9PiB2b2lkO1xuXG5cblxuLyoqXG4gKiBVdGlsaXR5IHRvIGhhbmRsZSB0aGUgc2Nyb2xsYmFyLlxuICpcbiAqIEl0IGFsbG93cyB0byBjb21wZW5zYXRlIHRoZSBsYWNrIG9mIGEgdmVydGljYWwgc2Nyb2xsYmFyIGJ5IGFkZGluZyBhblxuICogZXF1aXZhbGVudCBwYWRkaW5nIG9uIHRoZSByaWdodCBvZiB0aGUgYm9keSwgYW5kIHRvIHJlbW92ZSB0aGlzIGNvbXBlbnNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgU2Nyb2xsQmFyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSkge31cblxuICAvKipcbiAgICogVG8gYmUgY2FsbGVkIHJpZ2h0IGJlZm9yZSBhIHBvdGVudGlhbCB2ZXJ0aWNhbCBzY3JvbGxiYXIgd291bGQgYmUgcmVtb3ZlZDpcbiAgICpcbiAgICogLSBpZiB0aGVyZSB3YXMgYSBzY3JvbGxiYXIsIGFkZHMgc29tZSBjb21wZW5zYXRpb24gcGFkZGluZyB0byB0aGUgYm9keVxuICAgKiB0byBrZWVwIHRoZSBzYW1lIGxheW91dCBhcyB3aGVuIHRoZSBzY3JvbGxiYXIgaXMgdGhlcmVcbiAgICogLSBpZiB0aGVyZSB3YXMgbm9uZSwgdGhlcmUgaXMgbm90aGluZyB0byBkb1xuICAgKlxuICAgKiBAcmV0dXJuIGEgY2FsbGJhY2sgdXNlZCB0byByZXZlcnQgdGhlIGNvbXBlbnNhdGlvbiAobm9vcCBpZiB0aGVyZSB3YXMgbm9uZSxcbiAgICogb3RoZXJ3aXNlIGEgZnVuY3Rpb24gcmVtb3ZpbmcgdGhlIHBhZGRpbmcpXG4gICAqL1xuICBjb21wZW5zYXRlKCk6IENvbXBlbnNhdGlvblJldmVydGVyIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2dldFdpZHRoKCk7XG4gICAgcmV0dXJuICF0aGlzLl9pc1ByZXNlbnQod2lkdGgpID8gbm9vcCA6IHRoaXMuX2FkanVzdEJvZHkod2lkdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBwYWRkaW5nIG9mIHRoZSBnaXZlbiB3aWR0aCBvbiB0aGUgcmlnaHQgb2YgdGhlIGJvZHkuXG4gICAqXG4gICAqIEByZXR1cm4gYSBjYWxsYmFjayB1c2VkIHRvIHJldmVydCB0aGUgcGFkZGluZyB0byBpdHMgcHJldmlvdXMgdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX2FkanVzdEJvZHkoc2Nyb2xsYmFyV2lkdGg6IG51bWJlcik6IENvbXBlbnNhdGlvblJldmVydGVyIHtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB1c2VyU2V0UGFkZGluZ1N0eWxlID0gYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgY29uc3QgYWN0dWFsUGFkZGluZyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlbJ3BhZGRpbmctcmlnaHQnXSk7XG4gICAgYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gYCR7YWN0dWFsUGFkZGluZyArIHNjcm9sbGJhcldpZHRofXB4YDtcbiAgICByZXR1cm4gKCkgPT4gYm9keS5zdHlsZVsncGFkZGluZy1yaWdodCddID0gdXNlclNldFBhZGRpbmdTdHlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB3aGV0aGVyIGEgc2Nyb2xsYmFyIGlzIGN1cnJlbnRseSBwcmVzZW50IG9uIHRoZSBib2R5LlxuICAgKlxuICAgKiBAcmV0dXJuIHRydWUgaWYgc2Nyb2xsYmFyIGlzIHByZXNlbnQsIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgcHJpdmF0ZSBfaXNQcmVzZW50KHNjcm9sbGJhcldpZHRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBib2R5VG9WaWV3cG9ydEdhcCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gKHJlY3QubGVmdCArIHJlY3QucmlnaHQpO1xuICAgIGNvbnN0IHVuY2VydGFpbnR5ID0gMC4xICogc2Nyb2xsYmFyV2lkdGg7XG4gICAgcmV0dXJuIGJvZHlUb1ZpZXdwb3J0R2FwID49IHNjcm9sbGJhcldpZHRoIC0gdW5jZXJ0YWludHk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyB0aGUgd2lkdGggb2YgYSBzY3JvbGxiYXIuXG4gICAqXG4gICAqIEByZXR1cm4gdGhlIHdpZHRoIG9mIGEgc2Nyb2xsYmFyIG9uIHRoaXMgcGFnZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBtZWFzdXJlciA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1lYXN1cmVyLmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSc7XG5cbiAgICBjb25zdCBib2R5ID0gdGhpcy5fZG9jdW1lbnQuYm9keTtcbiAgICBib2R5LmFwcGVuZENoaWxkKG1lYXN1cmVyKTtcbiAgICBjb25zdCB3aWR0aCA9IG1lYXN1cmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gbWVhc3VyZXIuY2xpZW50V2lkdGg7XG4gICAgYm9keS5yZW1vdmVDaGlsZChtZWFzdXJlcik7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cbn1cbiJdfQ==