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
  MatSnackBarModule
 } from "@angular/material";

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
  MatSnackBarModule
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
