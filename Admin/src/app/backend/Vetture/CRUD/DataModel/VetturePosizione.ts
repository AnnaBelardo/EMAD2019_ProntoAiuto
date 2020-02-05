export interface VetturePosizione {
  id: number;
  imei: string;
  identificativo: string;
  tipologia: string;
  stato: string;
  playerId: string;
  lat: number;
  long: number;
  ultimo_aggiornamento: string;
  disponibile: boolean;
  forza_ordine: string;
}
