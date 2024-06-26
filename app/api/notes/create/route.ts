import { addNote } from "@/cosmosPostgres/services/notes";

export async function POST(request: Request) {
    // parse the request body
    const note = await request.json();

    // check if the request body contains a notebook
    if(!note) return Response.json({error: "No note provided"});
    if(!note.name) return Response.json({error: "No note name provided"});
    if(!note.notebook_id) return Response.json({error: "No note notebookId provided"});
    if(note.content === undefined) return Response.json({error: "No note content provided"});
    if(note.order_position === undefined) return Response.json({error: "No note order position provided"});

    // add the notebook
    return Response.json(await addNote({
        name: note.name,
        notebook_id: note.notebook_id,
        content: note.content,
        topic_id: note.topic_id || null,
        order_position: note.order_position,
    }));
}