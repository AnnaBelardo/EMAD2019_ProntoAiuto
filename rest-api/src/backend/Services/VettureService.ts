import {Injectable} from '@nestjs/common';
import {from, Observable} from 'rxjs';
import {InjectRepository} from '@nestjs/typeorm';
import {Vettura} from '../Models/VettureEntity';
import {Repository} from 'typeorm';
import {CreateVetturaDto} from '../Dtos/CreateVetturaDto';

@Injectable()
export class VettureService {

    constructor( @InjectRepository(Vettura) private readonly vettureRepository: Repository<Vettura>) {
    }

    public getAllVetture(): Observable<Vettura[]> {
        return from(this.vettureRepository.find());
    }

    public createVettura(createVetturaDto: CreateVetturaDto) {
        return this.vettureRepository.save(createVetturaDto);
    }
}
