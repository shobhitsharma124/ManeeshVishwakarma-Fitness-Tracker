import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../_services";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "app-edit-appointment",
    templateUrl: "./edit-appointment.component.html",
    styleUrls: ["./edit-appointment.component.css"],
})
export class EditAppointmentComponent implements OnInit {
    constructor(private route: ActivatedRoute, private service: UserService,private toastr:ToastrService) {}
    id: number;
    actualData: any = null;
    editForm = new FormGroup({
      id: new FormControl(),
        firstname: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
        ]),
        lastname: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
        ]),
        age: new FormControl("", [
            Validators.required,
            Validators.min(18),
            Validators.max(60),
        ]),
        phonenumber: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        physiotherapist: new FormControl("", [Validators.required]),
        trainerpreference: new FormControl("", [Validators.required]),
        packages: new FormControl("", [Validators.required]),
        inr: new FormControl("", [Validators.required]),
        paisa: new FormControl("", [Validators.required]),
    });

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.service.getOneAppointment(+this.id).subscribe((data) => {
            this.actualData = data;

            delete this.actualData["streetaddress"];
            delete this.actualData["pincode"];
            delete this.actualData["city"];
            delete this.actualData["state"];
            delete this.actualData["country"];
            this.editForm.setValue(this.actualData);
        });
    }
    onSubmit() {
      console.log(this.editForm);
      if (this.editForm.status !== "INVALID") {
        this.toastr.success(
          "Appointment edited",
          "You have successfully edited an appointment"
        );
        this.service.editAppointment(this.editForm.value).subscribe(() => {
          console.log(`Appointment edited`);
        });
      } else {
        this.toastr.error("You have entered invalid data!", "Fatal");
      }
    }
}
