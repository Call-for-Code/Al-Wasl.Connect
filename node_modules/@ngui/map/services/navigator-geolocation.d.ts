import { Observable } from 'rxjs';
import { IJson } from './util';
/**
 *  service for navigator.geolocation methods
 */
export declare class NavigatorGeolocation {
    getCurrentPosition(geoLocationOptions?: IJson): Observable<any>;
}
