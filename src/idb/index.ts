// @ts-ignore
import { DBSchema, IDBPDatabase, IDBRequestEvent, openDB } from 'idb'

import { NoteType } from '../store/note-reducer'

class IndexedDB {
  private db: IDBDatabase | null = null
  private dbName: string = 'notesDB'
  private storeName: string = 'notes'

  async addNote(note: NoteType): Promise<ResponseType> {
    return new Promise<ResponseType>(resolve => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)
      const addedNote = { ...note, tags: this.makeTags(note.body) }
      const request = objectStore.add(addedNote)

      const getAllRequest = objectStore.getAll()

      transaction.oncomplete = async () => {
        const notes = getAllRequest.result

        const uniqueTags = this.uniqueTags(notes)

        const lastNote = { ...addedNote, id: request.result as number }

        resolve({ notes: lastNote, tags: uniqueTags })
      }
    })
  }

  async deleteNote(id: number): Promise<ResponseType> {
    return new Promise<ResponseType>(resolve => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)

      objectStore.delete(id)
      const getAllRequest = objectStore.getAll()

      transaction.oncomplete = () => {
        const notes = getAllRequest.result

        const uniqueTags = this.uniqueTags(notes)

        resolve({ id, tags: uniqueTags })
      }
    })
  }

  async getAllNotes(filter: string[] = []): Promise<NoteType[]> {
    return new Promise<NoteType[]>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readonly')
      const objectStore = transaction.objectStore(this.storeName)

      const request = objectStore.getAll()

      request.onsuccess = () => {
        let res = request.result

        if (filter.length) {
          res = request.result.filter(note => note.tags.some((tag: string) => filter.includes(tag)))
        }

        resolve(res)
      }

      request.onerror = (event: IDBRequestEvent) => {
        reject(event.target.error)
      }
    })
  }

  async getUniqueTags(): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      const transaction = this.db!.transaction(this.storeName, 'readonly')
      const objectStore = transaction.objectStore(this.storeName)
      const request = objectStore.getAll()

      transaction.oncomplete = () => {
        resolve(this.uniqueTags(request.result))
      }
    })
  }

  async init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onupgradeneeded = event => {
        const db = (event.target as IDBRequestEvent).result

        db.createObjectStore(this.storeName, { autoIncrement: true, keyPath: 'id' })
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onerror = (event: IDBRequestEvent) => {
        reject(event.target.error)
      }
    })
  }
  makeTags(body: string): string[] {
    const regex = /#(\S+)/g
    const matches = body.match(regex)
    const uniqueTagsSet = new Set(matches ? matches.map(match => match.substring(1)) : [])

    // Преобразование обратно в массив
    return Array.from(uniqueTagsSet)
  }
  uniqueTags(notes: NoteType[]) {
    return [...new Set(notes.flatMap(note => note.tags))]
  }

  async updateNote(note: NoteType): Promise<ResponseType> {
    return new Promise<ResponseType>((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, 'readwrite')
      const objectStore = transaction.objectStore(this.storeName)
      const addedNote = { ...note, tags: this.makeTags(note.body) }

      objectStore.put(addedNote)
      const getAllRequest = objectStore.getAll()

      transaction.oncomplete = () => {
        const notes = getAllRequest.result

        const uniqueTags = this.uniqueTags(notes)

        resolve({ notes: addedNote, tags: uniqueTags })
      }

      transaction.onerror = (event: IDBRequestEvent) => {
        reject(event.target.error)
      }
    })
  }
}

export default IndexedDB

type ResponseType = {
  id?: number
  notes?: NoteType
  tags: string[]
}
