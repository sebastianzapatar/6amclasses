import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';//Configure typeorm
import { ConfigModule } from '@nestjs/config';// access value to env variables
import { IngredientsModule } from './ingredients/ingredients.module';
import { ImagesModule } from './images/images.module';
import { Ingredient } from './ingredients/entities/ingredient.entity';
import { Image } from './images/entities/image.entity';
import { DishesModule } from './dishes/dishes.module';
import { Dish } from './dishes/entities/dish.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT,
      database:process.env.DB_NAME,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      synchronize:true,
      autoLoadEntities:true,
      entities: [Ingredient, Image,Dish],
    }), IngredientsModule, ImagesModule, DishesModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
