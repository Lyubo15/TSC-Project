import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../career.service';

@Component({
  selector: 'app-details-candidature',
  templateUrl: './details-candidature.component.html',
  styleUrls: ['./details-candidature.component.css']
})
export class DetailsCandidatureComponent implements OnInit {

  candidature: any;
  loading: boolean;

  constructor(
    private careerService: CareerService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.careerService.getCandidatureById(id).subscribe(candidature => {
      this.candidature = candidature;
    });
  }
}
