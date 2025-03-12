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
  totalNumberOfPages = 1
  currentPage = 1
  currentCategory: "general" | "technology" = "general"
  loading = false

  constructor(private newsApiService: NewsApiService) {
    // 監聽新聞列表更新
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles
    })

    // 監聽總頁數變化
    this.newsApiService.numberOfPages.subscribe((totalPages) => {
      this.totalNumberOfPages = totalPages
    })

    // 監聽 loading 狀態
    this.newsApiService.loading.subscribe((loading) => {
      this.loading = loading
    })

    this.fetchArticles(1, "general")
  }

  fetchArticles(page: number, category: "general" | "technology") {
    if (this.currentCategory !== category) {
      this.currentPage = 1
      this.currentCategory = category
      this.newsApiService.setCategory(category)
    }
    this.newsApiService.getPage(page)
  }

  switchCategory(category: "general" | "technology") {
    this.fetchArticles(1, category)
  }
}
