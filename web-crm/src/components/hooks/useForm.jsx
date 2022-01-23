import { useState } from 'react';

export const useForm = ( formulario ) => {
    
    const [state, setState] = useState( formulario );

    const onChange = ( value = '', campo ) => {
        setState({
            ...state,
            [campo]: value
        });
    }

    const setForm = ( formulario ) => {
        setState( formulario );
    }

    return {
        state,
        onChange,
        setForm
    }
}
