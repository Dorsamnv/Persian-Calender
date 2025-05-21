import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import moment from 'moment-jalaali';

interface CalendarDay {
  jDay: number;
  gDay: number;
  gMonth: number;
  gYear: number;
  isToday: boolean;
}

@Component({
  selector: 'app-calender',
  imports: [CommonModule, FormsModule, MatSelectModule, MatButtonModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css'
})
export class CalenderComponent implements OnInit {
onEndYearChange(arg0: any) {
throw new Error('Method not implemented.');
}
onStartYearChange(arg0: any) {
throw new Error('Method not implemented.');
}
onEndMonthChange(arg0: any) {
throw new Error('Method not implemented.');
}
onStartMonthChange(arg0: any) {
throw new Error('Method not implemented.');
}
  currentDate = moment().locale('fa');
  moment = moment;
  days: (CalendarDay | null)[] = [];
  monthName = '';
  year = 0;
  years: number[] = [];
  weekdays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
startMonth: any;
endMonth: any;
startYear: any;
endYear: any;

  ngOnInit(): void {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
    this.generateYears();
    this.generateCalendar();
  }

  toPersianNumber(num: number): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, (w) => persianDigits[+w]);
  }

  generateYears(): void {
    const currentYear = moment().jYear();
    // Generate years from 10 years before to 10 years after current year
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      this.years.push(i);
    }
  }

  generateCalendar(): void {
    const startOfMonth = this.currentDate.clone().startOf('jMonth');
    const endOfMonth = this.currentDate.clone().endOf('jMonth');
    const daysInMonth = endOfMonth.jDate();
    
    // Get the correct day of week (0 = Saturday, 6 = Friday)
    let startDay = startOfMonth.day();
    startDay = (startDay + 1) % 7; // Convert to Persian calendar days

    this.year = this.currentDate.jYear();
    this.monthName = this.months[this.currentDate.jMonth()];

    const jalaliDays: (CalendarDay | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      jalaliDays.push(null);
    }

    // Add days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const jDate = moment(`${this.year}/${this.currentDate.jMonth() + 1}/${d}`, 'jYYYY/jM/jD').locale('fa');
      const gDate = jDate.clone().locale('en');

      jalaliDays.push({
        jDay: d,
        gDay: gDate.date(),
        gMonth: gDate.month() + 1,
        gYear: gDate.year(),
        isToday: jDate.isSame(moment(), 'day')
      });
    }

    this.days = jalaliDays;
  }

  onYearChange(newYear: number): void {
    this.currentDate.jYear(newYear);
    this.generateCalendar();
  }

  onMonthChange(newMonth: number): void {
    this.currentDate.jMonth(newMonth);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.add(1, 'jMonth');
    this.generateCalendar();
  }

  prevMonth(): void {
    this.currentDate.subtract(1, 'jMonth');
    this.generateCalendar();
  }

  goToToday(): void {
    this.currentDate = moment().locale('fa');
    this.generateCalendar();
  }

  getEnglishDate(): string {
    return moment().locale('en').format('dddd, MMMM D, YYYY');
  }
}
