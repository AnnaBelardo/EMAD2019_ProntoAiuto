export interface Richieste {
  id: number;
  imei: string;
  tipologia: string;
  stato: string;
  forza_ordine: string;
  is_supporto: string;
  informazioni: string;
  data: string;
  long: string;
  lat: string;
  vettura: string;
  vettura_imei: string;
  selfie: string;
  foto: string;
  audio: string;
  linea_verde_richiesta: boolean;
  tempoDiArrivo: number;
}
