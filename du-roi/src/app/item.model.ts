export class Item {
    private _id : string;
    private _name : string;
    private _description : string;
    private _price : number;

    constructor(id : string, name : string, description : string, price : number)
    {
        this._id = id;
        this._name = name;
        this._description = description;
        this._price = price;
    }

    get id() : string
    {
        return this._id;
    }

    get name() : string
    {
        return this._name;
    }

    get description() : string
    {
        return this._description;
    }

    get price() : number
    {
        return this._price;
    }

}
