import { Form } from 'react-bootstrap'

interface InputProps {
    controlid: string,
    type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'date'| 'time',
    label: string,
    value: string | number,
    onChange?: (s: any) => void,
    placeholder?: string,
    subText?: string,
    disabled?: boolean
}

export const InputComponent = (props: InputProps) => {
    const { controlid, label, type = 'text', placeholder = '', value, onChange, subText, disabled } = props;

    return (
        <Form.Group controlId={controlid} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        onChange={disabled ? () => {} : onChange}>
            </Form.Control>
            <Form.Text className="text-muted">{subText?subText:''}</Form.Text>
        </Form.Group>
    )
}
