import { toMenu } from "../mapper/toMenuType";
import Menu from "../models/menu";
import { MenuType, MenuUpdateType } from "../types/menu";

export interface IMenuRepository {
    find(): Promise<MenuType[] | null>;
    create(menu: MenuType): Promise<MenuType>;
    findByIdAndUpdate(id: string, input: MenuUpdateType): Promise<MenuType | null>;
    findByIdAndDelete(id: string): Promise<null>;
}



export class MenuRepository implements IMenuRepository {
    async find(): Promise<MenuType[] | null> {
        const menus = await Menu.find();
        return menus.map((menu:any)=> toMenu(menu));
    }

    async create(menu: MenuType): Promise<MenuType>{
        const  newMenu = await Menu.create({name: menu.name, description: menu.description, price: menu.price, category: menu.category, available: menu.available});
        return toMenu(newMenu);
    }

    async findByIdAndUpdate(id: string, input: MenuUpdateType): Promise<MenuType | null> {
        const editedMenu = await Menu.findByIdAndUpdate(id, input, {
            new: true,
            runValidators: true
        });

        if(!editedMenu) return null;

        return toMenu(editedMenu);
    }

    async findByIdAndDelete(id: string): Promise<null> {
        await Menu.findByIdAndDelete(id);
        return null;
    }
}