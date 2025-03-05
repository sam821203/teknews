import { HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"

interface Coordinates {
  latitude: number
  longitude: number
  altitude?: number | null
  accuracy: number
  altitudeAccuracy?: number | null
  heading?: number | null
  speed?: number | null
}

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  constructor() {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set("lat", String(coords.latitude))
          .set("lon", String(coords.longitude))
          .set("units", "metric")
          .set("appid", "56aa1410c336611a2bf0e537ffffd428")
      })
    )
  }

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords)
          observer.complete()
        },
        (err) => observer.error(err)
      )
    })
  }
}
