import { EventEmitter, Output, Injectable, InjectionToken, Inject, Optional, NgZone, Component, ElementRef, ViewEncapsulation, Directive, ViewChild, ViewContainerRef, Input, NgModule } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, tap, first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * return json string from json-like string
 * @param {?} str
 * @return {?}
 */
function jsonize(str) {
    try {
        // if parsable already, return as it is
        JSON.parse(str);
        return str;
    }
    catch (/** @type {?} */ e) {
        // if not parsable, change little
        return str
            .replace(/([\$\w]+)\s*:/g, // wrap keys without double quote
        // wrap keys without double quote
        function (_, $1) {
            return '"' + $1 + '":';
        })
            .replace(/'([^']+)'/g, // replacing single quote to double quote
        // replacing single quote to double quote
        function (_, $1) {
            return '"' + $1 + '"';
        });
    }
}
/**
 * Returns string to an object by using JSON.parse()
 * @param {?} input
 * @return {?}
 */
function getJSON(input) {
    if (typeof input === 'string') {
        const /** @type {?} */ re = /^[\+\-]?[0-9\.]+,[ ]*\ ?[\+\-]?[0-9\.]+$/; // lat,lng
        if (input.match(re)) {
            input = '[' + input + ']';
        }
        return JSON.parse(jsonize(input));
    }
    else {
        return input;
    }
}
/**
 * json type definition
 * @record
 */

/**
 * Returns camel-cased from string 'Foo Bar' to 'fooBar'
 * @param {?} str
 * @return {?}
 */
function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}
/**
 * @return {?}
 */
function isMapsApiLoaded() {
    return typeof google === 'object' && typeof google.maps === 'object';
}
/**
 * @param {?} component
 * @param {?} libName
 * @return {?}
 */
function missingLibraryError(component, libName) {
    return Error(`${component}: library '${libName}' is missing, please ensure to include it in a 'libraries' parameter.
    Example:
      NguiMapModule.forRoot({
        apiUrl: 'https://maps.googleapis.com/maps/api/js?libraries=${libName}'
      })
  `);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class BaseMapDirective {
    /**
     * @param {?} nguiMapComponent
     * @param {?} mapObjectName
     * @param {?} inputs
     * @param {?} outputs
     */
    constructor(nguiMapComponent, mapObjectName, inputs, outputs) {
        this.nguiMapComponent = nguiMapComponent;
        this.mapObjectName = mapObjectName;
        this.inputs = inputs;
        this.outputs = outputs;
        // this should be redefined on each childr directive
        this.initialized$ = new EventEmitter();
        this._subscriptions = [];
        this.nguiMap = this.nguiMapComponent['nguiMap'];
        this.optionBuilder = this.nguiMapComponent['optionBuilder'];
        // all outputs must be initialized
        this.outputs.forEach(output => this[output] = new EventEmitter());
        this.mapObjectName = mapObjectName;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nguiMapComponent.mapIdledOnce) {
            // map is ready already
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(map => this.initialize());
        }
    }
    /**
     * @return {?}
     */
    initialize() {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        // will be set after geocoded
        typeof this.objectOptions.position === 'string' && (delete this.objectOptions.position);
        typeof this.objectOptions.center === 'string' && (delete this.objectOptions.center);
        // noinspection TypeScriptUnresolvedFunction
        if (this.libraryName) {
            if (!google.maps[this.libraryName]) {
                throw missingLibraryError(this.mapObjectName, this.libraryName);
            }
            this.mapObject = new google.maps[this.libraryName][this.mapObjectName](this.objectOptions);
        }
        else {
            this.mapObject = new google.maps[this.mapObjectName](this.objectOptions);
        }
        this.mapObject.setMap(this.nguiMapComponent.map);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        this.mapObject['nguiMapComponent'] = this.nguiMapComponent;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.nguiMap.updateGoogleObject(this.mapObject, changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.map(subscription => subscription.unsubscribe());
        this.nguiMapComponent.removeFromMapObjectGroup(this.mapObjectName, this.mapObject);
        if (this.mapObject) {
            this.nguiMap.clearObjectEvents(this.outputs, this, 'mapObject');
        }
    }
}
BaseMapDirective.propDecorators = {
    "initialized$": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * change any object to google object options
 * e.g. [1,2] -> new google.maps.LatLng(1,2);
 */
class OptionBuilder {
    /**
     * @param {?} definedInputs
     * @param {?} userInputs
     * @return {?}
     */
    googlizeAllInputs(definedInputs, userInputs) {
        let /** @type {?} */ options = {};
        // if options given from user, only take options and ignore other inputs
        if (userInputs.options) {
            options = userInputs.options;
            if (!this.onlyOptionsGiven(definedInputs, userInputs)) {
                console.error('when "options" are used, other options are ignored');
            }
        }
        else {
            // if options not given, process all user inputs
            definedInputs.forEach(input => {
                if (userInputs[input] !== undefined) {
                    options[input] = this.googlize(userInputs[input], { key: input });
                }
            });
        }
        return options;
    }
    /**
     * @param {?} inputs
     * @param {?=} options
     * @return {?}
     */
    googlizeMultiple(inputs, options) {
        options = options || {};
        for (let /** @type {?} */ key in inputs) {
            let /** @type {?} */ val = inputs[key];
            // (non-strings are fully converted)
            if (typeof val !== 'string') {
                options[key] = val;
            }
            else if (!(options['doNotConverStringToNumber'] && val.match(/^[0-9]+$/))) {
                options[key] = this.googlize(val, { key: key });
            }
        } // for(var key in attrs)
        return options;
    }
    /**
     * @param {?} input
     * @param {?=} options
     * @return {?}
     */
    googlize(input, options) {
        options = options || {};
        let /** @type {?} */ output = input;
        if (typeof input === 'string') {
            // convert string to a google object
            if (input === 'false') {
                output = false;
            }
            else if (input === '0') {
                output = 0;
            }
            else {
                output =
                    // -> googlize -> getJsonParsed -> googlizeMultiple -> googlize until all elements are parsed
                    this.getJSONParsed(input, options)
                        /* Foo.Bar(...) -> new google.maps.Foo.Bar(...) */
                        || this.getAnyMapObject(input)
                        /*  MapTypeID.HYBRID -> new google.maps.MapTypeID.HYBRID */
                        || this.getAnyMapConstant(input, options)
                        /*  2016-06-20 -> new Date('2016-06-20') */
                        || this.getDateObject(input)
                        || input;
            }
        }
        if (options['key']) {
            let /** @type {?} */ key = /** @type {?} */ (options['key']);
            if (output instanceof Array) {
                // e.g., [1, 2]
                if (key === 'bounds') {
                    output = new google.maps.LatLngBounds(output[0], output[1]);
                }
                else if (key === 'icons') {
                    output = this.getMapIcons(output);
                }
                else if (key === 'position' || key.match(/^geoFallback/)) {
                    output = this.getLatLng(output);
                }
            }
            else if (output instanceof Object) {
                if (key === 'icon') {
                    output = this.getMarkerIcon(output);
                }
                else if (key.match(/ControlOptions$/)) {
                    output = this.getMapControlOption(output);
                }
            }
        }
        // delete keys only for processing, not used by google
        delete output['doNotConverStringToNumber'];
        delete output['key'];
        return output;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    getLatLng(input) {
        let /** @type {?} */ output;
        if (input[0].constructor === Array) {
            // [[1,2],[3,4]]
            output = (/** @type {?} */ (input)).map((el) => new google.maps.LatLng(el[0], el[1]));
        }
        else if (!isNaN(parseFloat(input[0])) && isFinite(input[0])) {
            output = new google.maps.LatLng(input[0], input[1]);
        }
        return output;
    }
    /**
     * @param {?} input
     * @param {?} options
     * @return {?}
     */
    getJSONParsed(input, options) {
        let /** @type {?} */ output;
        try {
            output = getJSON(input);
            if (output instanceof Array) {
                // [{a:1}] : not lat/lng ones
                if (output[0].constructor !== Object) {
                    // [[1,2],[3,4]] or [1,2]
                    output = this.getLatLng(output);
                }
            }
            else if (output === Object(output)) {
                // check for nested hashes and convert to Google API options
                let /** @type {?} */ newOptions = options;
                newOptions['doNotConverStringToNumber'] = true;
                output = this.googlizeMultiple(output, newOptions);
            }
        }
        catch (/** @type {?} */ e) {
        }
        return output;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    getAnyMapObject(input) {
        let /** @type {?} */ output;
        if (input.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/)) {
            try {
                output = Function(`return new google.maps.${input};`)();
            }
            catch (/** @type {?} */ e) { }
        }
        return output;
    }
    /**
     * @param {?} input
     * @param {?} options
     * @return {?}
     */
    getAnyMapConstant(input, options) {
        let /** @type {?} */ output;
        if (input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/)) {
            // e.g. MapTypeID.HYBRID
            try {
                let /** @type {?} */ matches = input.match(/^([A-Z][a-zA-Z0-9]+)\.([A-Z]+)$/);
                output = google.maps[matches[1]][matches[2]];
            }
            catch (/** @type {?} */ e) { }
        }
        else if (input.match(/^[A-Z]+$/)) {
            // e.g. HYBRID
            try {
                let /** @type {?} */ capitalizedKey = (/** @type {?} */ (options['key'])).charAt(0).toUpperCase() +
                    (/** @type {?} */ (options['key'])).slice(1);
                output = google.maps[capitalizedKey][input];
            }
            catch (/** @type {?} */ e) { }
        }
        return output;
    }
    /**
     * streetviewControl, panControl, etc, not a general control
     * @param {?} controlOptions
     * @return {?}
     */
    getMapControlOption(controlOptions) {
        let /** @type {?} */ newControlOptions = controlOptions;
        for (let /** @type {?} */ key in newControlOptions) {
            // assign the right values
            if (newControlOptions[key]) {
                let /** @type {?} */ value = newControlOptions[key];
                if (typeof value === 'string') {
                    value = (/** @type {?} */ (value)).toUpperCase();
                }
                else if (key === 'mapTypeIds') {
                    value = (/** @type {?} */ (value)).map(function (str) {
                        if (str.match(/^[A-Z]+$/)) {
                            // if constant
                            return google.maps.MapTypeId[str.toUpperCase()];
                        }
                        else {
                            // else, custom map-type
                            return str;
                        }
                    });
                }
                if (key === 'style') {
                    let /** @type {?} */ objName = key.replace(/Options$/, '') + 'Style';
                    newControlOptions[key] = google.maps[objName][/** @type {?} */ (value)];
                }
                else if (key === 'position') {
                    newControlOptions[key] = google.maps.ControlPosition[/** @type {?} */ (value)];
                }
                else {
                    newControlOptions[key] = value;
                }
            }
        }
        return newControlOptions;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    getDateObject(input) {
        let /** @type {?} */ output;
        if (input.match(/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/)) {
            try {
                output = new Date(input);
            }
            catch (/** @type {?} */ e) { }
        }
        return output;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    getMapIcons(input) {
        return input.map(el => {
            if (el.icon.path.match(/^[A-Z_]+$/)) {
                el.icon.path = google.maps.SymbolPath[el.icon.path];
            }
            return el;
        });
    }
    /**
     * @param {?} input
     * @return {?}
     */
    getMarkerIcon(input) {
        let /** @type {?} */ output = input;
        if (('' + output.path).match(/^[A-Z_]+$/)) {
            output.path = google.maps.SymbolPath[output.path];
        }
        for (let /** @type {?} */ key in output) {
            let /** @type {?} */ arr = output[key];
            if (key === 'anchor' || key === 'origin' || key === 'labelOrigin') {
                output[key] = new google.maps.Point(arr[0], arr[1]);
            }
            else if (key === 'size' || key === 'scaledSize') {
                output[key] = new google.maps.Size(arr[0], arr[1]);
            }
        }
        return output;
    }
    /**
     * @param {?} definedInputs
     * @param {?} userInputs
     * @return {?}
     */
    onlyOptionsGiven(definedInputs, userInputs) {
        for (let /** @type {?} */ i = 0; i < definedInputs.length; i++) {
            let /** @type {?} */ input = definedInputs[i];
            if (input !== 'options' && typeof userInputs[input] !== 'undefined') {
                return false;
            }
        }
        return true;
    }
}
OptionBuilder.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *  service for navigator.geolocation methods
 */
class NavigatorGeolocation {
    /**
     * @param {?=} geoLocationOptions
     * @return {?}
     */
    getCurrentPosition(geoLocationOptions) {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };
        return new Observable((responseObserver) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    responseObserver.next(position);
                    responseObserver.complete();
                }, (evt) => responseObserver.error(evt), geoLocationOptions);
            }
            else {
                responseObserver.error('Browser Geolocation service failed.');
            }
        });
    }
}
NavigatorGeolocation.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const NG_MAP_CONFIG_TOKEN = new InjectionToken('NG_MAP_CONFIG_TOKEN');
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class NgMapApiLoader {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.api$ = new ReplaySubject(1);
        this.config = this.config || { apiUrl: 'https://maps.google.com/maps/api/js' };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.api$.complete();
    }
}
class NgMapAsyncCallbackApiLoader extends NgMapApiLoader {
    /**
     * @param {?} zone
     * @param {?} config
     */
    constructor(zone, config) {
        super(config);
        this.zone = zone;
    }
    /**
     * @return {?}
     */
    load() {
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            (/** @type {?} */ (window))['nguiMapRef'] = (/** @type {?} */ (window))['nguiMapRef'] || [];
            (/** @type {?} */ (window))['nguiMapRef'].push({ zone: this.zone, componentFn: () => this.api$.next(google.maps) });
            this.addGoogleMapsApi();
        }
    }
    /**
     * @return {?}
     */
    addGoogleMapsApi() {
        (/** @type {?} */ (window))['initNguiMap'] = (/** @type {?} */ (window))['initNguiMap'] || function () {
            (/** @type {?} */ (window))['nguiMapRef'].forEach(nguiMapRef => {
                nguiMapRef.zone.run(function () { nguiMapRef.componentFn(); });
            });
            (/** @type {?} */ (window))['nguiMapRef'].splice(0, (/** @type {?} */ (window))['nguiMapRef'].length);
        };
        let /** @type {?} */ script = document.createElement('script');
        script.id = 'ngui-map-api';
        // script.src = "https://maps.google.com/maps/api/js?callback=initNguiMap";
        let /** @type {?} */ apiUrl = this.config.apiUrl;
        apiUrl += apiUrl.indexOf('?') !== -1 ? '&' : '?';
        script.src = apiUrl + 'callback=initNguiMap';
        document.querySelector('body').appendChild(script);
    }
}
NgMapAsyncCallbackApiLoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgMapAsyncCallbackApiLoader.ctorParameters = () => [
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_MAP_CONFIG_TOKEN,] },] },
];
class NgMapAsyncApiLoader extends NgMapApiLoader {
    /**
     * @param {?} config
     */
    constructor(config) {
        super(config);
    }
    /**
     * @return {?}
     */
    load() {
        if (typeof window === 'undefined') {
            return;
        }
        if (isMapsApiLoaded()) {
            this.api$.next(google.maps);
        }
        else if (!document.querySelector('#ngui-map-api')) {
            let /** @type {?} */ script = document.createElement('script');
            script.id = 'ngui-map-api';
            script.async = true;
            script.onload = () => this.api$.next(google.maps);
            script.src = this.config.apiUrl;
            document.querySelector('body').appendChild(script);
        }
    }
}
NgMapAsyncApiLoader.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgMapAsyncApiLoader.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_MAP_CONFIG_TOKEN,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 *   Provides [defered/promise API](https://docs.angularjs.org/api/ng/service/$q)
 *   service for Google Geocoder service
 */
class GeoCoder {
    /**
     * @param {?} apiLoader
     */
    constructor(apiLoader) {
        this.apiLoader = apiLoader;
        this.apiLoaderSubs = [];
    }
    /**
     * @param {?} options
     * @return {?}
     */
    geocode(options) {
        return new Observable((responseObserver) => {
            this.apiLoaderSubs.push(this.apiLoader.api$
                .subscribe(() => this.requestGeocode(options, responseObserver)));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.apiLoaderSubs.map(sub => sub.unsubscribe());
    }
    /**
     * @param {?} options
     * @param {?} observer
     * @return {?}
     */
    requestGeocode(options, observer) {
        const /** @type {?} */ geocoder = new google.maps.Geocoder();
        geocoder.geocode(options, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                observer.next(results);
                observer.complete();
            }
            else {
                observer.error(results);
            }
        });
    }
}
GeoCoder.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GeoCoder.ctorParameters = () => [
    { type: NgMapApiLoader, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * collection of map instance-related properties and methods
 */
class NguiMap {
    /**
     * @param {?} geoCoder
     * @param {?} optionBuilder
     * @param {?} zone
     */
    constructor(geoCoder, optionBuilder, zone) {
        this.geoCoder = geoCoder;
        this.optionBuilder = optionBuilder;
        this.zone = zone;
        this.updateGoogleObject = (object, changes) => {
            let /** @type {?} */ val, /** @type {?} */ currentValue, /** @type {?} */ setMethodName;
            if (object) {
                for (let /** @type {?} */ key in changes) {
                    setMethodName = `set${key.replace(/^[a-z]/, x => x.toUpperCase())}`;
                    currentValue = changes[key].currentValue;
                    if (['position', 'center'].indexOf(key) !== -1 && typeof currentValue === 'string') {
                        // To preserve setMethod name in Observable callback, wrap it as a function, then execute
                        ((setMethodName) => {
                            this.geoCoder.geocode({ address: currentValue }).subscribe(results => {
                                if (typeof object[setMethodName] === 'function') {
                                    object[setMethodName](results[0].geometry.location);
                                }
                                else {
                                    console.error('Not all options are dynamically updatable according to Googles Maps API V3 documentation.\n' +
                                        'Please check Google Maps API documentation, and use "setOptions" instead.');
                                }
                            });
                        })(setMethodName);
                    }
                    else {
                        val = this.optionBuilder.googlize(currentValue);
                        if (typeof object[setMethodName] === 'function') {
                            object[setMethodName](val);
                        }
                        else {
                            console.error('Not all options are dynamically updatable according to Googles Maps API V3 documentation.\n' +
                                'Please check Google Maps API documentation, and use "setOptions" instead.');
                        }
                    }
                }
            }
        };
    }
    /**
     * @param {?} definedEvents
     * @param {?} thisObj
     * @param {?} prefix
     * @return {?}
     */
    setObjectEvents(definedEvents, thisObj, prefix) {
        definedEvents.forEach(definedEvent => {
            const /** @type {?} */ eventName = this.getEventName(definedEvent), /** @type {?} */
            zone = this.zone;
            zone.runOutsideAngular(() => {
                thisObj[prefix].addListener(eventName, function (event) {
                    let /** @type {?} */ param = event ? event : {};
                    param.target = this;
                    zone.run(() => thisObj[definedEvent].emit(param));
                });
            });
        });
    }
    /**
     * @param {?} definedEvents
     * @param {?} thisObj
     * @param {?} prefix
     * @return {?}
     */
    clearObjectEvents(definedEvents, thisObj, prefix) {
        definedEvents.forEach(definedEvent => {
            const /** @type {?} */ eventName = this.getEventName(definedEvent);
            this.zone.runOutsideAngular(() => {
                if (thisObj[prefix]) {
                    google.maps.event.clearListeners(thisObj[prefix], eventName);
                }
            });
        });
        if (thisObj[prefix]) {
            if (thisObj[prefix].setMap) {
                thisObj[prefix].setMap(null);
            }
            delete thisObj[prefix].nguiMapComponent;
            delete thisObj[prefix];
        }
    }
    /**
     * @param {?} definedEvent
     * @return {?}
     */
    getEventName(definedEvent) {
        return definedEvent
            .replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`) // positionChanged -> position_changed
            .replace(/^map_/, ''); // map_click -> click  to avoid DOM conflicts
    }
}
NguiMap.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NguiMap.ctorParameters = () => [
    { type: GeoCoder, },
    { type: OptionBuilder, },
    { type: NgZone, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS = [
    'backgroundColor', 'center', 'disableDefaultUI', 'disableDoubleClickZoom', 'draggable', 'draggableCursor',
    'draggingCursor', 'heading', 'keyboardShortcuts', 'mapMaker', 'mapTypeControl', 'mapTypeId', 'maxZoom', 'minZoom',
    'noClear', 'overviewMapControl', 'panControl', 'panControlOptions', 'rotateControl', 'scaleControl', 'scrollwheel',
    'streetView', 'styles', 'tilt', 'zoom', 'streetViewControl', 'zoomControl', 'zoomControlOptions', 'mapTypeControlOptions',
    'overviewMapControlOptions', 'rotateControlOptions', 'scaleControlOptions', 'streetViewControlOptions', 'fullscreenControl', 'fullscreenControlOptions',
    'options',
    'geoFallbackCenter'
];
const OUTPUTS = [
    'bounds_changed', 'center_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'heading_changed', 'idle',
    'maptypeid_changed', 'mousemove', 'mouseout', 'mouseover', 'projection_changed', 'resize', 'rightclick',
    'tilesloaded', 'tile_changed', 'zoom_changed',
    'mapClick', 'mapMouseover', 'mapMouseout', 'mapMousemove', 'mapDrag', 'mapDragend', 'mapDragstart'
];
class NguiMapComponent {
    /**
     * @param {?} optionBuilder
     * @param {?} elementRef
     * @param {?} geolocation
     * @param {?} geoCoder
     * @param {?} nguiMap
     * @param {?} apiLoader
     * @param {?} zone
     */
    constructor(optionBuilder, elementRef, geolocation, geoCoder, nguiMap, apiLoader, zone) {
        this.optionBuilder = optionBuilder;
        this.elementRef = elementRef;
        this.geolocation = geolocation;
        this.geoCoder = geoCoder;
        this.nguiMap = nguiMap;
        this.apiLoader = apiLoader;
        this.zone = zone;
        this.mapReady$ = new EventEmitter();
        this.mapOptions = {};
        this.inputChanges$ = new Subject();
        this.infoWindows = {};
        this.mapIdledOnce = false;
        this.initializeMapAfterDisplayed = false;
        apiLoader.load();
        // all outputs needs to be initialized,
        // http://stackoverflow.com/questions/37765519/angular2-directive-cannot-read-property-subscribe-of-undefined-with-outputs
        OUTPUTS.forEach(output => this[output] = new EventEmitter());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.apiLoaderSub = this.apiLoader.api$
            .pipe(first())
            .subscribe(() => this.initializeMap());
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.initializeMapAfterDisplayed && this.el && this.el.offsetWidth > 0) {
            this.initializeMap();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    /**
     * @return {?}
     */
    initializeMap() {
        this.el = this.elementRef.nativeElement.querySelector('.google-map');
        if (this.el && this.el.offsetWidth === 0) {
            this.initializeMapAfterDisplayed = true;
            return;
        }
        this.initializeMapAfterDisplayed = false;
        this.mapOptions = this.optionBuilder.googlizeAllInputs(INPUTS, this);
        this.mapOptions.zoom = this.mapOptions.zoom || 15;
        typeof this.mapOptions.center === 'string' && (delete this.mapOptions.center);
        this.zone.runOutsideAngular(() => {
            this.map = new google.maps.Map(this.el, this.mapOptions);
            this.map['mapObjectName'] = 'NguiMapComponent';
            if (!this.mapOptions.center) {
                // if center is not given as lat/lng
                this.setCenter();
            }
            // set google events listeners and emits to this outputs listeners
            this.nguiMap.setObjectEvents(OUTPUTS, this, 'map');
            this.map.addListener('idle', () => {
                if (!this.mapIdledOnce) {
                    this.mapIdledOnce = true;
                    setTimeout(() => {
                        // Why????, subsribe and emit must not be in the same cycle???
                        this.mapReady$.emit(this.map);
                    });
                }
            });
            // update map when input changes
            this.inputChanges$.pipe(debounceTime(1000), tap((changes) => this.nguiMap.updateGoogleObject(this.map, changes))).subscribe();
            if (typeof window !== 'undefined' && (/** @type {?} */ (window))['nguiMapRef']) {
                // expose map object for test and debugging on (<any>window)
                (/** @type {?} */ (window))['nguiMapRef'].map = this.map;
            }
        });
    }
    /**
     * @return {?}
     */
    setCenter() {
        if (!this['center']) {
            // center is not from user. Thus, we set the current location
            this.geolocation.getCurrentPosition().subscribe(position => {
                let /** @type {?} */ latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.map.setCenter(latLng);
            }, error => {
                console.error('ngui-map: Error finding the current position');
                this.map.setCenter(this.mapOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            });
        }
        else if (typeof this['center'] === 'string') {
            this.geoCoder.geocode({ address: this['center'] }).subscribe(results => {
                this.map.setCenter(results[0].geometry.location);
            }, error => {
                this.map.setCenter(this.mapOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            });
        }
    }
    /**
     * @param {?} id
     * @param {?} anchor
     * @return {?}
     */
    openInfoWindow(id, anchor) {
        this.infoWindows[id].open(anchor);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    closeInfoWindow(id) {
        // if infoWindow for id exists, close the infoWindow
        if (this.infoWindows[id])
            this.infoWindows[id].close();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.inputChanges$.complete();
        if (this.el && !this.initializeMapAfterDisplayed) {
            this.nguiMap.clearObjectEvents(OUTPUTS, this, 'map');
        }
        if (this.apiLoaderSub) {
            this.apiLoaderSub.unsubscribe();
        }
    }
    /**
     * @param {?} mapObjectName
     * @param {?} mapObject
     * @return {?}
     */
    addToMapObjectGroup(mapObjectName, mapObject) {
        let /** @type {?} */ groupName = toCamelCase(mapObjectName.toLowerCase()) + 's'; // e.g. markers
        this.map[groupName] = this.map[groupName] || [];
        this.map[groupName].push(mapObject);
    }
    /**
     * @param {?} mapObjectName
     * @param {?} mapObject
     * @return {?}
     */
    removeFromMapObjectGroup(mapObjectName, mapObject) {
        let /** @type {?} */ groupName = toCamelCase(mapObjectName.toLowerCase()) + 's'; // e.g. markers
        if (this.map && this.map[groupName]) {
            let /** @type {?} */ index = this.map[groupName].indexOf(mapObject);
            (index > -1) && this.map[groupName].splice(index, 1);
        }
    }
}
NguiMapComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngui-map',
                providers: [NguiMap, OptionBuilder, GeoCoder, NavigatorGeolocation],
                styles: [`
    ngui-map {display: block; height: 300px;}
    .google-map {width: 100%; height: 100%}
  `],
                inputs: INPUTS,
                outputs: OUTPUTS,
                encapsulation: ViewEncapsulation.None,
                template: `
    <div class="google-map"></div>
    <ng-content></ng-content>
  `,
            },] },
];
/** @nocollapse */
NguiMapComponent.ctorParameters = () => [
    { type: OptionBuilder, },
    { type: ElementRef, },
    { type: NavigatorGeolocation, },
    { type: GeoCoder, },
    { type: NguiMap, },
    { type: NgMapApiLoader, },
    { type: NgZone, },
];
NguiMapComponent.propDecorators = {
    "mapReady$": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$1 = [];
const OUTPUTS$1 = [];
class BicyclingLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'BicyclingLayer', INPUTS$1, OUTPUTS$1);
    }
}
BicyclingLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > bicycling-layer',
                inputs: INPUTS$1,
                outputs: OUTPUTS$1,
            },] },
];
/** @nocollapse */
BicyclingLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$2 = [
    'content', 'disableAutoPan', 'maxWidth', 'pixelOffset', 'position', 'zIndex', 'options'
];
const OUTPUTS$2 = [
    'closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'
];
class InfoWindow {
    /**
     * @param {?} elementRef
     * @param {?} nguiMap
     * @param {?} nguiMapComponent
     */
    constructor(elementRef, nguiMap, nguiMapComponent) {
        this.elementRef = elementRef;
        this.nguiMap = nguiMap;
        this.nguiMapComponent = nguiMapComponent;
        this.initialized$ = new EventEmitter();
        this.objectOptions = {};
        this.inputChanges$ = new Subject();
        this.elementRef.nativeElement.style.display = 'none';
        OUTPUTS$2.forEach(output => this[output] = new EventEmitter());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nguiMapComponent.mapIdledOnce) {
            // map is ready already
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(map => this.initialize());
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    /**
     * @return {?}
     */
    initialize() {
        this.objectOptions = this.nguiMapComponent.optionBuilder.googlizeAllInputs(INPUTS$2, this);
        this.infoWindow = new google.maps.InfoWindow(this.objectOptions);
        this.infoWindow['mapObjectName'] = 'InfoWindow';
        // register infoWindow ids to NguiMap, so that it can be opened by id
        if (this.elementRef.nativeElement.id) {
            this.nguiMapComponent.infoWindows[this.elementRef.nativeElement.id] = this;
        }
        else {
            console.error('An InfoWindow must have an id. e.g. id="detail"');
        }
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(OUTPUTS$2, this, 'infoWindow');
        // update object when input changes
        this.inputChanges$.pipe(debounceTime(1000), tap((changes) => this.nguiMap.updateGoogleObject(this.infoWindow, changes))).subscribe();
        this.nguiMapComponent.addToMapObjectGroup('InfoWindow', this.infoWindow);
        this.initialized$.emit(this.infoWindow);
    }
    /**
     * @param {?} anchor
     * @return {?}
     */
    open(anchor) {
        // set content and open it
        this.infoWindow.setContent(this.template.element.nativeElement);
        this.infoWindow.open(this.nguiMapComponent.map, anchor);
    }
    /**
     * @return {?}
     */
    close() {
        // check if infoWindow exists, and closes it
        if (this.infoWindow)
            this.infoWindow.close();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.inputChanges$.complete();
        if (this.infoWindow) {
            this.nguiMap.clearObjectEvents(OUTPUTS$2, this, 'infoWindow');
            delete this.infoWindow;
        }
    }
}
InfoWindow.decorators = [
    { type: Component, args: [{
                selector: 'ngui-map > info-window',
                inputs: INPUTS$2,
                outputs: OUTPUTS$2,
                template: `<div #template><ng-content></ng-content></div>`,
            },] },
];
/** @nocollapse */
InfoWindow.ctorParameters = () => [
    { type: ElementRef, },
    { type: NguiMap, },
    { type: NguiMapComponent, },
];
InfoWindow.propDecorators = {
    "initialized$": [{ type: Output },],
    "template": [{ type: ViewChild, args: ['template', { read: ViewContainerRef },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$3 = [
    'position'
];
// to avoid DOM event conflicts map_*
const OUTPUTS$3 = [
    'animationChanged', 'click', 'clickableChanged', 'cursorChanged', 'dblclick', 'drag', 'dragend', 'draggableChanged',
    'dragstart', 'flatChanged', 'iconChanged', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'positionChanged', 'rightclick',
    'shapeChanged', 'titleChanged', 'visibleChanged', 'zindexChanged',
    'map_click', 'map_mouseover', 'map_mouseout', 'map_mouseup', 'map_mousedown', 'map_drag', 'map_dragend'
];
/**
 * Wrapper to a create extend OverlayView at runtime, only after google maps is loaded.
 * Otherwise throws a google is unknown error.
 * @param {?} htmlEl
 * @param {?} position
 * @return {?}
 */
function getCustomMarkerOverlayView(htmlEl, position) {
    class CustomMarkerOverlayView extends google.maps.OverlayView {
        /**
         * @param {?} htmlEl
         * @param {?} position
         */
        constructor(htmlEl, position) {
            super();
            this.visible = true;
            this.setPosition = (position) => {
                this.htmlEl.style.visibility = 'hidden';
                if (position.constructor.name === 'Array') {
                    this.position = new google.maps.LatLng(position[0], position[1]);
                }
                else if (typeof position === 'string') {
                    let /** @type {?} */ geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ address: position }, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            this.setPosition(results[0].geometry.location);
                        }
                        else {
                        }
                    });
                }
                else if (position && typeof position.lng === 'function') {
                    this.position = position;
                }
                if (this.getProjection() && typeof this.position.lng === 'function') {
                    let /** @type {?} */ positionOnMap = () => {
                        let /** @type {?} */ projection = this.getProjection();
                        if (!projection) {
                            return;
                        }
                        let /** @type {?} */ posPixel = projection.fromLatLngToDivPixel(this.position);
                        let /** @type {?} */ x = Math.round(posPixel.x - (this.htmlEl.offsetWidth / 2));
                        let /** @type {?} */ y = Math.round(posPixel.y - this.htmlEl.offsetHeight / 2);
                        this.htmlEl.style.left = x + 'px';
                        this.htmlEl.style.top = y + 'px';
                        this.htmlEl.style.visibility = 'visible';
                    };
                    if (this.htmlEl.offsetWidth && this.htmlEl.offsetHeight) {
                        positionOnMap();
                    }
                    else {
                        setTimeout(() => positionOnMap());
                    }
                }
            };
            this.htmlEl = htmlEl;
            this.position = position;
        }
        /**
         * @return {?}
         */
        onAdd() {
            this.getPanes().overlayMouseTarget.appendChild(this.htmlEl);
            // required for correct display inside google maps container
            this.htmlEl.style.position = 'absolute';
        }
        /**
         * @return {?}
         */
        draw() {
            this.setPosition(this.position);
            this.setZIndex(this.zIndex);
            this.setVisible(this.visible);
        }
        /**
         * @return {?}
         */
        onRemove() {
            //
        }
        /**
         * @return {?}
         */
        getPosition() {
            return this.position;
        }
        /**
         * @param {?} zIndex
         * @return {?}
         */
        setZIndex(zIndex) {
            zIndex && (this.zIndex = zIndex); /* jshint ignore:line */
            this.htmlEl.style.zIndex = this.zIndex;
        }
        /**
         * @param {?} visible
         * @return {?}
         */
        setVisible(visible) {
            this.htmlEl.style.display = visible ? 'inline-block' : 'none';
            this.visible = visible;
        }
    }
    return new CustomMarkerOverlayView(htmlEl, position);
}
class CustomMarker {
    /**
     * @param {?} nguiMapComponent
     * @param {?} elementRef
     * @param {?} nguiMap
     */
    constructor(nguiMapComponent, elementRef, nguiMap) {
        this.nguiMapComponent = nguiMapComponent;
        this.elementRef = elementRef;
        this.nguiMap = nguiMap;
        this.initialized$ = new EventEmitter();
        this.inputChanges$ = new Subject();
        this.elementRef.nativeElement.style.display = 'none';
        OUTPUTS$3.forEach(output => this[output] = new EventEmitter());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nguiMapComponent.mapIdledOnce) {
            // map is ready already
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(map => this.initialize());
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.inputChanges$.next(changes);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.inputChanges$.complete();
        this.nguiMapComponent.removeFromMapObjectGroup('CustomMarker', this.mapObject);
        if (this.mapObject) {
            this.nguiMap.clearObjectEvents(OUTPUTS$3, this, 'mapObject');
        }
    }
    /**
     * @return {?}
     */
    initialize() {
        this.el = this.elementRef.nativeElement;
        this.mapObject = getCustomMarkerOverlayView(this.el, this['position']);
        this.mapObject.setMap(this.nguiMapComponent.map);
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(OUTPUTS$3, this, 'mapObject');
        // update object when input changes
        this.inputChanges$.pipe(debounceTime(1000), tap((changes) => this.nguiMap.updateGoogleObject(this.mapObject, changes))).subscribe();
        this.nguiMapComponent.addToMapObjectGroup('CustomMarker', this.mapObject);
        this.initialized$.emit(this.mapObject);
    }
}
CustomMarker.decorators = [
    { type: Component, args: [{
                selector: 'ngui-map > custom-marker',
                inputs: INPUTS$3,
                outputs: OUTPUTS$3,
                template: `
    <ng-content></ng-content>
  `,
            },] },
];
/** @nocollapse */
CustomMarker.ctorParameters = () => [
    { type: NguiMapComponent, },
    { type: ElementRef, },
    { type: NguiMap, },
];
CustomMarker.propDecorators = {
    "initialized$": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$4 = [
    'center', 'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'map', 'radius',
    'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'options',
    'geoFallbackCenter'
];
const OUTPUTS$4 = [
    'centerChanged', 'click', 'dblclick', 'drag', 'dragend', 'dragstart',
    'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'radiusChanged', 'rightclick',
];
class Circle extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'Circle', INPUTS$4, OUTPUTS$4);
        this.nguiMapComp = nguiMapComp;
        this.objectOptions = /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    initialize() {
        super.initialize();
        this.setCenter();
    }
    /**
     * @return {?}
     */
    setCenter() {
        if (!this['center']) {
            this._subscriptions.push(this.nguiMapComp.geolocation.getCurrentPosition().subscribe(center => {
                let /** @type {?} */ latLng = new google.maps.LatLng(center.coords.latitude, center.coords.longitude);
                this.mapObject.setCenter(latLng);
            }, error => {
                console.error('ngui-map, error in finding the current position');
                this.mapObject.setCenter(this.objectOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            }));
        }
        else if (typeof this['center'] === 'string') {
            this._subscriptions.push(this.nguiMapComp.geoCoder.geocode({ address: this['center'] }).subscribe(results => {
                this.mapObject.setCenter(results[0].geometry.location);
            }, error => {
                console.error('ngui-map, error in finding location from', this['center']);
                this.mapObject.setCenter(this.objectOptions['geoFallbackCenter'] || new google.maps.LatLng(0, 0));
            }));
        }
    }
}
Circle.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map>circle, ngui-map>map-circle',
                inputs: INPUTS$4,
                outputs: OUTPUTS$4,
            },] },
];
/** @nocollapse */
Circle.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$5 = ['controlPosition', 'controls', 'drawingMode', 'featureFactory', 'style', 'geoJson', 'geoJsonUrl'];
const OUTPUTS$5 = [
    'addfeature', 'click', 'dblclick', 'mousedown', 'mouseout', 'mouseover',
    'mouseup', 'removefeature', 'removeproperty', 'rightclick', 'setgeometry', 'setproperty'
];
class DataLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComponent
     */
    constructor(nguiMapComponent) {
        super(nguiMapComponent, 'Data', INPUTS$5, OUTPUTS$5);
    }
    /**
     * @return {?}
     */
    initialize() {
        if (this['geoJson']) {
            // addGeoJson from an object
            this.nguiMapComponent.map.data.addGeoJson(this['geoJson']);
        }
        else if (this['geoJsonUrl']) {
            // loadGeoJson from a URL
            this.nguiMapComponent.map.data.loadGeoJson(this['geoJsonUrl']);
        }
        else {
            this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
            this.nguiMapComponent.map.data.add(this.objectOptions);
        }
        // unlike others, data belongs to map. e.g., map.data.loadGeoJson(), map.data.add()
        this.mapObject = this.nguiMapComponent.map.data;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    }
}
DataLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > data-layer',
                inputs: INPUTS$5,
                outputs: OUTPUTS$5,
            },] },
];
/** @nocollapse */
DataLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$6 = [
    'directions', 'draggable', 'hideRouteList', 'infoWindow', 'panel', 'markerOptions',
    'polylineOptions', 'preserveViewport', 'routeIndex', 'suppressBicyclingLayer',
    'suppressInfoWindows', 'suppressMarkers', 'suppressPolylines'
];
const OUTPUTS$6 = ['directions_changed'];
class DirectionsRenderer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComponent
     * @param {?} geolocation
     */
    constructor(nguiMapComponent, geolocation) {
        super(nguiMapComponent, 'DirectionsRenderer', INPUTS$6, OUTPUTS$6);
        this.geolocation = geolocation;
    }
    /**
     * @return {?}
     */
    initialize() {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        if (typeof this.objectOptions['panel'] === 'string') {
            // find a Node for panel
            this.objectOptions['panel'] = document.querySelector(this.objectOptions['panel']);
        }
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer(this.objectOptions);
        this.directionsRenderer.setMap(this.nguiMapComponent.map);
        // set google events listeners and emidirectionsRenderer to this outputs listeners
        this.showDirections(this.directionsRequest);
        this.nguiMap.setObjectEvents(this.outputs, this, 'directionsRenderer');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.directionsRenderer);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ newOptions = {};
        for (let /** @type {?} */ key in changes) {
            if (this.inputs.indexOf(key) !== -1) {
                newOptions[key] = this.optionBuilder.googlize(changes[key].currentValue);
            }
        }
        if (changes['directionsRequest'] && this.directionsRenderer) {
            this.directionsService && this.showDirections(this.directionsRequest);
        }
    }
    /**
     * @param {?} directionsRequest
     * @return {?}
     */
    showDirections(directionsRequest) {
        this.directionsService.route(directionsRequest, (response, status) => {
            // in some-case the callback is called during destroy component,
            // we should make sure directionsRenderer is still defined (cancelling `route` callback is not possible).
            if (!this.directionsRenderer) {
                return;
            }
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionsRenderer.setDirections(response);
            }
            else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.nguiMap.clearObjectEvents(this.outputs, this, 'directionsRenderer');
    }
}
DirectionsRenderer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > directions-renderer',
                inputs: INPUTS$6,
                outputs: OUTPUTS$6,
            },] },
];
/** @nocollapse */
DirectionsRenderer.ctorParameters = () => [
    { type: NguiMapComponent, },
    { type: NavigatorGeolocation, },
];
DirectionsRenderer.propDecorators = {
    "directionsRequest": [{ type: Input, args: ['directions-request',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$7 = [
    'options',
    'circleOptions', 'drawingControl', 'drawingControlOptions', 'drawingMode',
    'map', 'markerOptions', 'polygonOptions', 'polylineOptions', 'rectangleOptions'
];
const OUTPUTS$7 = [
    'circlecomplete', 'markercomplete', 'overlaycomplete',
    'polygoncomplete', 'polylinecomplete', 'rectanglecomplete'
];
class DrawingManager extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'DrawingManager', INPUTS$7, OUTPUTS$7);
        this.libraryName = 'drawing';
    }
}
DrawingManager.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > drawing-manager',
                inputs: INPUTS$7,
                outputs: OUTPUTS$7,
            },] },
];
/** @nocollapse */
DrawingManager.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$8 = ['url', 'bounds', 'clickable', 'opacity'];
const OUTPUTS$8 = ['click', 'dblclick'];
class GroundOverlay extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'GroundOverlay', INPUTS$8, OUTPUTS$8);
        this.objectOptions = /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    initialize() {
        // url, bounds are not the options of GroundOverlay
        this.objectOptions = this.optionBuilder.googlizeAllInputs(['clickable', 'opacity'], this);
        // noinspection TypeScriptUnresolvedFunction
        this.mapObject = new google.maps.GroundOverlay(this['url'], this['bounds'], this.objectOptions);
        this.mapObject.setMap(this.nguiMapComponent.map);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    }
}
GroundOverlay.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > ground-overlay',
                inputs: INPUTS$8,
                outputs: OUTPUTS$8,
            },] },
];
/** @nocollapse */
GroundOverlay.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$9 = ['data', 'dissipating', 'gradient', 'maxIntensity', 'opacity', 'radius', 'options'];
const OUTPUTS$9 = [];
class HeatmapLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'HeatmapLayer', INPUTS$9, OUTPUTS$9);
        this.libraryName = 'visualization';
    }
}
HeatmapLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > heatmap-layer',
                inputs: INPUTS$9,
                outputs: OUTPUTS$9,
            },] },
];
/** @nocollapse */
HeatmapLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$10 = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex', 'options'];
const OUTPUTS$10 = ['click', 'defaultviewport_changed', 'status_changed'];
class KmlLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'KmlLayer', INPUTS$10, OUTPUTS$10);
    }
}
KmlLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > kml-layer',
                inputs: INPUTS$10,
                outputs: OUTPUTS$10,
            },] },
];
/** @nocollapse */
KmlLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$11 = [
    'anchorPoint', 'animation', 'clickable', 'cursor', 'draggable', 'icon', 'label', 'opacity',
    'optimized', 'place', 'position', 'shape', 'title', 'visible', 'zIndex', 'options',
    'geoFallbackPosition'
];
const OUTPUTS$11 = [
    'animationChanged', 'click', 'clickableChanged', 'cursorChanged', 'dblclick', 'drag', 'dragend', 'draggableChanged',
    'dragstart', 'flatChanged', 'iconChanged', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'positionChanged', 'rightclick',
    'shapeChanged', 'titleChanged', 'visibleChanged', 'zindexChanged'
];
class Marker extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'Marker', INPUTS$11, OUTPUTS$11);
        this.nguiMapComp = nguiMapComp;
        this.objectOptions = /** @type {?} */ ({});
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.nguiMapComponent.mapIdledOnce) {
            // map is ready already
            this.initialize();
        }
        else {
            this.nguiMapComponent.mapReady$.subscribe(map => this.initialize());
        }
    }
    /**
     * @return {?}
     */
    initialize() {
        super.initialize();
        this.setPosition();
    }
    /**
     * @return {?}
     */
    setPosition() {
        if (!this['position']) {
            this._subscriptions.push(this.nguiMapComp.geolocation.getCurrentPosition().subscribe(position => {
                let /** @type {?} */ latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                this.mapObject.setPosition(latLng);
            }, error => {
                console.error('ngui-map, error finding the current location');
                this.mapObject.setPosition(this.objectOptions['geoFallbackPosition'] || new google.maps.LatLng(0, 0));
            }));
        }
        else if (typeof this['position'] === 'string') {
            this._subscriptions.push(this.nguiMapComp.geoCoder.geocode({ address: this['position'] }).subscribe(results => {
                this.mapObject.setPosition(results[0].geometry.location);
            }, error => {
                console.error('ngui-map, error finding the location from', this['position']);
                this.mapObject.setPosition(this.objectOptions['geoFallbackPosition'] || new google.maps.LatLng(0, 0));
            }));
        }
    }
}
Marker.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > marker',
                inputs: INPUTS$11,
                outputs: OUTPUTS$11,
            },] },
];
/** @nocollapse */
Marker.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PlacesAutoComplete {
    /**
     * @param {?} optionBuilder
     * @param {?} elementRef
     * @param {?} apiLoader
     */
    constructor(optionBuilder, elementRef, apiLoader) {
        this.optionBuilder = optionBuilder;
        this.elementRef = elementRef;
        this.apiLoader = apiLoader;
        this.place_changed = new EventEmitter();
        this.initialized$ = new EventEmitter();
        // only called when map is ready
        this.initialize = () => {
            this.objectOptions =
                this.optionBuilder.googlizeAllInputs(['bounds', 'componentRestrictions', 'types'], this);
            if (!google.maps.places) {
                throw missingLibraryError('PlacesAutoComplete', 'places');
            }
            this.autocomplete = new google.maps.places.Autocomplete(this.elementRef.nativeElement, this.objectOptions);
            this.autocomplete.addListener('place_changed', place => {
                this.place_changed.emit(this.autocomplete.getPlace());
            });
            this.initialized$.emit(this.autocomplete);
        };
        apiLoader.load();
        apiLoader.api$
            .pipe(first())
            .subscribe(() => this.initialize());
    }
}
PlacesAutoComplete.decorators = [
    { type: Directive, args: [{
                selector: '[places-auto-complete]'
            },] },
];
/** @nocollapse */
PlacesAutoComplete.ctorParameters = () => [
    { type: OptionBuilder, },
    { type: ElementRef, },
    { type: NgMapApiLoader, },
];
PlacesAutoComplete.propDecorators = {
    "bounds": [{ type: Input },],
    "componentRestrictions": [{ type: Input },],
    "types": [{ type: Input },],
    "place_changed": [{ type: Output, args: ['place_changed',] },],
    "initialized$": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$12 = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'paths',
    'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'options',
];
const OUTPUTS$12 = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick',
];
class Polygon extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'Polygon', INPUTS$12, OUTPUTS$12);
    }
}
Polygon.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map>polygon, ngui-map>map-polygon',
                inputs: INPUTS$12,
                outputs: OUTPUTS$12,
            },] },
];
/** @nocollapse */
Polygon.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$13 = [
    'clickable', 'draggable', 'editable', 'geodesic', 'icons', 'path', 'strokeColor',
    'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'options'
];
const OUTPUTS$13 = [
    'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'mousedown',
    'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'
];
class Polyline extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'Polyline', INPUTS$13, OUTPUTS$13);
    }
}
Polyline.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > polyline',
                inputs: INPUTS$13,
                outputs: OUTPUTS$13,
            },] },
];
/** @nocollapse */
Polyline.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$14 = [
    'selector', 'options',
    'addressControl', 'addressControlOptions', 'clickToGo', 'disableDefaultUI', 'disableDoubleClickZoom',
    'enableCloseButton', 'fullscreenControl', 'fullscreenControlOptions', 'imageDateControl', 'linksControl',
    'motionTracking', 'motionTrackingControl', 'panControl', 'panControlOptions', 'pano',
    'position', 'pov', 'scrollwheel', 'showRoadLabels', 'visible', 'zoomControl', 'zoomControlOptions'
];
const OUTPUTS$14 = [
    'closeclick', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'status_changed',
    'visible_changed', 'zoom_changed'
];
class StreetViewPanorama extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'StreetViewPanorama', INPUTS$14, OUTPUTS$14);
    }
    /**
     * @return {?}
     */
    initialize() {
        this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
        let /** @type {?} */ element;
        if (this.objectOptions.selector) {
            // noinspection TypeScriptValidateTypes
            element = document.querySelector(this['selector']);
            delete this.objectOptions.selector;
        }
        else {
            element = this.nguiMapComponent.el;
        }
        // will be set after geocoded
        typeof this.objectOptions.position === 'string' && (delete this.objectOptions.position);
        this.mapObject = new google.maps[this.mapObjectName](element, this.objectOptions);
        this.mapObject['mapObjectName'] = this.mapObjectName;
        this.mapObject['nguiMapComponent'] = this.nguiMapComponent;
        // set google events listeners and emits to this outputs listeners
        this.nguiMap.setObjectEvents(this.outputs, this, 'mapObject');
        this.nguiMapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
        this.initialized$.emit(this.mapObject);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.nguiMapComponent.el) {
            this.nguiMap.clearObjectEvents(this.outputs, this, 'mapObject');
        }
    }
}
StreetViewPanorama.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > street-view-panorama',
                inputs: INPUTS$14,
                outputs: OUTPUTS$14,
            },] },
];
/** @nocollapse */
StreetViewPanorama.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$15 = ['autoRefresh', 'options'];
const OUTPUTS$15 = [];
class TrafficLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'TrafficLayer', INPUTS$15, OUTPUTS$15);
    }
}
TrafficLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > traffic-layer',
                inputs: INPUTS$15,
                outputs: OUTPUTS$15,
            },] },
];
/** @nocollapse */
TrafficLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const INPUTS$16 = [];
const OUTPUTS$16 = [];
class TransitLayer extends BaseMapDirective {
    /**
     * @param {?} nguiMapComp
     */
    constructor(nguiMapComp) {
        super(nguiMapComp, 'TransitLayer', INPUTS$16, OUTPUTS$16);
    }
}
TransitLayer.decorators = [
    { type: Directive, args: [{
                selector: 'ngui-map > transit-layer',
                inputs: INPUTS$16,
                outputs: OUTPUTS$16,
            },] },
];
/** @nocollapse */
TransitLayer.ctorParameters = () => [
    { type: NguiMapComponent, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const COMPONENTS_DIRECTIVES = [
    NguiMapComponent, InfoWindow,
    Marker, Circle, CustomMarker, Polygon, InfoWindow, Polyline, GroundOverlay,
    TransitLayer, TrafficLayer, HeatmapLayer, BicyclingLayer, KmlLayer, DataLayer,
    StreetViewPanorama, PlacesAutoComplete, DirectionsRenderer,
    DrawingManager,
];
class NguiMapModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: NguiMapModule,
            providers: [
                { provide: NG_MAP_CONFIG_TOKEN, useValue: config }
            ],
        };
    }
}
NguiMapModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: COMPONENTS_DIRECTIVES,
                exports: [COMPONENTS_DIRECTIVES],
                providers: [
                    GeoCoder,
                    NavigatorGeolocation,
                    NguiMap,
                    OptionBuilder,
                    { provide: NgMapApiLoader, useClass: NgMapAsyncCallbackApiLoader },
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { BicyclingLayer, NavigatorGeolocation, OptionBuilder, NG_MAP_CONFIG_TOKEN, NgMapApiLoader, NgMapAsyncApiLoader, NgMapAsyncCallbackApiLoader, NguiMapComponent, InfoWindow, CustomMarker, Circle, DataLayer, DirectionsRenderer, DrawingManager, GeoCoder, GroundOverlay, HeatmapLayer, KmlLayer, Marker, NguiMap, PlacesAutoComplete, Polygon, Polyline, StreetViewPanorama, TrafficLayer, TransitLayer, NguiMapModule, BaseMapDirective as ɵa };
//# sourceMappingURL=ngui-map.js.map
