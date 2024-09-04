import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository:Repository<Ingredient>
  ){}
  async create(createIngredientDto: CreateIngredientDto,user:User) {
    try{
      const ingredient=this.ingredientRepository.create({
        ...createIngredientDto,user});
      await this.ingredientRepository.save(ingredient);
      return ingredient;
    }
    catch(e){
      throw new InternalServerErrorException('already exists');
    }
    
  }

  async findAll() {
    const products=await this.ingredientRepository.find(
      {relations:{images:true,user:true}}
    );
    return products;
  }

  async findOne(id: string) {
    const ingredient=await this.ingredientRepository.findOneBy({id:id});
    if(!ingredient){
      throw new NotFoundException('Product not found')
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient=await this.ingredientRepository.preload({
      id:id,...updateIngredientDto
    })
    if(!ingredient)throw new NotFoundException('error');
    await this.ingredientRepository.save(ingredient);

    return ingredient;
  }

  async remove(id: string) {
    const ingredient=await this.findOne(id);
    this.ingredientRepository.delete(ingredient);
    return ingredient;
  }
}
