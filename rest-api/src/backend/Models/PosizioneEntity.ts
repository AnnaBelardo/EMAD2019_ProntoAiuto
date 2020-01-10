import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {Vettura} from './VettureEntity';

@Entity()
export class PosizioneEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'decimal'})
    latitudineDecimale: number;

    @Column({type: 'decimal'})
    longitudineDecimale: number;

    @Column ()
    ultimoAggiornamento: string;

    @OneToOne(type => Vettura)
    @JoinColumn()
    vettura: Vettura;
}
