import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails
  return (
    <div className="latest-match-card">
      <div className="match-details">
        <p className="opp-team-title">{competingTeam}</p>
        <p className="date">{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        className="competing-logo"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <div className="innings-info">
        <p>
          <strong>First Innings</strong> <br /> {firstInnings}
        </p>
        <p>
          <strong>Second Innings</strong> <br /> {secondInnings}
        </p>
        <p>
          <strong>Man of the Match</strong>
          <br /> {manOfTheMatch}
        </p>
        <p>
          <strong>Umpires</strong>
          <br /> {umpires}
        </p>
      </div>
    </div>
  )
}

export default LatestMatch
