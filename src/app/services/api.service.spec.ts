import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { BookDetails } from '../interfaces/interface';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should fetch book details', () => {
    const dummyBookDetails: BookDetails = {
      data: {
        author : '',
        birthday : '',
        birthPlace : '',
        books: [

        ],
      },
      status: 'success',
    };

    apiService.getBooksDetails().subscribe((bookDetails) => {
      expect(bookDetails).toEqual(dummyBookDetails);
    });

    const req = httpTestingController.expectOne('https://s3.amazonaws.com/api-fun/books.json');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyBookDetails);
  });
});
