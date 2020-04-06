import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SetKeyAction } from '../../store/steam/steam.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  credentials = { key: null };

  form: FormGroup = new FormGroup({
    key: new FormControl(this.credentials.key, Validators.required),
  });

  constructor(private store: Store, private router: Router) {}

  private getKeyControl() {
    return this.form.controls.key;
  }

  isKeyError() {
    return this.getKeyControl().errors && this.getKeyControl().errors.required;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(new SetKeyAction(this.getKeyControl().value));

    this.router.navigate(['summary']);
  }
}
