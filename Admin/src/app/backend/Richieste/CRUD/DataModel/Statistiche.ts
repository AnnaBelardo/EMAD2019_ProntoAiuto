export interface Statistiche {
  n_richieste: number;
  n_vetture: number;
  n_green_line: number;
  n_polizia: number;
  n_carabinieri: number;
  n_pompieri: number;
  n_paramedici: number;
  tempi_di_arrivo: number[];
  richieste_mensili: number[];
  green_line_mensili: number[];
}
