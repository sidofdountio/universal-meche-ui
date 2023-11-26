import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['up', 'date', 'label', 'productName', 'orldQuantity', 'orldPrice', 'orldAmount', 'newQuantity', 'newPrice', 'newAmount']
  dataSource = new MatTableDataSource<Inventory>(this.inventories);
  constructor(private inventoryService: InventoryService, private snackbarService: SnabarService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.onGetInventorie();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onGetInventorie(): void {
  this.state = DataState.LOADING_STATE;
    this.inventoryService.getInventories().subscribe(

      (response: Inventory[]) => {
        this.inventories = response;
        this.dataSource.data = response;
        this.state = DataState.LOADED_STATE;
        this.snackbarService.openSnackBar("Une Erreure Est Survenue", "Fermer");
      },
      (error: HttpErrorResponse) => {
        this.state = DataState.ERROR_STATE;
        this.snackbarService.openSnackBar("Une Erreure Est Survenue", "Fermer");
        console.log("Error code : %s", error.status);
      }
    )
  }

  ngOnDestroy(): void {
    // this.onGetInventorie();
  }
}
