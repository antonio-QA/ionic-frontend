import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	formGroup: FormGroup;
	estados: EstadoDTO[];
	cidades: CidadeDTO[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public formBuilder: FormBuilder,
		public cidadeService: CidadeService,
		public estadoService: EstadoService,
		public clienteService: ClienteService,
		public alertCtrl: AlertController
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

	ionViewDidLoad() {

		let estado_id = this.formGroup.value.estadoId;

		this.estadoService.findAll(estado_id)
		.subscribe(response => {
			this.estados = response;
			this.formGroup.controls.estadoId.setValue(this.estados[0].id);
			this.updateCidades();
		},
		error => { });

	}

	updateCidades() {

		let estado_id = this.formGroup.value.estadoId;

		this.cidadeService.findAll(estado_id)
		.subscribe(response => {
			this.cidades = response;
			this.formGroup.controls.cidadeId.setValue(null);
		},
		error => { });

	}

	signupUser() {

		this.clienteService.insert(this.formGroup.value)
		.subscribe(response => {
			this.showInsertOk();
		},
		error => { });

	}

	showInsertOk() {

		let alert = this.alertCtrl.create({

			title: 'Sucesso!',
			message: 'Cadsatro Realizado com Sucesso!',
			enableBackdropDismiss: false,
			buttons: [
				{
					text: 'Ok',
					handler: () => {
						this.navCtrl.pop();
					}
				}
			]

		});
		alert.present();

	}

	//ionViewDidLoad() {
	//  console.log('ionViewDidLoad SignupPage');
	//}

}
