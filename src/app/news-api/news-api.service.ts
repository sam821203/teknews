import { HttpParams, HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, BehaviorSubject, Subject, of } from "rxjs"
import { catchError, delay, map, retry, switchMap, tap } from "rxjs/operators"
import { environment } from "../../environments/environment.prod"

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
  private url = "/api/news"
  private pageSize = 10
  private apiKey = environment.API_KEY
  private country = "us"

  private pagesInput: BehaviorSubject<number>
  private categoryInput: BehaviorSubject<string>
  pagesOutput: Observable<Article[]>
  numberOfPages: Subject<number>
  loading: Subject<boolean>

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject()
    this.loading = new Subject<boolean>()
    this.pagesInput = new BehaviorSubject<number>(1)
    this.categoryInput = new BehaviorSubject<string>("general")

    this.pagesOutput = this.pagesInput.pipe(
      tap(() => this.loading.next(true)),
      switchMap((page) => {
        const category = this.categoryInput.getValue()
        const params = new HttpParams()
          .set("apiKey", this.apiKey)
          .set("country", this.country)
          .set("category", category)
          .set("pageSize", this.pageSize.toString())
          .set("page", page.toString())
        return this.http.get<NewsApiResponse>(this.url, { params }).pipe(
          retry({
            count: 5,
            delay: (error, index) => {
              if (error.status === 429) {
                return of(error).pipe(delay(1000 * Math.pow(2, index)))
              }
              return of(error)
            },
          }),
          catchError((error) => {
            console.error("API request failed:", error)
            return of({ totalResults: 0, articles: [] } as NewsApiResponse)
          })
        )
      }),
      tap(() => this.loading.next(false)),
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
