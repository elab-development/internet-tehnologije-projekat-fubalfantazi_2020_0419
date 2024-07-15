import React from "react";

const useForm = (initialState) => {

    const [form, setForm] = React.useState(initialState);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return {
        form,
        handleChange
    }
}

export default useForm;