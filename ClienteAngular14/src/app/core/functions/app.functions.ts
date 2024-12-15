import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';

export function isArrayNullOrEmpty(val: any[]): boolean {
  return val == null || val.length === 0;
}

export function compareObjects(obj1, obj2): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function dateStringToDateObject(date: string): Date {
  return new Date(date);
}

export function extractValueFromObservable(obs$: Observable<any>): any {
  let state = null;
  obs$.subscribe(s => state = s);
  return state;
}

export function isNotNullOrNotEmpty(val): boolean {
  return !isNullOrEmpty(val);
}

export function isNotNull(val): boolean {
  return val != null;
}

export function extractValueOrDefault(value: string, defaultValue?): string {
  if (isNotNullOrNotEmpty(value)) {
    defaultValue = value;
  }
  return defaultValue;
}

export function isNullOrEmpty(val: string): boolean {
  return val == null || val.toString().trim() === '';
}

export function toInteger(val: string): number {
  return Number(val) || 0;
}

export function isArrayNotNullOrEmpty(val: any[]): boolean {
  return !isArrayNullOrEmpty(val);
}

export function isNotNumber(val: string): boolean {
  return isNaN(Number(val));
}

export function isNumber(val: string): boolean {
  return !isNotNumber(val);
}

export function convertToString(value): string {
  return value != null ? value.toString() : value;
}

export function isObjectNotEmpty(obj): boolean {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return true;
    }
  }
  return false;
}

export function getDefaultPromissoryNoteDate(): Date {
  return today();
}

export function today(): Date {
  return new Date();
}

export function addDays(date: Date, days = 0): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateStringToUtcDateObject(date: string): Date {

  const reguarExp = new RegExp(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);

  if (reguarExp.test(date)) {
    const date1 = new Date(date);
    return new Date(date1.getTime() + date1.getTimezoneOffset() * 60000);
  }
  return new Date(date);
}

export function getDefaultExpirationDate(date: Date): Date {
  return addDays(date, 40);
}

export function formatToYyyyMmDd(date: Date): string {
  return formatDate(date, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'', 'en');
}

export function extractMainClassName(obj: any): string {
  return obj.constructor.toString().match(/\w+/g)[1];
}

export function extractClassName(obj: any): string {
  return obj.constructor.toString().match(/\w+/g)[4];
}


export function toPascalCase(input: string): string {
  let text = input;
  if (isNotNullOrNotEmpty(input)) {
    text = toLowerCase(input);
    text = text.split(' ')
      .map(token => token.charAt(0).toUpperCase() + token.substr(1).toLowerCase()).join(' ');
  }
  return text;
}

export function toLowerCase(input: string): string {
  if (isNotNullOrNotEmpty(input)) {
    return input.toLowerCase();
  }
  return input;
}
