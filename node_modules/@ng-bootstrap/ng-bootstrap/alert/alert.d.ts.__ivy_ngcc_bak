import { EventEmitter, Renderer2, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbAlertConfig } from './alert-config';
/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
export declare class NgbAlert implements OnInit, OnChanges {
    private _renderer;
    private _element;
    /**
     * If `true`, alert can be dismissed by the user.
     *
     * The close button (×) will be displayed and you can be notified
     * of the event with the `(close)` output.
     */
    dismissible: boolean;
    /**
     * Type of the alert.
     *
     * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
     * `'secondary'`, `'light'` and `'dark'`.
     */
    type: string;
    /**
     * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
     */
    close: EventEmitter<void>;
    constructor(config: NgbAlertConfig, _renderer: Renderer2, _element: ElementRef);
    closeHandler(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
