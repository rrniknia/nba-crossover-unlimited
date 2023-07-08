import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Grid from '@/components/Grid'
import { Container, Button, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import PageHeader from '@/components/PageHeader'

const inter = Inter({ subsets: ['latin'] })

const teamMap = [
  'ATL',
  'BKN',
  'BOS',
  'CHA',
  'CHI',
  'CLE',
  'DAL',
  'DEN',
  'DET',
  'GSW',
  'HOU',
  'IND',
  'LAC',
  'LAL',
  'MEM',
  'MIA',
  'MIL',
  'MIN',
  'NOP',
  'NYK',
  'OKC',
  'ORL',
  'PHI',
  'PHX',
  'POR',
  'SAC',
  'SAS',
  'TOR',
  'UTA',
  'WAS'
]

export default function Home() {
  // bool value to trigger clearGrid()
  const [clearGrid, setClearGrid] = useState(false);

  const handleGridClear = () => {
    setClearGrid(true);
    setTimeout(() => {
      setClearGrid(false);
    }, 0)
  };

  // Fisher-Yates shuffle algorithm - from the items in a given list, return a random list of length `count` with no duplicates.
  function getRandomValues(list, count) {
    const shuffled = [...list];
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;

    // While there are remaining elements to shuffle
    while (currentIndex > 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap with the current element
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    return shuffled.slice(0, count);

  }

  // this will be the randomized list of teams, taken from teamMap and randomized using getRandomValues
  const [teamList, setTeamList] = useState([]);

  const randomizeTeams = () => {
    handleGridClear();
    setTeamList(getRandomValues(teamMap, 6));
  };

  // do that in this hook to avoid a hydration error
  useEffect(() => {
    randomizeTeams();
  }, []);


  return (
    <>
      <PageHeader />
      <Container>
        <Grid teams={teamList} clear={clearGrid} />
        <br />

        <Row className='justify-content-center' xs={4}>
          <Button onClick={randomizeTeams}>RANDOMIZE</Button>   {/*makes a new list of randomized teams, which will cause the Grid to re-render*/}
          <Button onClick={handleGridClear}>RESET</Button>      {/*Only clears the grid squares without changing the teams.*/}
        </Row>

      </Container>

    </>
  )
}
