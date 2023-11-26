import { Component } from '@angular/core';
import { DataState } from 'src/app/model/enume/data-state';

@Component({
  selector: 'app-billan',
  templateUrl: './billan.component.html',
  styleUrls: ['./billan.component.css']
})
export class BillanComponent {
billan: any;
billanAnnuelle() {
throw new Error('Method not implemented.');
}
billanMensuel() {
throw new Error('Method not implemented.');
}
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;

}
