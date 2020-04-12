import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { PhoneNumberPage } from './model/phoneNumberPage';
import { ApiServiceService } from './services/api-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phone-number-generator';
  generateForm: FormGroup;
  totalCombinations: number;
  items = [];
  phoneNumberPage: PhoneNumberPage;

  pager = {};
  pageOfItems = [];


  showResults: boolean;
  subItems: any[];
  nextPage: number;
  prevPage: number;
  lastPage: number;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiServiceService,
              private route: ActivatedRoute) { }

  dataSource: MatTableDataSource<string>;

  displayedColumns = ['phoneNbr'];
  ngOnInit() {
    this.buildGenerateForm();

    this.route.queryParams.subscribe(x => this.getPageClient(x.page || 1));

  }

  buildGenerateForm() {
    this.generateForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required,
      Validators.pattern('^(?:[0-9]{10}|[0-9]{7})$')
      ]]
    });
  }

  onSubmit() {
    const phoneNum = this.generateForm.get('phoneNumber').value;
    if (this.generateForm.invalid) {
      return;
    }

    this.getPageClient(0);
    this.showResults = true;

  }


  getPageClient(page: number): void {
    const phoneNum = this.generateForm.get('phoneNumber').value;

    if (page === undefined) {
      page = 0;
    }

    if (this.generateForm.invalid) {
      return;
    }
    this.apiService.getPaginatedPhoneNumber(phoneNum, page)
      .subscribe(data => {
        this.phoneNumberPage = data;

        this.totalCombinations = data.totalElements;
        this.lastPage = data.totalPages;
        this.dataSource = new MatTableDataSource(data.content);

        this.subItems = [];
        if (page % 10 < 6) {
          for (let i = +page; i < (+page + 10) && i < this.lastPage; i++) {
            this.subItems.push(i + 1);
          }
        } else {
          for (let i = +page - 5; i < (+page + 5) && i < this.lastPage; i++) {
            this.subItems.push(i);
          }
        }
        this.nextPage = +page + 1;
        this.prevPage = +page - 1;
        if (this.prevPage < 0) {
          this.prevPage = 0;
        }
        if (this.nextPage >= this.lastPage) {
          this.nextPage = this.lastPage - 1;
        }

        // console.log('Next Page :' , this.nextPage, ' Last Page :' , this.lastPage);

      });

  }

}
