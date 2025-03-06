import { Component, OnInit } from "@angular/core"
import { Command, NotificationsService } from "../notifications.service"
import { Observable } from "rxjs"

@Component({
  selector: "app-notification-list",
  standalone: false,
  templateUrl: "./notification-list.component.html",
  styleUrl: "./notification-list.component.scss",
})
export class NotificationListComponent implements OnInit {
  messages!: Observable<Command[]>

  constructor(private notificationsService: NotificationsService) {
    this.messages = this.notificationsService.messagesOutput
    setInterval(() => {
      this.notificationsService.addSuccess("Success message")
    }, 2000)
  }

  ngOnInit(): void {}

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id)
  }
}
