import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountsService{

    accounts = [
        {
          name: 'Master Account',
          status: 'active'
        },
        {
          name: 'Testaccount',
          status: 'inactive'
        },
        {
          name: 'Hidden Account',
          status: 'unknown'
        }
      ];

    statusUpdate = new EventEmitter<string>();

    constructor(private logservice: LoggingService){}

    addAccount(newAccont: {name:string, status: string}){
        //this.accounts.push({name, status});
        this.logservice.logStatusChange(newAccont.status);
        this.accounts.push(newAccont);
    }

    updateStatus(updInfo: {id:number, status: string}){
        this.logservice.logStatusChange(updInfo.status);
        this.accounts[updInfo.id].status = updInfo.status;
    };
}