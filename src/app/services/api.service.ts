import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookDetails } from "../interfaces/interface";

@Injectable({
    providedIn : 'root'
})

export class ApiService {

    constructor(private readonly http : HttpClient ){}

    getBooksDetails(): Observable<BookDetails>{
        return this.http.get<BookDetails>('https://s3.amazonaws.com/api-fun/books.json')
    }

}