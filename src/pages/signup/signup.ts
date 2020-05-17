import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	formGroup: FormGroup;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public formBuilder: FormBuilder
		) 
	{ 
		this.formGroup = this.formBuilder.group({
			nome: [
				'Teste', 
				[
					Validators.required, 
					Validators.minLength(5), 
					Validators.maxLength(120)
				]
			],

			email: [
				'mail@mail.com',
				[
					Validators.required,
					Validators.email
				]
			],

			tipo: ['1', [Validators.required]],

			cpfOuCnpj: [
				'61989762115', 
				[
					Validators.required,
					Validators.minLength(11),
					Validators.maxLength(14)
				]
			],

			senha: ['123', [Validators.required]],

			logradouro: ['Rua', [Validators.required]],

			numero: ['10', [Validators.required]],

			complemento:['Apto Xpto', []],

			bairro: ['Guará II', []],

			cep: ['71070000', [Validators.required]],

			telefone1: ['6199998525', [Validators.required]],

			telefone2: ['', []],

			telefone3: ['', []],

			estadoId: [null, [Validators.required]],

			cidadeId: [null, [Validators.required]]

		});
	}

	signupUser() {
		console.log("Enviou o Form");
	}

	//ionViewDidLoad() {
	//  console.log('ionViewDidLoad SignupPage');
	//}

}
