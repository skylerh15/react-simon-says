export function addYearsToToday(years: number): Date {
    const dt = new Date();
    return new Date(dt.setFullYear(dt.getFullYear() + years));
}
