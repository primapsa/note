import IndexedDB from '../idb'
import { NoteType } from '../store/note-reducer'

export const notesAPI = {
  async add(note: NoteType) {
    await this.init()

    return this.indexedDB.addNote(note)
  },
  async delete(id: number) {
    await this.init()

    return this.indexedDB.deleteNote(id)
  },
  async getAll(filter: string[]) {
    await this.init()

    return this.indexedDB.getAllNotes(filter)
  },
  async getAllTags() {
    await this.init()

    return this.indexedDB.getUniqueTags()
  },

  indexedDB: new IndexedDB(),
  async init() {
    return await this.indexedDB.init()
  },
  async update(note: NoteType) {
    await this.init()

    return this.indexedDB.updateNote(note)
  },
}
