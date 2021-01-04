import {getIdentifier, getIdentifications, setStorageKeyName} from './identifications'
import {updateHeadersWithIdentifications} from './builders'
import {
    IncrementAgentSessionsOnCreated,
    IncrementAgentHitsOnInitialized,
    IncrementUserLoginsOnAuthenticated,
    IncrementUserHitsOnMounted,
    setCurrentUserOnAuthenticated,
    setCurrentAgentOnInitialized,
    setCurrentUserOnMounted,
} from './listeners'
import {getUsers} from "./users";
import {getAgents} from "./agents";

export const bootIdentifications = (opts = {}) => {

    if (opts.key)
        setStorageKeyName(opts.key)

    if (opts.hasOwnProperty('agents')) {
        setCurrentAgentOnInitialized()
        IncrementAgentHitsOnInitialized()
        IncrementAgentSessionsOnCreated()
    }
    if (opts.hasOwnProperty('users')) {
        setCurrentUserOnMounted()
        setCurrentUserOnAuthenticated()
        IncrementUserHitsOnMounted()
        IncrementUserLoginsOnAuthenticated()
    }
    return {
        getIdentifier: getIdentifier,
        getIdentifications: getIdentifications,
    }
}

export {getIdentifier, getIdentifications, getUsers, getAgents}
export {updateHeadersWithIdentifications}
