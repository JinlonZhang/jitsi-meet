/* @flow */

import { SET_CONFIG } from '../config';
import { MiddlewareRegistry } from '../redux';

declare var APP: Object;

/**
 * The redux middleware of the feature base/i18n.
 *
 * @param {Store} store - The redux store.
 * @returns {Function}
 * @private
 */
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case SET_CONFIG:
        return _setConfig(store, next, action);
    }

    return next(action);
});

/**
 * Notifies the feature base/i18n that the action SET_CONFIG is being dispatched
 * within a specific redux store.
 *
 * @param {Store} store - The redux store in which the specified action is being
 * dispatched.
 * @param {Dispatch} next - The redux dispatch function to dispatch the
 * specified action to the specified store.
 * @param {Action} action - The redux action SET_CONFIG which is being
 * dispatched in the specified store.
 * @private
 * @returns {Object} The new state that is the result of the reduction of the
 * specified action.
 */
function _setConfig({ dispatch, getState }, next, action) {
    const oldValue = getState()['features/base/config'];
    const result = next(action);
    const newValue = getState()['features/base/config'];

    if (oldValue !== newValue && typeof APP === 'object') {
        APP.translation.init();
    }

    return result;
}
