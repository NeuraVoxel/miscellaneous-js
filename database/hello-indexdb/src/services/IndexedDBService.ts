// src/services/IndexedDBService.ts
export interface Note {
  id?: number;
  title: string;
  content: string;
  createdAt: Date;
}

class IndexedDBService {
  private readonly dbName = 'notesDB';
  private readonly dbVersion = 1;
  private db: IDBDatabase | null = null;

  // Initialize the database
  public async initDB(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event);
        reject(false);
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        console.log('IndexedDB initialized successfully');
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store for notes
        if (!db.objectStoreNames.contains('notes')) {
          const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
          
          // Create indexes
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('createdAt', 'createdAt', { unique: false });
          
          console.log('Object store created');
        }
      };
    });
  }

  // Add a new note
  public async addNote(note: Note): Promise<number> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readwrite');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.add(note);

      request.onsuccess = (event) => {
        resolve(request.result as number);
      };

      request.onerror = (event) => {
        console.error('Error adding note:', event);
        reject(new Error('Failed to add note'));
      };
    });
  }

  // Get all notes
  public async getAllNotes(): Promise<Note[]> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readonly');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result as Note[]);
      };

      request.onerror = (event) => {
        console.error('Error getting notes:', event);
        reject(new Error('Failed to get notes'));
      };
    });
  }

  // Get a note by ID
  public async getNoteById(id: number): Promise<Note> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readonly');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.get(id);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result as Note);
        } else {
          reject(new Error(`Note with ID ${id} not found`));
        }
      };

      request.onerror = (event) => {
        console.error('Error getting note:', event);
        reject(new Error('Failed to get note'));
      };
    });
  }

  // Update a note
  public async updateNote(note: Note): Promise<void> {
    if (!note.id) {
      throw new Error('Note ID is required for update');
    }

    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readwrite');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.put(note);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error updating note:', event);
        reject(new Error('Failed to update note'));
      };
    });
  }

  // Delete a note
  public async deleteNote(id: number): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readwrite');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error deleting note:', event);
        reject(new Error('Failed to delete note'));
      };
    });
  }

  // Clear all notes
  public async clearNotes(): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['notes'], 'readwrite');
      const objectStore = transaction.objectStore('notes');
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error clearing notes:', event);
        reject(new Error('Failed to clear notes'));
      };
    });
  }
}

// Export a singleton instance
export const indexedDBService = new IndexedDBService();
export default indexedDBService;