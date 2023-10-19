import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { DriveLog } from '@prisma/client';


class DriveLog {
  id: number;
  createdAt: Date;
  timestamp: Date;
  destination: string | null;
  odoStart: number;
  odoEnd: number;
  distance: number | null;

  constructor(
    id: number,
    createdAt: Date,
    timestamp: Date,
    destination: string | null,
    odoStart: number,
    odoEnd: number,
    distance: number | null
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.timestamp = timestamp;
    this.destination = destination;
    this.odoStart = odoStart;
    this.odoEnd = odoEnd;
    this.distance = distance;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  logs: DriveLog[] = []
  newLog: DriveLog = <DriveLog>{}

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<DriveLog[]>("api/logs").subscribe((l: DriveLog[]) => this.logs = l)
  }

  edit(log: DriveLog) {
    this.newLog = log;
    this.newLog.timestamp = new Date(log.timestamp);
  }

  save() {
    this.http.post("api/logs", this.newLog).subscribe(() => this.getAll());
    this.newLog = <DriveLog>{};
  }

  deleteLog(id: number) {
    this.http.delete(`api/logs/${id}`).subscribe(() => this.getAll());
  }
}
