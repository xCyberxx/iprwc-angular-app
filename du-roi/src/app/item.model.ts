import { Api } from "./api/api";

export class Item {
    private _id : string;
    private _name : string;
    private _description : string;
    private _image : string;
    private _price : number;

    //Aanmaken CRUD functionaliteiten d.m.v. axios (api.getApi())

    constructor(id : string, name : string, description : string, image : string, price : number)
    {
        this._id = id;
        this._name = name;
        this._description = description;
        this._image = image;
        this._price = price;
    }

    get id() : string
    {
        return this._id;
    }

    set id(value : string)
    {
        this._id = value;
    }

    get name() : string
    {
        return this._name;
    }

    set name(value : string)
    {
        this._name = value;
    }

    get description() : string
    {
        return this._description;
    }
    set description(value : string)
    {
        this._description = value;
    }

    get price() : number
    {
        return this._price;
    }

    set price (value : number)
    {
        this._price = value;
    }

    get image() : string
    {
        return this._image;
    }

    set image(value : string)
    {
        this._image = value;
    }


    async updateItem(name : string, description : string, image : string, price : number) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {id: this._id, name: name, description: description, image: image, price: price};
        console.log(postData);
        await api.post('/item/update', postData).then((response) => {
            console.log("Updated Item");
        });
        return 1
    }

    static async createItem(name : string, description : string, image : string, price : number) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {name: name, description: description, image: image, price: price};
        console.log(postData);
        await api.post('/item/create', postData).then((response) => {
            console.log("Created Item");
        });
        return 1
    }

    static async deleteItem(id : string) : Promise<number>
    {
        const api = Api.getApi();
        const postData = {id : id};
        console.log(postData);
        await api.post('/item/delete', postData).then((response) => {
            console.log("Deleted Item " + postData.id);
        });
        return 1
    }
}
