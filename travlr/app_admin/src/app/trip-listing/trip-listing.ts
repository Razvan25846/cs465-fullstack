import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: any[] = [];

  constructor(
    private tripData: TripData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripData.getTrips().subscribe({
      next: (data) => {
        console.log('Trips received from API:', data);
        this.trips = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error retrieving trips:', err);
      }
    });
  }
}