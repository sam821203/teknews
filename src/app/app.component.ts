import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { WeatherModule } from "./weather/weather.module"
import { NotificationsModule } from "./notifications/notifications.module"

@Component({
  selector: "app-root",
  imports: [RouterOutlet, WeatherModule, NotificationsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "TekNews"
}
