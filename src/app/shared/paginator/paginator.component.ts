import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core"

@Component({
  selector: "app-paginator",
  standalone: false,
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.scss",
})
export class PaginatorComponent implements OnChanges {
  @Input() numberOfPages!: number
  @Output() pageChange = new EventEmitter<number>()

  pageOptions: number[] = []
  currentPage = 1

  constructor() {
    this.pageOptions = []
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["numberOfPages"] && changes["numberOfPages"].currentValue) {
      this.updatePageOptions()
    }
  }

  updatePageOptions() {
    this.pageOptions = Array.from({ length: this.numberOfPages }, (_, i) => i + 1)
  }

  changePage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page
      this.pageChange.emit(this.currentPage)
    }
  }
}
