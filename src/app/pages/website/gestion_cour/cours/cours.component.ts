import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourService} from '../../../../services/cour/cour.service';
import {Cour, PaiementType} from '../../../../model/cour.model';
import {environment} from '../../../../../environments/environment';

interface SearchParams {
  name?: string;
  category?: string;
  tag?: string;
  paiementType?: PaiementType;
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  params: SearchParams = {};

  startDate: Date = new Date();
  endDate: Date = new Date();
  cours: Cour[] = [];
  protected readonly environment = environment;
  showFilters: boolean = true;

  constructor(
    private courService: CourService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.params.category = params['category'] || '';
      this.params.name = params['name'] || '';
      this.params.paiementType = params['paiementType'] || '';
      this.searchCourses();
    });
  }

  searchCourses(): void {
    if (Object.keys(this.params).length > 0) {
      this.courService.searchCours(this.params).subscribe(courses => {
        this.cours = courses;
      });
    } else {
      this.loadCours();
    }
  }

  clearSearch(): void {
    this.params = {}; // Clear the search params
    this.loadCours(); // Reload courses after clearing search
    this.router.navigate(['/cours']); // Corrected routing syntax with an array
  }


  loadCours(): void {
    this.courService.getCours().subscribe(
      data => {
        this.cours = data;
      },
      err => {
        console.error('Error loading all courses:', err);
      }
    );
  }

  isSearchParamsEmpty(): boolean {
    return !this.params.name && !this.params.category && !this.params.tag && !this.params.paiementType;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.params.name = input;

    // Update queryParams in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {name: this.params.name}, // update only the 'name' query param
      queryParamsHandling: 'merge' // merge with the existing query params
    });

    this.searchCourses(); // Optionally call searchCourses() here
  }
}
