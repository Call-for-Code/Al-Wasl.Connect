import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NgbModal } from './modal';
import { NgbModalBackdrop } from './modal-backdrop';
import { NgbModalWindow } from './modal-window';
export { NgbModal } from './modal';
export { NgbModalConfig } from './modal-config';
export { NgbModalRef, NgbActiveModal } from './modal-ref';
export { ModalDismissReasons } from './modal-dismiss-reasons';
var NgbModalModule = /** @class */ (function () {
    function NgbModalModule() {
    }
    NgbModalModule = __decorate([
        NgModule({
            declarations: [NgbModalBackdrop, NgbModalWindow],
            entryComponents: [NgbModalBackdrop, NgbModalWindow],
            providers: [NgbModal]
        })
    ], NgbModalModule);
    return NgbModalModule;
}());
export { NgbModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJtb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUMsY0FBYyxFQUFrQixNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxXQUFXLEVBQUUsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBTzVEO0lBQUE7SUFDQSxDQUFDO0lBRFksY0FBYztRQUwxQixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7WUFDaEQsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO1lBQ25ELFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUN0QixDQUFDO09BQ1csY0FBYyxDQUMxQjtJQUFELHFCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge05nYk1vZGFsfSBmcm9tICcuL21vZGFsJztcbmltcG9ydCB7TmdiTW9kYWxCYWNrZHJvcH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQge05nYk1vZGFsV2luZG93fSBmcm9tICcuL21vZGFsLXdpbmRvdyc7XG5cbmV4cG9ydCB7TmdiTW9kYWx9IGZyb20gJy4vbW9kYWwnO1xuZXhwb3J0IHtOZ2JNb2RhbENvbmZpZywgTmdiTW9kYWxPcHRpb25zfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5leHBvcnQge05nYk1vZGFsUmVmLCBOZ2JBY3RpdmVNb2RhbH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuZXhwb3J0IHtNb2RhbERpc21pc3NSZWFzb25zfSBmcm9tICcuL21vZGFsLWRpc21pc3MtcmVhc29ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nYk1vZGFsQmFja2Ryb3AsIE5nYk1vZGFsV2luZG93XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiTW9kYWxCYWNrZHJvcCwgTmdiTW9kYWxXaW5kb3ddLFxuICBwcm92aWRlcnM6IFtOZ2JNb2RhbF1cbn0pXG5leHBvcnQgY2xhc3MgTmdiTW9kYWxNb2R1bGUge1xufVxuIl19