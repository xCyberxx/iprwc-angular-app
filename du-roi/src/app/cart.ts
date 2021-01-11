import { Api } from "./api/api";
import { Item } from "./item.model";

export class Cart {
    private _items : Item[] = [];

    get items()
    {
        return this._items;
    }

    addItem(nItem : Item)
    {
        this._items.push(nItem);
    }

    static async addToCart(nUserId: string, nProductId : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {user_id: nUserId, product_id: nProductId};
        console.log(postData);
        await api.post('/cart/add', postData).then((response) => {
            console.log("Created itemcart");
        });
        return 1
    }

    static async getCartFromUser(nUserId : string)
    {
        const api = Api.getApi();
        // const postData = {user_id: nUserId};
        // console.log(postData);
        let cart;
        await api.get('/cart/get/' + nUserId).then((response) => {
            console.log("got cart items");
            console.log(response);
            cart = new Cart();
            //aanmaken cart item
            response.data.result.forEach(async element => { // loop alle elementen binnen de item tabel
                console.log(element);
                // this._items.push(new Item(element.id, element.name, element.description, element.image, element.price));


                await Item.getItem(element.product_id).then(item => {
                    //console.log(response);
                    item.cart_id = element.id;
                    cart.addItem(item);
                });

                // fout, moet eerst opvragen items.
                // cart.addItem(new Item(element.id, element.name, element.description, element.image, element.price))
        
              });
        });
        return cart;
    }

    static async deleteFromCart(nId : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {id: nId};
        console.log(postData);
        await api.post('/cart/delete', postData).then((response) => {
            console.log("deleted itemcart");
        });
        return 1
    }


}
