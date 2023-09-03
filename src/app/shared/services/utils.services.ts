import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {

  range(start: number, end: number): number[] {
    let arrayTargetLength = [...Array(end).keys()]

    return arrayTargetLength.map(el => el + start)    // тут через мап сдвигаем каждый элемент на стартовое значение (напрмер массив от 5 до 10 если)
  }
}