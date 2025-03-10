import { Component } from "@angular/core"
import { Article, NewsApiService } from "../news-api.service"

@Component({
  selector: "app-na-article-list",
  standalone: false,
  templateUrl: "./na-article-list.component.html",
  styleUrl: "./na-article-list.component.scss",
})
export class NaArticleListComponent {
  articles: Article[] = []
  totalNumberOfPages = 0

  constructor(private newsApiService: NewsApiService) {
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles
    })

    this.newsApiService.getPage(1)
  }
}
