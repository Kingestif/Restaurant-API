import { IMenuRepository } from "../../repository/menuRepository";
import { MenuType, MenuUpdateType } from "../../types/menu";
import { AppError } from "../../utils/AppError";

export class MenuService {
    private menuRepository: IMenuRepository
    constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    async getMenu(){
        const menu = await this.menuRepository.find();
        return menu;
    }

    async postMenu(menu: MenuType){
        const newMenu = await this.menuRepository.create(menu);
        return newMenu;
    }

    async editMenu(id: string, menu: MenuUpdateType){
        const editedMenu = await this.menuRepository.findByIdAndUpdate(id, menu);

        if(!editedMenu) throw new AppError('cant find the menu to be updated', 404);

        return editedMenu;
    }

    async deleteMenu(id: string) {
       return await this.menuRepository.findByIdAndDelete(id);
    }
}