import { Form } from 'react-bootstrap'

export const TextAreaComponent = ({ controlid = '', label = '', placeholder = '', value = '', onChange, subText = '' }) => {

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
