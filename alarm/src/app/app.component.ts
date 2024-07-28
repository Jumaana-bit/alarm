import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule]
})
export class AppComponent implements OnInit {
  hourHandTransform: string = '';
  minuteHandTransform: string = '';
  secondHandTransform: string = '';

  now: Date = new Date();
  alarmTime: string = '';
  alarmMessage: string = '';
  alarmSet: boolean = false;

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours() % 12;

    const secAngle = sec * 6;
    const minAngle = min * 6;
    const hourAngle = (hour * 30) + (min * 0.5); // Corrected calculation

    this.secondHandTransform = `rotate(${secAngle}deg)`;
    this.minuteHandTransform = `rotate(${minAngle}deg)`;
    this.hourHandTransform = `rotate(${hourAngle}deg)`; // Apply corrected angle
    
    this.now = now;
    this.checkAlarm(now);
  }

  setAlarm() {
    if (this.alarmTime && this.alarmMessage) {
      this.alarmSet = true;
      alert(`Alarm set for ${this.alarmTime} with message: ${this.alarmMessage}`);
    } else {
      alert('Please set both alarm time and message.');
    }
  }

  checkAlarm(currentTime: Date) {
    if (this.alarmSet) {
      const [alarmHours, alarmMinutes] = this.alarmTime.split(':').map(Number);
      if (
        currentTime.getHours() === alarmHours &&
        currentTime.getMinutes() === alarmMinutes &&
        currentTime.getSeconds() === 0
      ) {
        this.triggerAlarm();
        this.alarmSet = false; // Reset the alarm
      }
    }
  }

  triggerAlarm() {
    const utterance = new SpeechSynthesisUtterance(this.alarmMessage);
    speechSynthesis.speak(utterance);
  }
}
