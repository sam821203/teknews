import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs"
import { map, switchMap, share, mergeMap, filter, toArray, tap, catchError, retry } from "rxjs/operators"
import { NotificationsService } from "../notifications/notifications.service"

interface Coordinates {
  latitude: number
  longitude: number
  altitude?: number | null
  accuracy: number
  altitudeAccuracy?: number | null
  heading?: number | null
  speed?: number | null
}

interface OpenWeatherResponse {
  list: {
    dt_txt: string
    main: {
      temp: number
    }
    weather: { icon: string }[]
  }[]
}

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  private url = "https://api.openweathermap.org/data/2.5/forecast"

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set("lat", String(coords.latitude))
          .set("lon", String(coords.longitude))
          .set("units", "metric")
          .set("appid", "56aa1410c336611a2bf0e537ffffd428")
      }),
      switchMap((params) => this.http.get<OpenWeatherResponse>(this.url, { params })),
      map((resp) => resp.list),
      mergeMap((value) => of(...value)),
      filter((_, index) => index % 8 === 0),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
          icon: value.weather[0].icon,
        }
      }),
      toArray(),
      share()
    )
  }

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      console.log("Getting location...")
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords)
          observer.complete()
        },
        (err) => observer.error(err)
      )
    }).pipe(
      retry(1),
      tap({
        next: () => {
          this.notificationsService.addSuccess("Got your location")
        },
      }),
      catchError((err) => {
        this.notificationsService.addError("Failed to get your location")
        return throwError(() => err)
      })
    )
  }
}
