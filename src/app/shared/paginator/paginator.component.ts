import { Component, Input, OnChanges, SimpleChanges } from "@angular/core"

@Component({
  selector: "app-paginator",
  standalone: false,
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.scss",
})
export class PaginatorComponent {
  @Input() numberOfPages!: number
  pageOptions: number[]

  currentPage = 1

  constructor() {
    this.pageOptions = []
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["numberOfPages"]) {
      this.updatePageOptions()
    }
  }

  updatePageOptions() {
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
    ].filter((pageNumber) => pageNumber >= 1 && pageNumber <= this.numberOfPages)
  }
}
