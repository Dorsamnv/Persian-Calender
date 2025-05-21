import moment from 'moment';

declare module 'moment' {
    interface Moment {
        jYear(): number;
        jMonth(): number;
        jDate(): number;
        jDaysInMonth(): number;
        jWeek(): number;
        jWeekYear(): number;
        startOf(jUnit: 'jYear' | 'jMonth' | 'jWeek'): Moment;
        endOf(jUnit: 'jYear' | 'jMonth' | 'jWeek'): Moment;
        format(format: string): string;
        locale(locale: string): Moment;
        isSame(date: moment.Moment, unit?: string): boolean;
        add(amount: number, unit: string): Moment;
        subtract(amount: number, unit: string): Moment;
        clone(): Moment;
    }

    interface MomentStatic {
        loadPersian(options?: { dialect?: string; usePersianDigits?: boolean }): void;
    }
} 