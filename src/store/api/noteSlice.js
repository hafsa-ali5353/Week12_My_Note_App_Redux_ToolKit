// fetch note add note edit note delete note = CRUD operations
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// createSlice waa function kuu sameenayo jeex ka mid ah state-ka 
// createAsyncThunk waa u baahantahay hadaa api u yeereesid (wuxuu naga caawinayaa SIDE EFFECT)

// 1. fetch notes
export const fetchNotes =createAsyncThunk("note/fetchNotes", async ()=>{
    const response=await axios.get("http://localhost:9000/notes");
    return response.data;
})

// 2. add Note 
export const addNote = createAsyncThunk("note/addNote", async (newNote)=>{
    const response=await axios.post('http://localhost:9000/create_note', newNote);
    return response.data;
})
// 3. eddit Note
export const editNote=createAsyncThunk("note/editNote",async ({noteId,updatedNote})=>{
    const response=await axios.put(`http://localhost:9000/update_note/${noteId}`,updatedNote);
    return response.data;
})
// 4. delete the note
export const deleteNote = createAsyncThunk("notes/deleteNote", async (noteId) => {
    await axios.delete(`http://localhost:9000/delete_note/${noteId}`)
    return noteId
});
const initialState ={
    notes: [],
    status: "idle",
    error :null
 }
export const noteSlice= createSlice({
    name: "note",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNotes.pending,(state)=>{
            state.status='loading';
            state.error=null;
        })
        .addCase(fetchNotes.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.notes=action.payload;
        })
        .addCase(fetchNotes.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.message;
        })
        .addCase(addNote.fulfilled,(state,action)=>{
            state.notes.push(action.payload);
        })
        .addCase(editNote.fulfilled,(state,action)=>{
            const {noteId,updatedNote} = action.payload;
            console.log(noteId,updatedNote)
            const existingNote=state.notes.find((note=>note.id===noteId));
            if (existingNote){
                existingNote.title=updatedNote.title;
                existingNote.content=updatedNote.content;
            }
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId)
        })
    }
})

export default noteSlice.reducer;