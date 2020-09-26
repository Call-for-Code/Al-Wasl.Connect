import { __decorate } from "tslib";
import { Injectable, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalOptions, NgbModalConfig } from './modal-config';
import { NgbModalStack } from './modal-stack';
import * as i0 from "@angular/core";
import * as i1 from "./modal-stack";
import * as i2 from "./modal-config";
/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
var NgbModal = /** @class */ (function () {
    function NgbModal(_moduleCFR, _injector, _modalStack, _config) {
        this._moduleCFR = _moduleCFR;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this._config = _config;
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    NgbModal.prototype.open = function (content, options) {
        if (options === void 0) { options = {}; }
        var combinedOptions = Object.assign({}, this._config, options);
        return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    };
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    NgbModal.prototype.dismissAll = function (reason) { this._modalStack.dismissAll(reason); };
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    NgbModal.prototype.hasOpenModals = function () { return this._modalStack.hasOpenModals(); };
    NgbModal.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: NgbModalStack },
        { type: NgbModalConfig }
    ]; };
    NgbModal.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NgbModalStack), i0.ɵɵinject(i2.NgbModalConfig)); }, token: NgbModal, providedIn: "root" });
    NgbModal = __decorate([
        Injectable({ providedIn: 'root' })
    ], NgbModal);
    return NgbModal;
}());
export { NgbModal };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFFNUM7Ozs7O0dBS0c7QUFFSDtJQUNFLGtCQUNZLFVBQW9DLEVBQVUsU0FBbUIsRUFBVSxXQUEwQixFQUNyRyxPQUF1QjtRQUR2QixlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtRQUNyRyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFFdkM7Ozs7Ozs7O09BUUc7SUFDSCx1QkFBSSxHQUFKLFVBQUssT0FBWSxFQUFFLE9BQTZCO1FBQTdCLHdCQUFBLEVBQUEsWUFBNkI7UUFDOUMsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw2QkFBVSxHQUFWLFVBQVcsTUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRTs7OztPQUlHO0lBQ0gsZ0NBQWEsR0FBYixjQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOztnQkE3QjdDLHdCQUF3QjtnQkFBcUIsUUFBUTtnQkFBdUIsYUFBYTtnQkFDNUYsY0FBYzs7O0lBSHhCLFFBQVE7UUFEcEIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO09BQ3BCLFFBQVEsQ0FnQ3BCO21CQTdDRDtDQTZDQyxBQWhDRCxJQWdDQztTQWhDWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOZ2JNb2RhbE9wdGlvbnMsIE5nYk1vZGFsQ29uZmlnfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQge05nYk1vZGFsUmVmfSBmcm9tICcuL21vZGFsLXJlZic7XG5pbXBvcnQge05nYk1vZGFsU3RhY2t9IGZyb20gJy4vbW9kYWwtc3RhY2snO1xuXG4vKipcbiAqIEEgc2VydmljZSBmb3Igb3BlbmluZyBtb2RhbCB3aW5kb3dzLlxuICpcbiAqIENyZWF0aW5nIGEgbW9kYWwgaXMgc3RyYWlnaHRmb3J3YXJkOiBjcmVhdGUgYSBjb21wb25lbnQgb3IgYSB0ZW1wbGF0ZSBhbmQgcGFzcyBpdCBhcyBhbiBhcmd1bWVudCB0b1xuICogdGhlIGAub3BlbigpYCBtZXRob2QuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9tb2R1bGVDRlI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9tb2RhbFN0YWNrOiBOZ2JNb2RhbFN0YWNrLFxuICAgICAgcHJpdmF0ZSBfY29uZmlnOiBOZ2JNb2RhbENvbmZpZykge31cblxuICAvKipcbiAgICogT3BlbnMgYSBuZXcgbW9kYWwgd2luZG93IHdpdGggdGhlIHNwZWNpZmllZCBjb250ZW50IGFuZCBzdXBwbGllZCBvcHRpb25zLlxuICAgKlxuICAgKiBDb250ZW50IGNhbiBiZSBwcm92aWRlZCBhcyBhIGBUZW1wbGF0ZVJlZmAgb3IgYSBjb21wb25lbnQgdHlwZS4gSWYgeW91IHBhc3MgYSBjb21wb25lbnQgdHlwZSBhcyBjb250ZW50LFxuICAgKiB0aGVuIGluc3RhbmNlcyBvZiB0aG9zZSBjb21wb25lbnRzIGNhbiBiZSBpbmplY3RlZCB3aXRoIGFuIGluc3RhbmNlIG9mIHRoZSBgTmdiQWN0aXZlTW9kYWxgIGNsYXNzLiBZb3UgY2FuIHRoZW5cbiAgICogdXNlIGBOZ2JBY3RpdmVNb2RhbGAgbWV0aG9kcyB0byBjbG9zZSAvIGRpc21pc3MgbW9kYWxzIGZyb20gXCJpbnNpZGVcIiBvZiB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQWxzbyBzZWUgdGhlIFtgTmdiTW9kYWxPcHRpb25zYF0oIy9jb21wb25lbnRzL21vZGFsL2FwaSNOZ2JNb2RhbE9wdGlvbnMpIGZvciB0aGUgbGlzdCBvZiBzdXBwb3J0ZWQgb3B0aW9ucy5cbiAgICovXG4gIG9wZW4oY29udGVudDogYW55LCBvcHRpb25zOiBOZ2JNb2RhbE9wdGlvbnMgPSB7fSk6IE5nYk1vZGFsUmVmIHtcbiAgICBjb25zdCBjb21iaW5lZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9jb25maWcsIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLl9tb2RhbFN0YWNrLm9wZW4odGhpcy5fbW9kdWxlQ0ZSLCB0aGlzLl9pbmplY3RvciwgY29udGVudCwgY29tYmluZWRPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNtaXNzZXMgYWxsIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9kYWwgd2luZG93cyB3aXRoIHRoZSBzdXBwbGllZCByZWFzb24uXG4gICAqXG4gICAqIEBzaW5jZSAzLjEuMFxuICAgKi9cbiAgZGlzbWlzc0FsbChyZWFzb24/OiBhbnkpIHsgdGhpcy5fbW9kYWxTdGFjay5kaXNtaXNzQWxsKHJlYXNvbik7IH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoZXJlIGFyZSBjdXJyZW50bHkgYW55IG9wZW4gbW9kYWwgd2luZG93cyBpbiB0aGUgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgaGFzT3Blbk1vZGFscygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21vZGFsU3RhY2suaGFzT3Blbk1vZGFscygpOyB9XG59XG4iXX0=