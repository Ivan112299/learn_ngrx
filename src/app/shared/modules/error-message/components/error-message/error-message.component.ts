import { ErrorMessageModule } from './../../error-message.module';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-error-message',
  template: '<div>{{messageProps}}</div>',
})
export class ErrorMessageComponent {

  @Input('message') messageProps: string  = 'Какая то ошибка'
}
