import { Card } from "react-bootstrap";

export default function CategorySquare(props) {

    return (
        <Card className="border-0 bg-light categorySquare">
            <Card.Img src={`${props.team}.png`}></Card.Img>
            <Card.Body>{props.text}</Card.Body>
        </Card>

    )

}