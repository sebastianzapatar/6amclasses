import { forwardRef, Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  imports:[TypeOrmModule.forFeature([Ingredient]),AuthModule],
  exports: [IngredientsService,TypeOrmModule],
})
export class IngredientsModule {}
