import { useState } from 'react';

export const useForm = <T extends Object>( formulario: T) => {
    
    const [state, setState] = useState( formulario );

    const onChange = ( value: string | number | boolean, campo: keyof T ) => {
        setState({
            ...state,
            [campo]: value
        });
    }

    const setForm = ( formulario: T ) => {
        setState( formulario );
    }
    
    return {
        state,
        onChange,
        setForm
    }
}
