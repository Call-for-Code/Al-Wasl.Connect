import * as tslib_1 from "tslib";
import { Directive, ElementRef, NgModule, } from '@angular/core';
var ToastContainerDirective = /** @class */ (function () {
    function ToastContainerDirective(el) {
        this.el = el;
    }
    ToastContainerDirective.prototype.getContainerElement = function () {
        return this.el.nativeElement;
    };
    ToastContainerDirective = tslib_1.__decorate([
        Directive({
            selector: '[toastContainer]',
            exportAs: 'toastContainer',
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], ToastContainerDirective);
    return ToastContainerDirective;
}());
export { ToastContainerDirective };
var ToastContainerModule = /** @class */ (function () {
    function ToastContainerModule() {
    }
    ToastContainerModule = tslib_1.__decorate([
        NgModule({
            declarations: [ToastContainerDirective],
            exports: [ToastContainerDirective],
        })
    ], ToastContainerModule);
    return ToastContainerModule;
}());
export { ToastContainerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRvYXN0ci8iLCJzb3VyY2VzIjpbInRvYXN0ci90b2FzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQU12QjtJQUNFLGlDQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFJLENBQUM7SUFDdkMscURBQW1CLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUMvQixDQUFDO0lBSlUsdUJBQXVCO1FBSm5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO2lEQUV3QixVQUFVO09BRHZCLHVCQUF1QixDQUtuQztJQUFELDhCQUFDO0NBQUEsQUFMRCxJQUtDO1NBTFksdUJBQXVCO0FBV3BDO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixvQkFBb0I7UUFKaEMsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDbkMsQ0FBQztPQUNXLG9CQUFvQixDQUFHO0lBQUQsMkJBQUM7Q0FBQSxBQUFwQyxJQUFvQztTQUF2QixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RvYXN0Q29udGFpbmVyXScsXG4gIGV4cG9ydEFzOiAndG9hc3RDb250YWluZXInLFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbnRhaW5lckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHsgfVxuICBnZXRDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1RvYXN0Q29udGFpbmVyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1RvYXN0Q29udGFpbmVyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb250YWluZXJNb2R1bGUge31cbiJdfQ==