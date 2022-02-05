import { Form } from 'react-bootstrap'

export interface SelectItem {
    id: number | string,
    valor: string
}

interface SelectProps {
    controlid: string,
    label: string,
    placeholder: string,
    value: string | number,
    onChange: (s: any) => void,
    lista: Array<SelectItem>,
    subText?: string,
    disabled?: boolean
}

export const SelectComponent = (props: SelectProps) => {
    const { controlid, label, placeholder, value, onChange, subText, lista, disabled } = props;
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
