import { Component} from '@angular/core';
import { AccountsService } from '../shared/accounts.service';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount({name: accountName, status: accountStatus});
    this.loggingService.logStatusChange(accountStatus);
  }

  constructor(private loggingService: LoggingService,
    private accountsService: AccountsService) {
      this.accountsService.statusUpdate.subscribe(
        (status:string) => alert('New status: ' + status);
      );
    }
}

//before
/* 
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    console.log('A server status changed, new status: ' + accountStatus);
  }
}
*/
