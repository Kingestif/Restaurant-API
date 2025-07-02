export type MenuType = {
    id?: string,            //only need this during return so make it optional
    name: string,
    description: string,
    price: number,
    category: string,
    available: boolean
}

export type MenuUpdateType = Partial<MenuType>;     //this allows only part of data to be be used during PATCH