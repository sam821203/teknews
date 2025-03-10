import { Component } from "@angular/core"
import { WeatherModule } from "./weather/weather.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { NewsApiModule } from "./news-api/news-api.module";

@Component({
  selector: "app-root",
  imports: [WeatherModule, NotificationsModule, NewsApiModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "TekNews"
}
