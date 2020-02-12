export interface Vetture {
  id: number;
  imei: string;
  identificativo: string;
  tipologia: string;
  stato: string;
  playerId: string;
  forza_ordine: string;
  latitudine: string;
  longitudine: string;
  forzaOrdine: string;
  disponibile: boolean;
  richiesta_attuale_assegnata: number;
  agg_pos: string;
}
