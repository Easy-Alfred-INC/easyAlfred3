import Config from './config'

const routes = {
	getRecord: (module, id) => `${module}${id ? '/' + id : ''}`,
	searchByCriteria: (module, criteria, value) => `${module}/search?${criteria}=${value}`,
	postRecord: module => `${module}`,
	putRecord: (module, id) => `${module}/${id}`
};

export default class ZService {

    constructor() {
        this.zConfig = new Config();
        this.baseApi = '/crm/v2/';
        this.authorizationHeader = `Zoho-oauthtoken ${this.zConfig.token}`;
    }

    getRecord(module){
        fetch(`${this.baseApi}${routes.getRecord(module)}`, {
			headers: {
				Authorization: this.authorizationHeader
			}
		}).then(response => {
            response
				.json()
				.then(data => {
					return data;
				})
				.catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    }

    getSpecificRecord(module,id){
        fetch(`${this.baseApi}${routes.getRecord(module, id)}`, {
			headers: {
				Authorization: this.authorizationHeader
			}
		}).then(response => {
				response
					.json()
					.then(data => {
						return data;
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
    }


    async getRecordByCriteria(module,criteria,value){
       return await fetch(`${this.baseApi}${routes.searchByCriteria(module, criteria, value)}`, {
			headers: {
				Authorization: this.authorizationHeader
			}
		})
			.then(response => {
				return response
					.json()
					.then(data => {
						return data;
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
    }

	putRecord(module, body, id){
		let requestBody = {};
		requestBody['data'] = [body];
		fetch(`${this.baseApi}${routes.putRecord(module,id)}`, {
			method: 'PUT',
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: this.authorizationHeader
			}
		})
			.then(response => {
				response
					.json()
					.then(data => {
						return data;
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

    postRedord(module,body){
        let requestBody = {};
        requestBody['data'] = [body];
        fetch(`${this.baseApi}${routes.postRecord(module)}`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				Authorization: this.authorizationHeader
			}
		})
			.then(response => {
				response
					.json()
					.then(data => {
						return data;
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
    }

}