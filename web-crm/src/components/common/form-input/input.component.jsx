
import React from 'react'
import { Form } from 'react-bootstrap'

export const InputComponent = ({ 
        controlid, label, type, placeholder, value, onChange, subText, disabled
    }) => {

    return (
        <Form.Group controlId={controlid} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}>
            </Form.Control>
            <Form.Text className="text-muted">{subText?subText:''}</Form.Text>
        </Form.Group>
    )
}
