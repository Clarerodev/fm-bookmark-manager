import { Component, inject } from '@angular/core';
import {Dialog, DialogModule} from '@angular/cdk/dialog'

@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  public dialog = inject(Dialog);
  
}
