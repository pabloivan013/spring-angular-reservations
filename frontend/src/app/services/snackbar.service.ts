import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this.show(message, 'success')
  }

  error(message: string) {
    this.show(message, 'error')
  }

  private show(message: string, type: string) {
    this._snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: ["snackbar", type],
    })
  }

}
