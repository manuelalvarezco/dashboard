import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup;


  constructor(private authService: AuthService,  private router:Router) { }

  ngOnInit() {

    // se realiza la validacón de la #forma
    this.forma = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")  ]),
      'password' : new FormControl('', [Validators.required, Validators.minLength(9)  ])
    })
  }

  login() {

    // libreria SweetAlert2
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere por favor'
    })

    // llamado al método login() en services/AuthService
    this.authService.login(this.forma.value)
    .subscribe( data =>{

      // Si se obtiene una respuesta positiva de la Api se cierra el Swal y se redirecciona al dashboard
      if(data.status){

        Swal.close()
        
        this.router.navigateByUrl('/home')

      }else{

        // si ocurre un error
        Swal.fire({
          icon:'error',
          title:'Usuario o contraseña incorrectos',
          text:'Ha ocurrido un error'
        })

      }
    })
   }

}
