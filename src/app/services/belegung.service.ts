import { Injectable, Output, EventEmitter } from "@angular/core";
import { Veranstaltung } from "../datatypes/veranstaltung";
import { StudiengangService } from "./studiengang.service";

@Injectable({
  providedIn: "root"
})
export class BelegungService {
  @Output() belegteVeranstaltungenChange: EventEmitter<any>;
  public belegteVeranstaltungen: Veranstaltung[] = [];

  constructor(private studiengangService: StudiengangService) {
    console.log("Creating Belegungservice");
    this.belegteVeranstaltungenChange = new EventEmitter<any>();

    this.studiengangService.selectedStudiengangChange.subscribe(() => {
      console.log("Reacting to studiengang change.");
      this.loadPflichtVeranstaltungenFromStudiengang();
    });

    this.loadPflichtVeranstaltungenFromStudiengang();
  }

  private loadPflichtVeranstaltungenFromStudiengang() {
    console.log("Beleging Pflichtveranstaltungen from studiengang.");
    this.belegteVeranstaltungen = this.studiengangService.allVeranstaltungen.filter(
      v => {
        return v.isPflicht;
      }
    );
    this.belegteVeranstaltungenChange.emit();
  }

  addVeranstaltungToBelegung(v: Veranstaltung) {
    this.belegteVeranstaltungen.push(v);
    this.belegteVeranstaltungenChange.emit();
  }

  removeVeranstaltungFromBelegung(v: Veranstaltung) {
    let idx = this.belegteVeranstaltungen.indexOf(v);
    if (idx >= 0) {
      this.belegteVeranstaltungen.splice(idx, 1);
      this.belegteVeranstaltungenChange.emit();
    }
  }
}
