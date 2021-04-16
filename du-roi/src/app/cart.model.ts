import { Api } from "./api/api";
import { Item } from "./item.model";

export class Cart {
    private _items : Item[] = [];
    private _totalsum : number = 0;

    get items()
    {
        return this._items;
    }
    
    get totalSum()
    {
        return this._totalsum;
    }

    set totalSum(value : number)
    {
        this._totalsum = value;
    }

    calculateSum()
    {
        this._totalsum = 0;
        this._items.forEach(element => {
            this._totalsum += element.price;
        });
    }

    addItem(nItem : Item)
    {
        this._items.push(nItem);
        this.calculateSum();
    }

    static async addToCart(nUserId: string, nProductId : string)
    {
        const api = Api.getApi();
        const postData = {user_id: nUserId, product_id: nProductId};

        let result = await api.post('/cart/add', postData).then((response) => {

            return response.data.error ? 0 : 1;
        });
        return result;
    }

    static async getCartFromUser(nUserId : string)
    {
        const api = Api.getApi();

        let cart;
        await api.get('/cart/get/' + nUserId).then((response) => {

            cart = new Cart();
            //aanmaken cart item
            if (response.data.result == false)
                return;

            response.data.result.forEach(async element => { // loop alle elementen binnen de item tabel

                // this._items.push(new Item(element.id, element.name, element.description, element.image, element.price));


                await Item.getItem(element.product_id).then(item => {

                    item.cart_id = element.id;
                    cart.addItem(item);
                });

                // fout, moet eerst opvragen items.
                // cart.addItem(new Item(element.id, element.name, element.description, element.image, element.price))
        
              });
        });
        return cart;
    }

    static async deleteFromCart(nId : string)
    {
        const api = Api.getApi();
        const postData = {id: nId};

        let result = await api.post('/cart/delete', postData).then((response) => {

            return response.data.error ? 0 : 1;
        });
        return result
    }

    static async payCart(nUserId: string)
    {
        const api = Api.getApi();
        const postData = {user_id: nUserId};

        let result = await api.post('/cart/pay', postData).then((response) => {

            return response.data.error ? 0 : 1;
        });
        return result
    }


}
