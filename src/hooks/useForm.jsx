import { useState } from "react"

const useForm = ({onSubmit}) => {
    //logica del estado edfectop lo que quieras manejar
    const [form_state, setFormState] = useState({ email: '', password: '' })

    const handleSubmit = async (event) => {
        event.preventDefault()
        onSubmit()
    }

    const handleChange = (event) => {
        const value = event.target.value
        const field_name = event.target.name
        //console.log({ value, field_name })

        setFormState(
            (prevFormState) => {
                return {
                    ...prevFormState,
                    [field_name]: value
                }
            }
        )
    }
    return{
        form_state,
        handleSubmit,
        handleChange
    }
}

export default useForm