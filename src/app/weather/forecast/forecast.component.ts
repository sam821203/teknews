import { Component, OnInit } from "@angular/core"
import { ForecastService } from "../forecast.service"

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrl: "./forecast.component.scss",
})
export class ForecastComponent implements OnInit {
  constructor(private forecastService: ForecastService) {}

  ngOnInit() {
    this.forecastService.getCurrentLocation().subscribe((coords) => {
      console.log(coords)
    })
  }
}
