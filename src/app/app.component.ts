import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { WeatherModule } from "./weather/weather.module"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, WeatherModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "TekNews"
}
