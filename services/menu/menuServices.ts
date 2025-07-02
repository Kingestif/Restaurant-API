import { IMenuRepository, MenuRepository } from "../../repository/menuRepository";
import { MenuType, MenuUpdateType } from "../../types/menu";

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
        return editedMenu;
    }

    async deleteMenu(id: string) {
        await this.menuRepository.findByIdAndDelete(id);
    }
}