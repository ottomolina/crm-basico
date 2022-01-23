import { useState } from 'react'
import { Spinner } from 'react-bootstrap';

const loaderStyles = {
    position: 'absolute',
    top: 'calc(50% - 4em)',
    left: 'calc(50% - 4em)'
}

const divParent = {
    position: 'absolute',
    background: '#FFFFFF',
    opacity: 0.5,
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
}

export const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const Loader = () => {
        if(loading) { 
            return (
                <div style={divParent}>
                    <Spinner animation="border" style={loaderStyles} />
                </div>
            )
        } else {
            return <></>
        }
    }

    const isLoading = () => loading;

    const showLoader = () => {
        setLoading(true);
    }

    const dismissLoader = () => {
        setLoading(false);
    }

    return {
        Loader,
        isLoading,
        showLoader,
        dismissLoader
    }

}
