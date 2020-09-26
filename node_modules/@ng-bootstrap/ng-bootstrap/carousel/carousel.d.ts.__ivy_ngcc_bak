import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, EventEmitter, NgZone, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NgbCarouselConfig } from './carousel-config';
/**
 * A directive that wraps the individual carousel slide.
 */
export declare class NgbSlide {
    tplRef: TemplateRef<any>;
    /**
     * Slide id that must be unique for the entire document.
     *
     * If not provided, will be generated in the `ngb-slide-xx` format.
     */
    id: string;
    constructor(tplRef: TemplateRef<any>);
}
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
export declare class NgbCarousel implements AfterContentChecked, AfterContentInit, OnDestroy {
    private _platformId;
    private _ngZone;
    private _cd;
    slides: QueryList<NgbSlide>;
    NgbSlideEventSource: typeof NgbSlideEventSource;
    private _destroy$;
    private _interval$;
    private _mouseHover$;
    private _pauseOnHover$;
    private _pause$;
    private _wrap$;
    /**
     * The slide id that should be displayed **initially**.
     *
     * For subsequent interactions use methods `select()`, `next()`, etc. and the `(slide)` output.
     */
    activeId: string;
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value: number);
    get interval(): number;
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value: boolean);
    get wrap(): boolean;
    /**
     * If `true`, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.
     */
    keyboard: boolean;
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value: boolean);
    get pauseOnHover(): boolean;
    /**
     * If `true`, 'previous' and 'next' navigation arrows will be visible on the slide.
     *
     * @since 2.2.0
     */
    showNavigationArrows: boolean;
    /**
     * If `true`, navigation indicators at the bottom of the slide will be visible.
     *
     * @since 2.2.0
     */
    showNavigationIndicators: boolean;
    /**
     * An event emitted right after the slide transition is completed.
     *
     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
     */
    slide: EventEmitter<NgbSlideEvent>;
    constructor(config: NgbCarouselConfig, _platformId: any, _ngZone: NgZone, _cd: ChangeDetectorRef);
    mouseEnter(): void;
    mouseLeave(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId: string, source?: NgbSlideEventSource): void;
    /**
     * Navigates to the previous slide.
     */
    prev(source?: NgbSlideEventSource): void;
    /**
     * Navigates to the next slide.
     */
    next(source?: NgbSlideEventSource): void;
    /**
     * Pauses cycling through the slides.
     */
    pause(): void;
    /**
     * Restarts cycling through the slides from left to right.
     */
    cycle(): void;
    private _cycleToSelected;
    private _getSlideEventDirection;
    private _getSlideById;
    private _getSlideIdxById;
    private _getNextSlide;
    private _getPrevSlide;
}
/**
 * A slide change event emitted right after the slide transition is completed.
 */
export interface NgbSlideEvent {
    /**
     * The previous slide id.
     */
    prev: string;
    /**
     * The current slide id.
     */
    current: string;
    /**
     * The slide event direction.
     *
     * Possible values are `'left' | 'right'`.
     */
    direction: NgbSlideEventDirection;
    /**
     * Whether the pause() method was called (and no cycle() call was done afterwards).
     *
     * @since 5.1.0
     */
    paused: boolean;
    /**
     * Source triggering the slide change event.
     *
     * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
     *
     * @since 5.1.0
     */
    source?: NgbSlideEventSource;
}
/**
 * Defines the carousel slide transition direction.
 */
export declare enum NgbSlideEventDirection {
    LEFT,
    RIGHT
}
export declare enum NgbSlideEventSource {
    TIMER = "timer",
    ARROW_LEFT = "arrowLeft",
    ARROW_RIGHT = "arrowRight",
    INDICATOR = "indicator"
}
export declare const NGB_CAROUSEL_DIRECTIVES: (typeof NgbSlide | typeof NgbCarousel)[];
