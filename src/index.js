import {getIdentifier, getIdentifications, setStorageKeyName} from './identifications'
import {updateHeadersWithIdentifications} from './builders'
import {
    IncrementAgentSessionsOnCreated,
    IncrementAgentHitsOnInitialized,
    IncrementUserLoginsOnAuthenticated,
    IncrementUserHitOnMounted,
    setCurrentUserOnAuthenticated,
    setCurrentAgentOnInitialized,
} from './listeners'
import {getUsers} from "./users";
import {getAgents} from "./agents";

export const bootTracker = (opts = {}) => {

    if (opts.key)
        setStorageKeyName(opts.key)

    if (opts.hasOwnProperty('agents')) {
        setCurrentAgentOnInitialized()
        IncrementAgentHitsOnInitialized()
        IncrementAgentSessionsOnCreated()
    }
    if (opts.hasOwnProperty('users')) {
        setCurrentUserOnAuthenticated()
        IncrementUserHitOnMounted()
        IncrementUserLoginsOnAuthenticated()
    }
}

export {getIdentifier, getIdentifications, getUsers, getAgents}
export {updateHeadersWithIdentifications}
