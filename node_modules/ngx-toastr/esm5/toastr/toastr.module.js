import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Toast } from './toast.component';
import { DefaultNoComponentGlobalConfig, TOAST_CONFIG, } from './toastr-config';
export var DefaultGlobalConfig = tslib_1.__assign({}, DefaultNoComponentGlobalConfig, { toastComponent: Toast });
var ToastrModule = /** @class */ (function () {
    function ToastrModule() {
    }
    ToastrModule_1 = ToastrModule;
    ToastrModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastrModule_1,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    var ToastrModule_1;
    ToastrModule = ToastrModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [Toast],
            exports: [Toast],
            entryComponents: [Toast],
        })
    ], ToastrModule);
    return ToastrModule;
}());
export { ToastrModule };
var ToastrComponentlessModule = /** @class */ (function () {
    function ToastrComponentlessModule() {
    }
    ToastrComponentlessModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoComponentGlobalConfig,
                        config: config,
                    },
                },
            ],
        };
    };
    ToastrComponentlessModule = tslib_1.__decorate([
        NgModule({
            imports: [CommonModule],
        })
    ], ToastrComponentlessModule);
    return ToastrComponentlessModule;
}());
export { ToastrComponentlessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdHIvIiwic291cmNlcyI6WyJ0b2FzdHIvdG9hc3RyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsOEJBQThCLEVBRTlCLFlBQVksR0FDYixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE1BQU0sQ0FBQyxJQUFNLG1CQUFtQix3QkFDM0IsOEJBQThCLElBQ2pDLGNBQWMsRUFBRSxLQUFLLEdBQ3RCLENBQUM7QUFRRjtJQUFBO0lBZUEsQ0FBQztxQkFmWSxZQUFZO0lBQ2hCLG9CQUFPLEdBQWQsVUFBZSxNQUFrQztRQUFsQyx1QkFBQSxFQUFBLFdBQWtDO1FBQy9DLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRTt3QkFDUixPQUFPLEVBQUUsbUJBQW1CO3dCQUM1QixNQUFNLFFBQUE7cUJBQ1A7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztJQWRVLFlBQVk7UUFOeEIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNyQixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3pCLENBQUM7T0FDVyxZQUFZLENBZXhCO0lBQUQsbUJBQUM7Q0FBQSxBQWZELElBZUM7U0FmWSxZQUFZO0FBb0J6QjtJQUFBO0lBZUEsQ0FBQztJQWRRLGlDQUFPLEdBQWQsVUFBZSxNQUFrQztRQUFsQyx1QkFBQSxFQUFBLFdBQWtDO1FBQy9DLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRTt3QkFDUixPQUFPLEVBQUUsOEJBQThCO3dCQUN2QyxNQUFNLFFBQUE7cUJBQ1A7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBZFUseUJBQXlCO1FBSHJDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN4QixDQUFDO09BQ1cseUJBQXlCLENBZXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQWZELElBZUM7U0FmWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBEZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gIEdsb2JhbENvbmZpZyxcbiAgVE9BU1RfQ09ORklHLFxufSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdEdsb2JhbENvbmZpZzogR2xvYmFsQ29uZmlnID0ge1xuICAuLi5EZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gIHRvYXN0Q29tcG9uZW50OiBUb2FzdCxcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdF0sXG4gIGV4cG9ydHM6IFtUb2FzdF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0XSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYXJ0aWFsPEdsb2JhbENvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUT0FTVF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IERlZmF1bHRHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyQ29tcG9uZW50bGVzc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0ck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVE9BU1RfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBEZWZhdWx0Tm9Db21wb25lbnRHbG9iYWxDb25maWcsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19