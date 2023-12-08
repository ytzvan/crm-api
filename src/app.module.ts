import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { ProductsModule } from './modules/products/products.module'; // The module has the controller and the service loaded
import { InventoryController } from './modules/inventory/inventory.controller';
import { ReservationsController } from './modules/reservations/reservations.controller';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [
    AppController,
    UsersController,
    InventoryController,
    ReservationsController,
  ],
  providers: [AppService, UsersService],
})
export class AppModule {}
