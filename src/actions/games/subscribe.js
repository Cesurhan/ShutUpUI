// src/actions/games/subscribe.js
import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_GAMES_SERVICE = 'SUBSCRIBED_TO_GAMES_SERVICE'
export const GAME_CREATED = 'GAME_CREATED'
export const GAME_UPDATED = 'GAME_UPDATED'
export const GAME_REMOVED = 'GAME_REMOVED'

const api = new API()
const games = api.service('games')

export default () => {
  return (dispatch) => {
    games.on('created', (game) => { dispatch(createdGame(game)) })
    games.on('updated', (game) => { dispatch(updatedGame(game)) })
    games.on('patched', (game) => { dispatch(updatedGame(game)) })
    games.on('removed', (game) => { dispatch(removedGame(game)) })

    dispatch({
      [CALL_API]: {
        service: 'games',
        method: FIND,
        type: SUBSCRIBED_TO_GAMES_SERVICE,
        authenticate: true,
        params: {
          query: {
            $sort: { createdAt: -1},
            $limit: 25,
          },
        },
      }
    })
  }
}

const createdGame = (game) => {
  return {
    type: GAME_CREATED,
    payload: game
  }
}

const updatedGame = (game) => {
  return {
    type: GAME_UPDATED,
    payload: game
  }
}

const removedGame = (game) => {
  return {
    type: GAME_REMOVED,
    payload: game
  }
}