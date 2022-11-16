document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById("floatingButton").addEventListener("click", async () => {
        let dialog = new Dialog("新しいメモを作成", "キャンセル");
        let input = dialog.AddInput();
        dialog.AddButton("作成", async () => {
            await window.api.createNote(input.value);
            ReloadNotes();
        });
        dialog.Show();

    });

    ReloadNotes();
});


class Note {
    static NoteItemWrapper = document.getElementById("noteItemWrapper");
    static New(uuid, note) {
        let item = document.createElement("div");
        item.className = "noteItem";
        item.innerText = note;
        item.addEventListener("click", () => ShowNoteMenu(uuid, note));
        this.NoteItemWrapper.appendChild(item);
    }
}

async function ShowNoteMenu(uuid, note) {
    let dialog = new Dialog(note, "キャンセル");
    dialog.AddButton("編集", () => ShowEditNote(uuid, note));
    dialog.AddButton("削除", async () => {
        await window.api.deleteNote(uuid);
        ReloadNotes();
    });
    dialog.Show();
}

async function ShowEditNote(uuid, note) {
    let dialog = new Dialog("メモを編集", "キャンセル");
    let input = dialog.AddInput();
    input.value = note;
    dialog.AddButton("保存", async () => {
        await window.api.editNote(uuid, input.value);
        ReloadNotes();
    });
    dialog.Show();
}

async function ReloadNotes() {
    while (Note.NoteItemWrapper.lastChild) {
        Note.NoteItemWrapper.removeChild(Note.NoteItemWrapper.lastChild);
    }
    let notes = await window.api.getAllNote();
    notes.forEach(note => {
        Note.New(note.NoteUUID, note.Note);
    });

}

