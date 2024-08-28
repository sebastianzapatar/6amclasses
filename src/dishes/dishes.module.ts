import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  controllers: [DishesController],
  providers: [DishesService],
  imports:[TypeOrmModule.forFeature([Dish]),IngredientsModule],
  exports: [TypeOrmModule],
})
export class DishesModule {}
