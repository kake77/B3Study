const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getAllNote: async () => await ipcRenderer.invoke('getAllNote'),
    createNote: async (note) => await ipcRenderer.invoke('createNote', note),
    editNote: async (uuid, note) => await ipcRenderer.invoke('editNote', uuid, note),
    deleteNote: async (uuid) => await ipcRenderer.invoke('deleteNote', uuid),
}
)