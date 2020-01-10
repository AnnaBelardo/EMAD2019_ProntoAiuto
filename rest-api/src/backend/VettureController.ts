import {Body, Controller, Get, Post} from '@nestjs/common';
import {Observable} from 'rxjs';
import {VettureService} from './Services/VettureService';
import {Vettura} from './Models/VettureEntity';
import {CreateVetturaDto} from './Dtos/CreateVetturaDto';

@Controller('vetture')
export class VettureController {

    constructor(private vettureService: VettureService) {
    }

    @Get('list')
    getAll(): Observable<Vettura[]> {
        return this.vettureService.getAllVetture();
    }

    @Post('create')
    create(@Body() createVetturaDto: CreateVetturaDto) {
        return this.vettureService.createVettura(createVetturaDto);
    }

}
