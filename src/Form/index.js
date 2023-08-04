import { useState } from 'react';
import './index.css';
const Form = () => {
  

    const initialFormObj = {
        id: "",
        name: "",
        email: "",
        comp: "",
        phone: "",
    };
    const initialFormErrObj = {
        name: "",
        email: "",
        comp: "",
        phone: "",
    };

    
    
    
    const [formData, setFormData] = useState(initialFormObj);
    const [formErr, setFormErr] = useState(initialFormErrObj);
    const [tableData, setTableData] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (name, value) => {
        console.log(name,value);
        const formValues = {...formData};
        formValues[name] = value;
        setFormData(formValues)
        const formErrs = {...formErr}
        if(value.trim() !== ""){
            formErrs[name] = ""
            setFormErr(formErrs);
        }


    }
    const handleSave =() => {
       const valid = validateForm()
       if (valid === true) {
        const userData =[...tableData]
        const userFormData = {...formData}

        if(userFormData.id ){
            const updated = userData.map(item => {
                return item.id === userFormData.id ?
                userFormData : item
            })
            setTableData(updated)
        } else {
            userFormData['id'] = Math.floor(Math.random() * 10000);
            userData.push(userFormData);
            setTableData(userData)
        }
         setFormData(initialFormObj);
         setShowSuccess(true);
         closeSuccess();
       }

    }

    const hideSuccess = () => {
        setShowSuccess(false);
    }

    const handleEdit = (id) => {
        const upEdit = tableData.find((item) => {
            return item.id === id;
        })

        setFormData(upEdit);

    }
    const handleDelete = (id) => {
        const upDated = tableData.filter((item) => {
            return item.id !== id;
        });
       
        setTableData(upDated);
        
    }

    function validateForm(){
        const formErrors = {...formErr};
        if (formData.name.trim() === '') {
            formErrors['name'] = 'Invalid Form, Name can not be empty'
            setFormErr(formErrors);
            return false
          }
           if (formData.comp.trim()=== '') {
           formErrors['comp'] = 'Invalid Form, Company can not be empty'
            setFormErr(formErrors);
            return false
          }
          if (formData.email.trim() === '') {
            formErrors['email'] = 'Invalid Form, Email can not be empty'
            setFormErr(formErrors);
            return false
          }
          if (formData.phone.trim() ==='') {
            formErrors['phone'] = 'Invalid Phone, Name can not be empty'
            setFormErr(formErrors);
            return false
          }

          return true
    }

    //const saveForm = () => {
      //  console.log('Form values: ', name, email, phone, comp)
   // }
    // const validateForm = () => {
    //     const name = document.getElementById("name").value;
    //     const comp = document.getElementById("comp").value;
    //     const email = document.getElementById("email").value;
    //     const phone = document.getElementById("phone").value;

    //     if (name.trim() === '') {
    //         document.getElementById("name").style.border = '1px solid red';
    //         document.getElementById("name_err").innerHTML = 'Please enter name';
            
    //     }
    //     if (comp.trim() === '') {s
    //         document.getElementById("comp").style.border = '1px solid red';
    //     }
    //     if (email.trim() === '') {
    //         document.getElementById("email").style.border = '1px solid red';
    //     }
    //     if (phone.trim() === '') {
    //         document.getElementById("phone").style.border = '1px solid red';
    //     }

    // }
    const closeSuccess = () => {
        console.log('closing')
        setTimeout(() => {
            setShowSuccess(false)
        }, 3000);
    }
    
    return (

        <>
        <div className='centered'>

        <form className="container">
            <h1>Registration Form</h1>
            <div className='row'>
                <label htmlFor='name' >Name:  </label>
                <input type='text' name='name' className={formErr.name ? 'input-err' : ''} onChange={e => handleChange(e.target.name,e.target.value)} value={formData.name}/>
                {formErr.name && <span id="name_err" className='err'>Name cannot be empty</span>}
            </div>
            <div className='row'>
                <label htmlFor='comp'>Company:  </label>
                <input type='text' name='comp' className={formErr.comp ? 'input-err': ''} onChange={(e) => handleChange(e.target.name,e.target.value)} value={formData.comp} />
                {formErr.comp && <span id="comp_err" className='err'>Company cannot e empty</span>}
            </div>

            
            <div className='row'>
                <label htmlFor='email'>Email:  </label>
                <input type='email' name='email' className={formErr.email ? 'input-err' : ''} onChange={(e) => handleChange(e.target.name,e.target.value)} value={formData.email} />
                { formErr.email && <span id="email_err" className='err'>Email cannot be empty</span>}
            </div>
            <div className='row'>
                <label htmlFor='phone'>Phone:  </label>
                <input type='number' name='phone' className={formErr.phone ? 'input-err': ''} onChange={(e) => handleChange(e.target.name,e.target.value)}  value={formData.phone}/>
                {formErr.phone &&  <span id="phone_err" className='err'>Phone cannot be empty</span>}
            </div>
            <div className='row'>
                <label>Gender: </label>
                <input type='radio' name="gender" id="male" />
                <label htmlFor='male'>Male</label>
                <input type='radio' name='gender' id="female" />
                <label htmlFor='female'>Female</label>
            </div>
            <div className='row'>
                <input className='btn' type='button' value='Submit' name='submit'onClick={() => {handleSave() }}/>
            </div>



        </form>
      </div>  
      {
        showSuccess && <div className='success' >
            <span className='showsuccess'>Your response has been recorded</span>
            <span className='close-icon' onClick={hideSuccess}>X</span>
        </div>
      }

    <div className='table'>
        <table cellPadding={10} width="100%" className='center'>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
            </tr>
            {
                tableData.length>0 ?
               ( tableData.map((item, index) => {
                    return(
                        <tr key={item.id}>
                        <td width="5%">{item.id}</td>
                        <td width="20%">{item.name}</td>
                        <td width="20%">{item.comp}</td>
                        <td width="20%">{item.email}</td>
                        <td width="15%">{item.phone}</td>
                        <td align='center' width="20%">
                            <button name='edit' className='action-btn edit-btn' onClick={() => handleEdit(item.id)}>Edit</button>
                            <button name='delete' className='action-btn delete-btn' onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                    )
                })) :(<tr><td colSpan={6} align='center'>No record to display</td></tr>)

            }
           
        </table>
        
    </div>  
      

      
</>

    )

};
export default Form;