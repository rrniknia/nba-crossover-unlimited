import { Card } from "react-bootstrap";

export default function CategorySquare(props) {
    const squareStyle = {
        width: '10rem',
        height: '10rem',
    };

    return (
        <Card className="border-0 bg-light" style={squareStyle}>
            <Card.Img src={`${props.team}.png`}></Card.Img>
            <Card.Body>{props.text}</Card.Body>
        </Card>

    )

}