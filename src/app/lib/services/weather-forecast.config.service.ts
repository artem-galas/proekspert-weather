import { InjectionToken } from '@angular/core';

/**
 * WeatherForecastConfig
 *
 * @description
 * Represent type for {@link WeatherForecastConfigService}
 */
export interface WeatherForecastConfig {
  apiToken: string;
}

/**
 * WeatherForecastConfigService
 *
 * @description
 * Represent {@link InjectionToken} for API configuration.
 *
 * @example
 * ```
 * @NgModule({
 *   providers: [
 *     {
 *       provide: WeatherForecastConfigService
 *       useValue: {
 *         apiToken: yourApiToken
 *       }
 *     }
 *   ]
 * })
 * ```
 */
export const WeatherForecastConfigService = new InjectionToken<WeatherForecastConfig>('WeatherForecastConfig');
