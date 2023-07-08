import { Nav, Navbar, Container, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function PageHeader(props) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <Navbar variant='light' bg='light' expand='lg' className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand>NBA Crossover Unlimited</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleOpenModal}>Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br /><br />

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>How do I play?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Click on the grid squares and fill them with a player who has played with both the team in its column AND the team in its row. </p>
                    <p>Simple, right?</p>
                    <p>Some rules:</p>
                    <ul>
                        <li>Only players who have actually played a game with both teams count as an answer. <a
                            href='https://www.nba.com/news/carmelo-anthony-trade-hawks-dennis-schroeder-trade-thunder-official'>Yes, technically Carmelo Anthony was a Hawk</a> for <a href='https://www.sportsnet.ca/basketball/nba/hawks-waive-carmelo-anthony-making-free-agent/'>five days.</a> No, that doesn&apost count for this game.
                        </li>
                        <li>Once you use a player for one square, you can&apost use them again for other squares. Shout out to Jeff Green for helping me test this function.</li>
                        <li>Players that have played for previous iterations of a franchise (e.g. Memphis/Vancouver Grizzlies, OKC Thunder/Seattle Supersonics) count for the modern versions of those franchises.</li>
                    </ul>
                    <p>Have fun!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}