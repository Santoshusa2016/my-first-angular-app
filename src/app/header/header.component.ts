import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataService: DataStorageService) {}
  onSelect(feature: string): void {
    //emit dropdown menu selected
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    debugger;
    this.dataService.storeRecipes();
  }

  onFetchData() {
    this.dataService.fetchRecipes().subscribe();
  }
}
