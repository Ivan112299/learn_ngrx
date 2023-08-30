import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorInterface } from "src/app/shared/types/backendError.interface";

@Component({
    selector: 'mc-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
    styleUrls: ['./backendErrorMessages.component.scss'],
  })

  export class BackendErrorMessagesComponent implements OnInit{

    @Input('backendErrors') backendErrorsProps: BackendErrorInterface | null  =  {}    // используем алиас в кавычках, переименование

    errorMessages!: string[]

    constructor(){}

    ngOnInit(): void {
			if (!this.backendErrorsProps) return;
			this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
				const messages = this.backendErrorsProps![name].join(', ')
				return `${name} ${messages}`
			}) 
    } 
  }