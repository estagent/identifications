import {Events} from '@revgaming/session'
import {getEventDetail} from '@revgaming/helpers'
import {incrementUserCounter, setCurrentUser} from './users'
import {incrementAgentCounter, setCurrentAgent} from './agents'

export const IncrementAgentSessionsOnCreated = () =>
    window.addEventListener(Events.SessionCreated, () =>
        incrementAgentCounter('sessions'),
    )

export const IncrementAgentHitsOnInitialized = () =>
    window.addEventListener(Events.SessionInitialized, () =>
        incrementAgentCounter('hits'),
    )

export const setCurrentUserOnAuthenticated = () =>
    window.addEventListener(Events.UserAuthenticated, event => {
        const user = getEventDetail(event, 'user')
        if (user) setCurrentUser(user.uuid ?? user.id)
    })

export const setCurrentAgentOnInitialized = () =>
    window.addEventListener(Events.SessionInitialized, () => setCurrentAgent(window.navigator.userAgent));

export const IncrementUserLoginsOnAuthenticated = () =>
    window.addEventListener(Events.UserAuthenticated, () =>
        incrementUserCounter('logins'),
    )

export const IncrementUserHitsOnMounted = () =>
    window.addEventListener(Events.UserMounted, () =>
        incrementUserCounter('hits'),
    )

