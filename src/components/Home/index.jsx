import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Home = () => {
  const [iplTeamList, setIplTeamList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getIplTeam = async () => {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      const newIplTeam = data.teams.map(each => ({
        id: each.id,
        name: each.name,
        teamImageUrl: each.team_image_url,
      }))
      setIplTeamList(newIplTeam)
      setIsLoading(false)
    }
    getIplTeam()
  }, [])

  return (
    <div className="ipl-background">
      {isLoading ? (
        <div data-testid="loader" className="loader-container">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="ipl-header">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="ipl-title">IPL Dashboard</h1>
          </div>
          <ul className="ipl-teams">
            {iplTeamList.map(each => (
              <TeamCard key={each.id} iplDetails={each} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Home
