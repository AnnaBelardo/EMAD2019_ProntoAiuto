import { Module } from '@nestjs/common';
import {VettureService} from './Services/VettureService';
import {VettureController} from './VettureController';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Vettura} from './Models/VettureEntity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vettura]),
    ],
    controllers: [
        VettureController,
    ],
    providers: [
        VettureService,
    ],
})
export class BackendModule {}
