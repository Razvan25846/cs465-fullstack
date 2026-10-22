import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  trip: any = null;
  message = '';
  tripCode = 'HAW001';

  constructor(
    private tripData: TripData,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripCode =
      this.route.snapshot.queryParamMap.get('code') || 'HAW001';

    this.tripData.getTrip(this.tripCode).subscribe({
      next: (data) => {
        this.trip = {
          ...data,
          start: data.start ? data.start.substring(0, 10) : ''
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading trip:', err);
        this.message = 'Error loading trip.';
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    this.tripData.updateTrip(this.tripCode, this.trip).subscribe({
      next: (data) => {
        this.trip = {
          ...data,
          start: data.start ? data.start.substring(0, 10) : ''
        };
        this.message = 'Trip updated successfully!';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating trip:', err);
        this.message = 'Error updating trip.';
        this.cdr.detectChanges();
      }
    });
  }
}