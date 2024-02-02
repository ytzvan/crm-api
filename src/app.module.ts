import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { ProductsModule } from './modules/products/products.module'; // The module has the controller and the service loaded
import { InventoryController } from './modules/inventory/inventory.controller';
import { ReservationsController } from './modules/reservations/reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './modules/users/user.entity';
import { Products } from './modules/products/products.entity';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'mainpass123',
      database: 'crmapi',
      entities: [User, Products],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    InventoryController,
    ReservationsController,
    AuthController
  ],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
