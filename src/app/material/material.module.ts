// modulo padre de Angular Material
// Aqui se incluyen los modulos que se utilizarán en los componentes
import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTableModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatRadioModule
 } from "@angular/material";
 import {ScrollingModule} from '@angular/cdk/scrolling';

 const material = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTableModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatRadioModule,
  ScrollingModule
]

@NgModule({
  imports: [
    material
  ],
  exports:[
    material
  ]
})
export class MaterialModule { }
