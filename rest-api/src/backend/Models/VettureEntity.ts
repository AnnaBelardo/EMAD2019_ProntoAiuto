import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vettura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, length: 100})
    identificativo: string;

    @Column({ length: 100 })
    tipologia: string;

    @Column ()
    stato: string;

    @Column({unique: true, length: 15})
    imei: string;

    @Column({unique: true, length: 36})
    playerId: string;
}
