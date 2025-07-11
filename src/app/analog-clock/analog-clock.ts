import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-analog-clock',
  imports: [CommonModule],
  templateUrl: './analog-clock.html',
  styleUrl: './analog-clock.scss'
})
export class AnalogClock implements OnInit {
  hourStyle!: string;
  minuteStyle!: string;
  secondStyle!: string;
  now: Date = new Date();
  intervalId: any;
  currentWeekday: string = "";
  currentDate: string = "";
  notes: any[] | undefined;
  @Input() clockFace: string = '/images/clockface/GoldenNumbers.png';

  

  ngOnInit() {
    this.runClock();
    this.getDateAndDay();
  }

  runClock() {
    this.intervalId = setInterval(() => {
      this.now = new Date();

      const hours = this.now.getHours();
      const minutes = this.now.getMinutes();
      const seconds = this.now.getSeconds();

      // 🔥 Winkel richtig berechnen
      const hourAngle = ((hours % 12) + minutes / 60) * 30; // Stunden + Minutenanteil
      const minuteAngle = (minutes + seconds / 60) * 6;     // Minuten + Sekundenanteil
      const secondAngle = seconds * 6;                      // Sekunden

      // 🧠 90° abziehen, weil rotate(0deg) auf 3 Uhr zeigt
      this.hourStyle = `rotate(${hourAngle - 90}deg)`;
      this.minuteStyle = `rotate(${minuteAngle - 90}deg)`;
      this.secondStyle = `rotate(${secondAngle - 90}deg)`;
    }, 1000);
  }

  getDateAndDay() {
    this.currentWeekday = this.now.toLocaleDateString(undefined, { weekday: 'long' });
    const day = String(this.now.getDate()).padStart(2, '0');
    const month = String(this.now.getMonth() + 1).padStart(2, '0');
    const year = this.now.getFullYear();

    this.currentDate = `${day}.${month}.${year}`;
  }
}