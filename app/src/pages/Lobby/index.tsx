import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core"
import Fishbowl from "components/FishbowlAnimation"
import { CurrentGameContext } from "contexts/CurrentGame"
import { CurrentPlayerContext, PlayerRole } from "contexts/CurrentPlayer"
import { useTitleStyle } from "index"
import {
  LetterInput,
  SecondsPerTurnInput,
  SubmissionsPerPlayerInput,
  UsernameInput
} from "pages/Lobby/Inputs"
import WaitingRoom from "pages/Lobby/WaitingRoom"
import * as React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      margin: theme.spacing(2)
    }
  })
)

function Lobby() {
  const currentPlayer = React.useContext(CurrentPlayerContext)
  const currentGame = React.useContext(CurrentGameContext)
  const titleClasses = useTitleStyle()
  const classes = useStyles()

  return (
    <div>
      <div className={classes.section}>
        <Grid item>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h4" className={titleClasses.title}>
                Share
              </Typography>
            </Grid>
            <Grid item>
              {`Share the code with everyone playing`}
              <Typography variant="h6">{currentGame.join_code}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle"></Divider>

      {currentPlayer.role === PlayerRole.Host && (
        <>
          <div className={classes.section}>
            <Grid item>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Typography variant="h4" className={titleClasses.title}>
                    Settings
                  </Typography>
                </Grid>
                <Grid item>
                  <SecondsPerTurnInput
                    value={String(currentGame.seconds_per_turn || "")}
                  ></SecondsPerTurnInput>
                </Grid>
                <Grid item>
                  <SubmissionsPerPlayerInput
                    value={String(currentGame.num_entries_per_player || "")}
                  ></SubmissionsPerPlayerInput>
                </Grid>
                <Grid item>
                  <LetterInput
                    value={currentGame.starting_letter || ""}
                  ></LetterInput>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Divider variant="middle"></Divider>
        </>
      )}
      <div className={classes.section}>
        <Grid item>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography variant="h4" className={titleClasses.title}>
                Lobby
              </Typography>
            </Grid>
            <Grid item>
              <UsernameInput
                username={currentPlayer.username || ""}
                userId={currentPlayer.id}
              ></UsernameInput>
            </Grid>
            <WaitingRoom></WaitingRoom>
          </Grid>
        </Grid>
      </div>
      {currentPlayer.role === PlayerRole.Participant && (
        <div style={{ marginTop: 50 }}>
          <Fishbowl></Fishbowl>
        </div>
      )}
    </div>
  )
}

export default Lobby
