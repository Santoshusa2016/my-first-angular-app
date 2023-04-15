import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    //observing for dynamic data from server-resolver. 
    //The mapping is done in app-routes.module.ts
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];
        }
      );

    /*by adding + we can convert int to string
     */
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
  }

  //edit server
  onEdit() {
    this.router.navigate(
      ['edit', this.server.id], 
      {
        relativeTo: this.route, 
        queryParamsHandling: 'preserve'
      });
  }

}
