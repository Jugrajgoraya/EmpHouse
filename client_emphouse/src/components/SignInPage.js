import React,{useState} from 'react'
import {Form} from 'react-bootstrap'
import {Session} from '../requests'

function SignInPage(props) {

    const { getCurrentSupervisor } = props;

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [errors, setErrors] = useState([])

    function handleSubmit(event){
        event.preventDefault();
        const params = {
            email: email,
            password: password
        }
        Session.create(params).then(data => {
            if(data.status === 404){
                setErrors([...errors, {message: "Wrong email or password"}])
            }
            else if (data.id){
                getCurrentSupervisor()
                props.history.push('/')
            }
        })
    }

  return (
      <div className='home-bg-image p-5'>
        <div className='display-1 fw-bolder d-flex justify-content-center emp-house'>EmpHouse</div>
        <Form className='position-absolute top-50 start-50 translate-middle fw-bolder' 
            onSubmit={handleSubmit}>
            {errors.length > 0 
            ? (
                <div>
                    <h4>Failed to Log In</h4>
                    <p>{errors.map(error => error.message).join(", ")}</p>
                </div>)
            : ""}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='fs-3'>Email address</Form.Label>
                <Form.Control onChange={event => { setEmail(event.currentTarget.value)}} 
                type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='fs-3'>Password</Form.Label>
                <Form.Control onChange={event => { setPassword(event.currentTarget.value)}} 
                type="password" placeholder="Password" />
            </Form.Group>
            <div className='d-flex justify-content-center'>
                <button className="fs-4 btn btn-dark shadow text-white p-2 fw-bold rounded" variant="primary" type="submit">
                    Submit
                </button>
            </div>
        </Form>
      </div>
  )
}

export default SignInPage