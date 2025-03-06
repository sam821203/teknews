import { Injectable } from "@angular/core"
import { scan } from "rxjs/operators"
import { Observable, Subject } from "rxjs"

export interface Command {
  id: number
  type: "success" | "error" | "clear"
  text?: string
}

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  messagesInput: Subject<Command>
  messagesOutput: Observable<Command[]>

  constructor() {
    this.messagesInput = new Subject<Command>()
    this.messagesOutput = this.messagesInput.pipe(
      scan((messages: Command[], command: Command) => {
        if (command.type === "clear") {
          return messages.filter((message) => message.id !== command.id)
        } else {
          return [...messages, command]
        }
      }, [])
    )
  }

  addSuccess(message: string) {
    const id = this.randomId()
    this.messagesInput.next({ id, type: "success", text: message })
    setTimeout(() => {
      this.clearMessage(id)
    }, 5000)
  }

  addError(message: string) {
    const id = this.randomId()
    this.messagesInput.next({ id, type: "error", text: message })
    setTimeout(() => {
      this.clearMessage(id)
    }, 5000)
  }

  clearMessage(id: number) {
    this.messagesInput.next({ id, type: "clear" })
  }

  private randomId() {
    return Math.round(Math.random() * 10000)
  }
}
