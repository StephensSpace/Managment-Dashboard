import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-important-notes',
  imports: [ButtonModule, CommonModule],
  templateUrl: './important-notes.html',
  styleUrl: './important-notes.scss'
})
export class ImportantNotes implements OnInit {
  notes: any[] | undefined;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    const notesCollection = collection(this.firestore, 'profiles/webmaster1/notes');

    collectionData(notesCollection, { idField: 'docId' }).subscribe(data => {
      this.notes = this.processNotes(data);
      console.log('Notes from Firestore:', data);
    });
  }

  /**
   * Konvertiert und sortiert Notizen
   */
  private processNotes(rawNotes: any[]): any[] {
    const notesWithDates = this.mapTimestamps(rawNotes);
    const sortedNotes = this.sortByDueDate(notesWithDates);
    return sortedNotes;
  }

  /**
   * Wandelt Firebase-Timestamps in JS Dates um
   */
  private mapTimestamps(notes: any[]): any[] {
    return notes.map(note => ({
      ...note,
      dueDateJS: note.dueDate ? note.dueDate.toDate() : null
    }));
  }

  /**
   * Sortiert Notizen nach dueDateJS (nächstes Datum zuerst)
   */
  private sortByDueDate(notes: any[]): any[] {
    return notes.sort((a, b) => {
      if (!a.dueDateJS) return 1;  // a hat kein Datum → nach hinten
      if (!b.dueDateJS) return -1; // b hat kein Datum → a bleibt vorne
      return a.dueDateJS.getTime() - b.dueDateJS.getTime();
    });
  }

}
