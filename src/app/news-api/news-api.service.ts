import { HttpParams, HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"

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
  private apiKey = "09e2feef919947ada53a78fa96a16231"
  private country = "us"

  private pagesInput: Subject<number>
  pagesOutput: Observable<Article[]>
  numberOfPages: Subject<number>

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject()

    this.pagesInput = new Subject()
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set("apiKey", this.apiKey)
          .set("country", this.country)
          .set("pageSize", this.pageSize.toString())
          .set("page", page.toString())
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params })
      }),
      tap((resp) => {
        const totalPages = Math.ceil(resp.totalResults / this.pageSize)
        this.numberOfPages.next(totalPages)
      }),
      map((resp) => resp.articles ?? [])
    )
  }

  getPage(page: number) {
    this.pagesInput.next(page)
  }
}
