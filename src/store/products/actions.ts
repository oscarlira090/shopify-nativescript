import * as types from './mutation-types'
import ShopifyService from "../../services/ShopifyService";

export const load = ({ commit }) => {
    return new Promise((resolve, reject) => {
        ShopifyService.ViewProducts().then(function (data) {
            let content = JSON.parse(data.content+"");
            content.products.forEach(p => {
                commit(types.ADD, {
                    id: p.id,
                    title: p.title,
                    body_html: p.body_html == null ? '':p.body_html
                })
            });
            resolve(true)
        });
    });
}

export const loadImageByProduct = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        ShopifyService.loadImageByProduct(data.id).then(function (data) {
            if(data.statusCode == 200){
                let content = JSON.parse(data.content+"");  
                resolve(content.images[0].src)//return first image
            }else
                reject('error')
        });
    });
}

export const updateTitleProduct = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        let product = data;
        ShopifyService.updateTitleProduct(product.id,product).then(function (data) {
            if(data.statusCode == 200){
                commit(types.UPDATE, product)
                resolve(true)
            }
            else
                reject('error')
        });
    });
}

export const addProductTittle = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        let product = data;
        ShopifyService.addProduct(product).then(function (data) {
            let content = JSON.parse(data.content+"");
            if(data.statusCode == 201){
                commit(types.ADD, {
                    id:content.product.id,
                    title:content.product.title,
                    body_html: content.body_html == null ? '':content.body_html
                })
                resolve(true)
            }
            else
                reject('error')
        });
    });
}

export const deleteProduct = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        let product = data;
        ShopifyService.deleteProduct(product.id).then(function (data) {
            if(data.statusCode == 200){
                commit(types.DELETE, product)
                resolve(true)
            }
            else
                reject('error')
        });
    });
}
