import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../_services";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
  styleUrls:['./place-fitness-trainer-appointment.component.css']
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  @Output() fitnessdata = new EventEmitter<Fitness>();
  fitnessForm: FormGroup;
  public obj: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSer: UserService
  ) {}

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      age: ["", [Validators.required]],
      streetaddress: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      trainerpreference: ["", [Validators.required]],
      physiotherapist: ["", [Validators.required]],
      inr: ["", [Validators.required]],
      paisa: ["", [Validators.required]],
      packages: ["", [Validators.required]],
    });

    // console.log(this.fitnessdata);
  }

  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    // this.fitnessForm.value.inr = 500;
    // this.fitnessForm.value.paisa = 0;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );
    console.log("FORM STATUS ===>>>> ", this.fitnessForm.status);
    if (this.fitnessForm.status == "VALID") {
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,
          this.fitnessForm.value.packages
        )
      );
      this.userSer.postfitnessdata(this.fitnessForm.value).subscribe(
        (success) => {
          console.log(success);
          this.router.navigateByUrl("/view-appointment");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}