import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbHighlight } from './highlight';
import { NgbTypeaheadWindow } from './typeahead-window';
import { NgbTypeahead } from './typeahead';
export { NgbHighlight } from './highlight';
export { NgbTypeaheadWindow } from './typeahead-window';
export { NgbTypeaheadConfig } from './typeahead-config';
export { NgbTypeahead } from './typeahead';
var NgbTypeaheadModule = /** @class */ (function () {
    function NgbTypeaheadModule() {
    }
    NgbTypeaheadModule = __decorate([
        NgModule({
            declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
            exports: [NgbTypeahead, NgbHighlight],
            imports: [CommonModule],
            entryComponents: [NgbTypeaheadWindow]
        })
    ], NgbTypeaheadModule);
    return NgbTypeaheadModule;
}());
export { NgbTypeaheadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidHlwZWFoZWFkL3R5cGVhaGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQThCLE1BQU0sYUFBYSxDQUFDO0FBUXRFO0lBQUE7SUFDQSxDQUFDO0lBRFksa0JBQWtCO1FBTjlCLFFBQVEsQ0FBQztZQUNSLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUM7WUFDOUQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQztZQUNyQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsZUFBZSxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGtCQUFrQixDQUM5QjtJQUFELHlCQUFDO0NBQUEsQUFERCxJQUNDO1NBRFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmltcG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWR9IGZyb20gJy4vdHlwZWFoZWFkJztcblxuZXhwb3J0IHtOZ2JIaWdobGlnaHR9IGZyb20gJy4vaGlnaGxpZ2h0JztcbmV4cG9ydCB7TmdiVHlwZWFoZWFkV2luZG93fSBmcm9tICcuL3R5cGVhaGVhZC13aW5kb3cnO1xuZXhwb3J0IHtOZ2JUeXBlYWhlYWRDb25maWd9IGZyb20gJy4vdHlwZWFoZWFkLWNvbmZpZyc7XG5leHBvcnQge05nYlR5cGVhaGVhZCwgTmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50fSBmcm9tICcuL3R5cGVhaGVhZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW05nYlR5cGVhaGVhZCwgTmdiSGlnaGxpZ2h0LCBOZ2JUeXBlYWhlYWRXaW5kb3ddLFxuICBleHBvcnRzOiBbTmdiVHlwZWFoZWFkLCBOZ2JIaWdobGlnaHRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTmdiVHlwZWFoZWFkV2luZG93XVxufSlcbmV4cG9ydCBjbGFzcyBOZ2JUeXBlYWhlYWRNb2R1bGUge1xufVxuIl19