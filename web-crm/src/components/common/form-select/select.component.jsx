
import React from 'react'
import { Form } from 'react-bootstrap'

export const SelectComponent = ({ 
        controlid, label, placeholder, value, onChange, subText, lista, disabled
    }) => {

    return (
        
        <Form.Group controlId={controlid} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select value={value}
                         onChange={onChange}
                         disabled={disabled}
                         placeholder={placeholder}>
                <option value={-1}>{''}</option>
                {lista && lista.map((e,index)=>(
                    <option key={index} value={e.id}>{e.valor}</option>
                ))}
            </Form.Select>
            <Form.Text className="text-muted">{subText?subText:''}</Form.Text>
        </Form.Group>
    )
}
