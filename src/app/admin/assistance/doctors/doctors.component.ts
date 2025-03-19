import { Component } from '@angular/core';
import { DoctorsService } from '@services/admin/doctors.service';

@Component({
  selector: 'app-doctors',
  imports: [],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export default class DoctorsComponent {
  constructor(private _doctorsService: DoctorsService) {}

  getList() {
    this._doctorsService.getlist({}).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.getList();
  }
}
