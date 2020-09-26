import { Injector, TemplateRef, ViewRef, ViewContainerRef, Renderer2, ComponentRef, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
export declare class ContentRef {
    nodes: any[];
    viewRef?: ViewRef;
    componentRef?: ComponentRef<any>;
    constructor(nodes: any[], viewRef?: ViewRef, componentRef?: ComponentRef<any>);
}
export declare class PopupService<T> {
    private _type;
    private _injector;
    private _viewContainerRef;
    private _renderer;
    private _componentFactoryResolver;
    private _applicationRef;
    private _windowRef;
    private _contentRef;
    constructor(_type: any, _injector: Injector, _viewContainerRef: ViewContainerRef, _renderer: Renderer2, _componentFactoryResolver: ComponentFactoryResolver, _applicationRef: ApplicationRef);
    open(content?: string | TemplateRef<any>, context?: any): ComponentRef<T>;
    close(): void;
    private _getContentRef;
}
