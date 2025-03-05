import { Component, OnInit } from "@angular/core"
import { ForecastService } from "../forecast.service"
import { CommonModule } from "@angular/common"
import { EMPTY, Observable } from "rxjs"

interface ForecastData {
  dateString: string
  temp: number
}

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrl: "./forecast.component.scss",
  imports: [CommonModule],
})
export class ForecastComponent implements OnInit {
  // 加$表示這是一個Observable物件
  forecast$: Observable<ForecastData[]> = EMPTY

  constructor(forecastService: ForecastService) {
    this.forecast$ = forecastService.getForecast()
  }

  ngOnInit() {}
}
