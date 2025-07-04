import { MenuRepository } from "../../../repository/menuRepository";
import { MenuService } from "../../../services/menu/menuServices";

describe('menuService', ()=> {
    let menuRepository: jest.Mocked<MenuRepository>;
    let menuService: MenuService;

    let id: string;
    
    let input: {
        name: string,
        description: string,
        price: number,
        category: string,
        available: boolean
    }

    let menu: {
        id?: string,            
        name: string,
        description: string,
        price: number,
        category: string,
        available: boolean
    }

    beforeEach(()=> {
        id = 'menuID123';

        input = {
            name: 'Burger',
            description: 'wow burger',
            price: 200,
            category: 'Appetizer',
            available: true
        }

        menu = {
            id: 'menuID123',
            name: 'Burger',
            description: 'wow burger',
            price: 200,
            category: 'Appetizer',
            available: true
        }

        menuRepository = {
            find: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn()
        } as unknown as jest.Mocked<MenuRepository>;

        menuService = new MenuService(menuRepository);
    });

    it('correctly return existing menus', async ()=> {
        menuRepository.find.mockResolvedValue([menu]);

        const results = await menuService.getMenu();
        expect(results).toEqual([menu]);
    });

    it('correctly create a menu and returns the result', async ()=> {
        menuRepository.create.mockResolvedValue(menu);

        const results = await menuService.postMenu(input);
        expect(results).toEqual(menu);
    });

    it('throws an error if item to be updated is not found', async()=> {
        menuRepository.findByIdAndUpdate.mockResolvedValue(null);
        await expect(menuService.editMenu(id, input)).rejects.toThrow('cant find the menu to be updated');
    });

    it('correctly updates given menu and return the result', async()=> {
        menuRepository.findByIdAndUpdate.mockResolvedValue(menu);
        const result = await menuService.editMenu(id, input);
        expect(result).toEqual(menu);
    });

    it('correctly deletes a menu', async()=> {
        menuRepository.findByIdAndDelete.mockResolvedValue(null);
        const result = await menuService.deleteMenu(id);
        expect(result).toEqual(null);
    });
});