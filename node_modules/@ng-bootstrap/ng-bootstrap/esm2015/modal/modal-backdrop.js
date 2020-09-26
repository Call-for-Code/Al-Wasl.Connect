import { __decorate } from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let NgbModalBackdrop = class NgbModalBackdrop {
};
__decorate([
    Input()
], NgbModalBackdrop.prototype, "backdropClass", void 0);
NgbModalBackdrop = __decorate([
    Component({
        selector: 'ngb-modal-backdrop',
        encapsulation: ViewEncapsulation.None,
        template: '',
        host: { '[class]': '"modal-backdrop fade show" + (backdropClass ? " " + backdropClass : "")', 'style': 'z-index: 1050' }
    })
], NgbModalBackdrop);
export { NgbModalBackdrop };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbIm1vZGFsL21vZGFsLWJhY2tkcm9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQVNsRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUU1QixDQUFBO0FBRFU7SUFBUixLQUFLLEVBQUU7dURBQXVCO0FBRHBCLGdCQUFnQjtJQVA1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUNBLEVBQUMsU0FBUyxFQUFFLHlFQUF5RSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUM7S0FDckgsQ0FBQztHQUNXLGdCQUFnQixDQUU1QjtTQUZZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItbW9kYWwtYmFja2Ryb3AnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogJycsXG4gIGhvc3Q6XG4gICAgICB7J1tjbGFzc10nOiAnXCJtb2RhbC1iYWNrZHJvcCBmYWRlIHNob3dcIiArIChiYWNrZHJvcENsYXNzID8gXCIgXCIgKyBiYWNrZHJvcENsYXNzIDogXCJcIiknLCAnc3R5bGUnOiAnei1pbmRleDogMTA1MCd9XG59KVxuZXhwb3J0IGNsYXNzIE5nYk1vZGFsQmFja2Ryb3Age1xuICBASW5wdXQoKSBiYWNrZHJvcENsYXNzOiBzdHJpbmc7XG59XG4iXX0=