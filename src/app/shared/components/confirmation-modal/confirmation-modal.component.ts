import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, MatButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent implements OnInit {

  modalContent: string = "";
  modalConfirm: boolean = false;

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) {}


  ngOnInit(): void {
    const {modalContent} = this.data;

    this.modalContent = modalContent;
  }

  public onNoClick() {
    this.modalConfirm = false;
    this.dialogRef.close(this.modalConfirm);
  }

  public confirm() {
    this.modalConfirm = true;
    this.dialogRef.close(this.modalConfirm);
  }
}
