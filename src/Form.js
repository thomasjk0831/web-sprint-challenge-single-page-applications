import React, { useState } from 'react'
import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    size:yup.string(),
    instructions:yup.string()
})


function Form(){
    const [form, setForm] = useState({name:"", size:"", instructions:""})
    const [errorState, setErrorState] = useState({name:"", size:"", instructions:""})

    function validate(e){
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid=> {
          setErrorState({...errorState, [e.target.name]: ""})
        })
        .catch(err=> {
          setErrorState({...errorState, [e.target.name]: err.errors[0]})
        })
    }

    function changeHandler(e){
        e.persist()
        validate(e)
        setForm({...form, [e.target.name] : e.target.value})
    }

    return(
        <div>
           Form Page
           <form>
            <label htmlFor='name'> Name
            <input 
                  id='name' 
                  name='name' 
                  type ="text"
                  value={form.name} 
                  placeholder='Enter name'
                  onChange={changeHandler}
                  />
                </label> 
            <label htmlFor="size">
              What is the size?
               <select
                 value={form.size}
                 name="size"
                 id="size"
                 onChange={changeHandler}
               >
                 <option value=''>Select a size</option>
                 <option value="small">small</option>
                 <option value="medium">medium</option>
                 <option value="large">large</option>
                 
               </select>
            </label>
            <label htmlFor='instructions'> instructions
            <textarea
                  id='instructions' 
                  name='instructions' 
                 
                  value={form.instructions} 
                  placeholder='Enter instructions'
                  onChange={changeHandler}
                  />
                </label> 
           </form>
        </div>
    )
}

export default Form