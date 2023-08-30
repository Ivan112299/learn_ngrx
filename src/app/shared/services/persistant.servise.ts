import { Injectable } from "@angular/core";

@Injectable()
export class PersistantService {

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (err) {
      console.error('Ошибка сохранения дынных в localStorage', err)
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '')
    } catch(err) {
      console.error('Ошибка извлечения дынных из localStorage', err)
      return null     
    }
  }
}