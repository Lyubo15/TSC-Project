import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {

  candidatures: any;

  constructor(
    private careerService: CareerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.careerService.getAllCandidatures().subscribe(candidatures => {
      this.candidatures = candidatures;
    })
  }

  deleteCandidature(id: string) {
    this.careerService.deleteCandidatureById(id).subscribe(() => {
       this.router.navigate(['/career']);
    })
  }
}
