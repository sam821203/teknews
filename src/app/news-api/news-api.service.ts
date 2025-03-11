import { HttpParams, HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, Subject } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"
import { environment } from "../../environments/environment"

export interface Article {
  url: string
  title: string
  source: {
    name: string
  }
}

interface NewsApiResponse {
  totalResults: number
  articles: Article[]
}

@Injectable({
  providedIn: "root",
})
export class NewsApiService {
  private url = "https://newsapi.org/v2/top-headlines"
  private pageSize = 10
  private apiKey = environment.apiKey
  private country = "us"

  private pagesInput: BehaviorSubject<number>
  private categoryInput: BehaviorSubject<string>
  pagesOutput: Observable<Article[]>
  numberOfPages: Subject<number>

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject()
    this.pagesInput = new BehaviorSubject<number>(1)
    this.categoryInput = new BehaviorSubject<string>("general")

    this.pagesOutput = this.pagesInput.pipe(
      switchMap((page) => {
        const category = this.categoryInput.getValue()
        const params = new HttpParams()
          .set("apiKey", this.apiKey)
          .set("country", this.country)
          .set("category", category)
          .set("pageSize", this.pageSize.toString())
          .set("page", page.toString())

        return this.http.get<NewsApiResponse>(this.url, { params })
      }),
      tap((resp) => {
        const totalPages = Math.ceil(resp.totalResults / this.pageSize)
        this.numberOfPages.next(totalPages)
      }),
      map((resp) => {
        let articles = resp.articles ?? []
        const totalPages = Math.ceil(resp.totalResults / this.pageSize)

        // 只有當不是最後一頁時，才補足 empty 文章
        if (this.pagesInput.getValue() < totalPages) {
          while (articles.length < this.pageSize) {
            articles.push({
              url: "#",
              title: "No Article Available",
              source: { name: "N/A" },
            })
          }
        }

        return articles
      })
    )
  }

  getPage(page: number) {
    this.pagesInput.next(page)
  }

  setCategory(category: string) {
    this.categoryInput.next(category)
  }
}
