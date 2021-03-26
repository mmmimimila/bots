import { Module } from '@lskjs/module';
import { ItemsModule } from '@lskjs/module/items/ItemsModule';
import { AsyncItemModule } from './AsyncItemModule';

export class AsyncItemsModule extends ItemsModule {
  ItemModule = AsyncItemModule;
}

export default AsyncItemsModule;
