import { AfterContentInit, EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbToastConfig } from './toast-config';
/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
export declare class NgbToastHeader {
}
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
export declare class NgbToast implements AfterContentInit, OnChanges {
    ariaLive: string;
    private _timeoutID;
    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     */
    delay: number;
    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     */
    autohide: boolean;
    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     */
    header: string;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     */
    contentHeaderTpl: TemplateRef<any> | null;
    /**
     * An event fired immediately when toast's `hide()` method has been called.
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross (&times)
     *
     * Additionally this output is purely informative. The toast won't disappear. It's up to the user to take care of
     * that.
     */
    hideOutput: EventEmitter<void>;
    constructor(ariaLive: string, config: NgbToastConfig);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    hide(): void;
    private _init;
    private _clearTimeout;
}
