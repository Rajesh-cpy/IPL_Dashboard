import './index.css'

const MatchCard = props => {
  const {recentMatches} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = recentMatches
  const statusClass = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="match-card">
      <img
        className="team-logo"
        src={competingTeamLogo}
        alt={`Competing team ${competingTeam}`}
      />
      <p className="team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`status ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
