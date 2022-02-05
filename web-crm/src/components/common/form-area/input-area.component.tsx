import { Form } from 'react-bootstrap'

interface AreaProps {
    controlid: string,
    label: string,
    placeholder: string,
    value: string | number,
    onChange: (s: any) => void,
    subText?: string
}

export const TextAreaComponent = (props: AreaProps) => {
    const { controlid, label, placeholder, value, onChange, subText } = props;
    return (
        <Form.Group controlId={controlid} className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control style={{resize: 'none'}}
                        as="textarea"
                        placeholder={placeholder}
                        rows={3}
                        value={value}
                        onChange={onChange}>
            </Form.Control>
            <Form.Text className="text-muted">{subText?subText:''}</Form.Text>
        </Form.Group>
    )
}
