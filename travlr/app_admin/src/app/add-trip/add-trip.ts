import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  message = '';

  constructor(private tripData: TripData) {}

  onSubmit(): void {
    this.tripData.addTrip(this.trip).subscribe({
      next: () => {
        this.message = 'Trip added successfully!';
      },
      error: (err) => {
        console.error('Error adding trip:', err);
        this.message = 'Error adding trip.';
      }
    });
  }
}