import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './components/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SteamModule { }
