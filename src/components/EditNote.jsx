import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate,useParams} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { fetchNotes, editNote } from '../store/api/noteSlice';
const EditNote = () => {
  const  dispatch =useDispatch();
  const navigate=useNavigate();
  const [currentNote,setCurrentNote]=useState({});


 
  const params = useParams();

  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch])

  useEffect(() => {
    if(notes.length) {
     const note = notes.find((note) => note.id === Number(params.id))
     setCurrentNote(note);
    }
  }, [notes, params.id])

  const initialValues = {
    title: currentNote.title,
    content: currentNote.content
  };
  console.log("current note",currentNote);

  
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Send the data to the server (localhost:9000/update_note)
    dispatch(editNote({updatedNote:values,noteId:Number(params.id)}))
     .then(()=>{
      navigate("/")
      window.location.reload();
     })

    // Reset the form after submission
    resetForm();
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
      enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditNote;
