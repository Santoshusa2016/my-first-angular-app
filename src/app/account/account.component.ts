import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountsService } from '../shared/accounts.service';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  //providers:[LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  onSetTo(status: string) {
    this.accountsService.updateStatus({id: this.id, status: status});
    this.accountsService.statusUpdate.emit(status); //emit event
    this.loggingService.logStatusChange(status);
  }

  constructor(private loggingService: LoggingService,
    private accountsService: AccountsService) {}
}

//before
/*
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();


  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    console.log('A server status changed, new status: ' + status);
  }
}*/