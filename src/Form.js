import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(2,"must be at least 2 chars"),
    size:yup.string(),
    pepperoni: yup.boolean(),
    anchovi: yup.boolean(),
    greenpepper: yup.boolean(),
    ham: yup.boolean(),
    instructions:yup.string()
})


function Form(){
    const [orders, setOrders] = useState([])
    const [form, setForm] = useState({name:"", 
                                      size:"",
                                      
                                        pepperoni: false,
                                        anchovi: false,
                                        greenpepper: false,
                                        ham: false,
                                      
                                      instructions:""})
    const [errorState, setErrorState] = useState({name:"", 
                                                  size:"",
                                                  
                                                    pepperoni: false,
                                                    anchovi: false,
                                                    greenpepper: false,
                                                    ham: false,
                                                    
                                                instructions:""})

     const [buttonDisabled, setButtonDisabled] = useState(true)

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

    function onCheckboxChange(e){
        setForm({...form, [e.target.name] : e.target.checked})
    }

    function submitHandler(e){
        e.preventDefault()
        axios.post('https://reqres.in/api/users', form)
        .then(response => {
          console.log(response.data)
          setOrders([...orders, response.data ])
          setForm({name:"", 
          size:"",
          
            pepperoni: false,
            anchovi: false,
            greenpepper: false,
            ham: false,
          
          instructions:""}
          )
        })
        .catch(err => console.log(err))
    }

    useEffect(()=> {
        formSchema.isValid(form)
        .then(valid => {
          setButtonDisabled(!valid)
        })
      }, [form])

    return(
        
           
           <form onSubmit={submitHandler}>
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
            {
                errorState.name.length>0 ? (
                    <p>{errorState.name}</p>
                ): null
            }
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
                Select your toppings
            <div className="toppings">
            <label>pepperoni
            <input
            type="checkbox"
            name='pepperoni'
            checked={form.pepperoni}
            onChange={onCheckboxChange}
               />
                </label> 
            
            <label>anchovi
            <input
            type="checkbox"
            name='anchovi'
            checked={form.anchovi}
            onChange={onCheckboxChange}
               />
           </label>
            <label>greenpepper
            <input
            type="checkbox"
            name='greenpepper'
            checked={form.greenpepper}
            onChange={onCheckboxChange}
               />
           </label>
            <label>ham
            <input
            type="checkbox"
            name='ham'
            checked={form.ham}
            onChange={onCheckboxChange}
               />
           </label>
            </div>
            <button disabled={buttonDisabled}
            type="submit">submit order</button>
         <pre>{JSON.stringify(orders, null, 2)}</pre>

           </form>
        
    )
}

export default Form