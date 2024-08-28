import { forwardRef, Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports:[TypeOrmModule.forFeature([Ingredient])
  ],
  exports: [IngredientsService,TypeOrmModule],
})
export class IngredientsModule {}
