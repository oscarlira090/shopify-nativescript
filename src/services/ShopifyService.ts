import { Http } from "@nativescript/core";

export default class ShopifyService {

    static STOREURL: string = "https://nativescript-store-1.myshopify.com/"
    //Api Key:Password = base64
    static BASIC_AUTHENTICATION = "OTQzYzJiMTAwZWFjMzZlNzdkNDJjYjg1OGEyNTEzNGQ6c2hwcGFfMzE2MWE1N2U0NDNmNzJjYmVlODA0OGU0NzM3YWU3MWE"

    static ViewProducts() {
        return Http.request({
            url: this.STOREURL + 'admin/api/2021-01/products.json',
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + this.BASIC_AUTHENTICATION,
                "Content-Type": "application/json"
            },
        });
    }

    static loadImageByProduct(product_id) {
        return Http.request({
            url: this.STOREURL + `admin/api/2021-01/products/${product_id}/images.json`,
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + this.BASIC_AUTHENTICATION,
                "Content-Type": "application/json"
            },
        });
    }

    static updateTitleProduct(product_id, data) {
        let product = {
            product:data
        }
        return Http.request({
            url: this.STOREURL + `admin/api/2021-01/products/${product_id}.json`,
            method: 'PUT',
            headers: {
                'Authorization': 'Basic ' + this.BASIC_AUTHENTICATION,
                "Content-Type": "application/json"
            },
            content: JSON.stringify(product)
        });
    }

    static deleteProduct(product_id) {
        return Http.request({
            url: this.STOREURL + `admin/api/2021-01/products/${product_id}.json`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + this.BASIC_AUTHENTICATION,
                "Content-Type": "application/json"
            },
        });
    }

    static addProduct(data) {
        let product = {
            product:data
        }
        return Http.request({
            url: this.STOREURL + `admin/api/2021-01/products.json`,
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + this.BASIC_AUTHENTICATION,
                "Content-Type": "application/json"
            },
            content: JSON.stringify(product)
        });
    }

}