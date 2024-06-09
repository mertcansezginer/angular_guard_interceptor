import { Component, HostListener, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../../guards/form-guard.guard';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'] // Düzeltildi: styleUrl -> styleUrls
})
export class FormComponent implements OnInit, CanComponentDeactivate {

  form!: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Güncellendi
      password: ['', [Validators.required, Validators.minLength(6)]] // Eklendi
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Formu göndermedin, sayfa değiştirmek istediğinden emin misin?');
    }
    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }

  OnSubmit() {
    if (this.form.valid) {
      console.log("Veri gönderildi!", this.form.value); // Güncellendi
      // Add your login logic here
    } else {
      console.log("Form geçersiz");
    }
  }
}
