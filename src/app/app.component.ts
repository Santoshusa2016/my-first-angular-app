import { Component, OnInit } from "@angular/core";
import { AccountsService } from "./shared/accounts.service";
import { AuthService } from "./auth/auth-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Max";
  loadedFeature = "receipe";

  // chapter05: dataBinding
  serverElements = [
    { type: "server", name: "RND", content: "processing DEV server" },
  ];

  onServerAdded(serverData: { servername: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.servername,
      content: serverData.serverContent,
    });
  }

  onBlueprintAdded(blueprintData: {
    servername: string;
    serverContent: string;
  }) {
    this.serverElements.push({
      type: "blueprint",
      name: blueprintData.servername,
      content: blueprintData.serverContent,
    });
  }

  onChangeName() {
    console.log("server-element-component: ngOnChanges() called");
    this.serverElements[0].name = "Changed!";
  }

  onDestroy() {
    console.log("server-element-component: ngOnDestroy() called");
    this.serverElements.splice(0, 1);
  }

  //chapter06: components & databinding
  onNavigate(feature: string): void {
    this.loadedFeature = feature;
  }

  //chapter07: directives
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = true;
  value = 5;

  // chapter09: services & DI
  accounts: { name: string; status: string }[];

  constructor(
    private accountsSvc: AccountsService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.accounts = this.accountsSvc.accounts; //reference type
    this.authSvc.autoLogin(); //sect20:305
  }
}
