import {useState} from 'react'


export default function Notes() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (note.trim() === "") return;  // add this
    setNotes([...notes, { id: Date.now(), text: note }]);
    setNote("");
}

  return (
  <div>
     <form onSubmit={(e)=>{
  handleSubmit(e);
   }}>
    <input type="text" value={note} onChange={(e)=>setNote(e.target.value)} />
    <button type="submit">Add Note</button>
   </form>
 {  notes.map((note) => (
    <div key={note.id}>
     <p>{note.text}</p>
    </div>
   ))}
  </div>
    

  )
}