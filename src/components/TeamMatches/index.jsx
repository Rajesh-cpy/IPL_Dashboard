import './index.css'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

const TeamMatches = () => {
  const {id} = useParams()
  const [teamBannerUrl, setTeamBannerUrl] = useState('')
  const [latestMatchDetails, setLatestMatchDetails] = useState({})
  const [recentMatches, setRecentMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBackgroundColorClass = teamId => {
    switch (teamId) {
      case 'RCB':
        return 'rcb-bg'
      case 'KKR':
        return 'kkr-bg'
      case 'KXP':
        return 'kxp-bg'
      case 'CSK':
        return 'csk-bg'
      case 'RR':
        return 'rr-bg'
      case 'MI':
        return 'mi-bg'
      case 'SH':
        return 'sh-bg'
      default:
        return 'default-bg'
    }
  }

  useEffect(() => {
    const getTeamMatches = async () => {
      setIsLoading(true)
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json()

      const {
        team_banner_url: fetchedTeamBannerUrl,
        latest_match_details: fetchedLatestMatchDetails,
        recent_matches: fetchedRecentMatches,
      } = data

      const updatedLatestMatch = {
        umpires: fetchedLatestMatchDetails.umpires,
        result: fetchedLatestMatchDetails.result,
        manOfTheMatch: fetchedLatestMatchDetails.man_of_the_match,
        id: fetchedLatestMatchDetails.id,
        date: fetchedLatestMatchDetails.date,
        venue: fetchedLatestMatchDetails.venue,
        competingTeam: fetchedLatestMatchDetails.competing_team,
        competingTeamLogo: fetchedLatestMatchDetails.competing_team_logo,
        firstInnings: fetchedLatestMatchDetails.first_innings,
        secondInnings: fetchedLatestMatchDetails.second_innings,
        matchStatus: fetchedLatestMatchDetails.match_status,
      }

      const updatedRecentMatches = fetchedRecentMatches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      }))

      setTeamBannerUrl(fetchedTeamBannerUrl)
      setLatestMatchDetails(updatedLatestMatch)
      setRecentMatches(updatedRecentMatches)
      setIsLoading(false)
    }

    getTeamMatches()
  }, [id])

  const bgColorClass = getBackgroundColorClass(id)

  return (
    <div className={`team-match-container ${bgColorClass}`}>
      {isLoading ? (
        <div data-testid="loader" className="loader-container">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      ) : (
        <>
          <img src={teamBannerUrl} alt="team banner" width="850px" />
          <div className="match-heading">
            <h1>Latest Matches</h1>
          </div>
          <LatestMatch latestMatchDetails={latestMatchDetails} />
          <ul className="match-card-list">
            {recentMatches.map(each => (
              <MatchCard key={each.id} recentMatches={each} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default TeamMatches
