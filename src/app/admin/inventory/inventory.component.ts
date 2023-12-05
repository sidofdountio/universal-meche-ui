import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { DataState } from 'src/app/model/enume/data-state';
import { Inventory } from 'src/app/model/inventory';
import { InventoryService } from 'src/app/service/imventory.service';
import { SnabarService } from 'src/app/service/snabar.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  isUp: boolean = true;
  inventories: Inventory[] = [];
  inventorySuject = new BehaviorSubject<Inventory[]>([]);
  displayedColumns: string[] = ['up', 'date', 'label', 'productName', 'orldQuantity', 'orldPrice', 'orldAmount', 'newQuantity', 'newPrice', 'newAmount']
  dataSource = new MatTableDataSource<Inventory>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private inventoryService: InventoryService,
    private snackbarService: SnabarService) { }


  ngOnInit(): void {
    this.onGetInventorie();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onGetInventorie(): void {
    this.state = DataState.LOADING_STATE;
    this.inventoryService.getInventories().subscribe(
      (response: Inventory[]) => {
        this.dataSource.data = response;
        this.inventorySuject.next(response);
        this.state = DataState.LOADED_STATE;
        this.snackbarService.openSnackBarSuccess("Etat De Stock Affiche", "Fermer");
      },
      () => {
        this.state = DataState.ERROR_STATE;
        this.snackbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");

      }
    )
  }


  ngOnDestroy(): void {
    // this.onGetInventorie();
  }


}
