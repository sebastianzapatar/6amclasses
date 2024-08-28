import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository:Repository<Dish>,

    @InjectRepository(Ingredient)
    private readonly ingredienteRepository:Repository<Ingredient>
  ){}
  async create(createDishDto: CreateDishDto) {
    const dish=this.dishRepository.create(createDishDto);
    await this.dishRepository.save(dish);
    return dish;
  }

  findAll() {
    
    return this.dishRepository.find({relations:{ingredients:true}});
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
  async addIngredientToDish(dishId: string, ingredientId: string): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      where: { id: dishId },
      relations: ['ingredients'], // Asegúrate de cargar la relación ingredients
    });

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${dishId} not found`);
    }

    const ingredient = await this.ingredienteRepository.findOne({
      where: { id: ingredientId },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${ingredientId} not found`);
    }

    // Agrega el ingrediente al plato
    dish.ingredients.push(ingredient);
    return await this.dishRepository.save(dish); // Guarda el plato con el nuevo ingrediente
  }
  


}
