import keymirror from 'keymirror';

var actionTypes = keymirror({
        LOG_IN: null,
        LOG_IN_SUCCESS: null,
        LOG_IN_FAIL: null,

        LOG_OUT: null,
        LOG_OUT_SUCCESS: null,
        LOG_OUT_FAIL: null,

        ADD_TOAST: null,
        REMOVE_TOAST: null,

        GET_TC: null,
        GET_TC_SUCCESS: null,
        GET_TC_FAIL: null,

        GET_TEST_CASES: null,
        GET_TEST_CASES_SUCCESS: null,
        GET_TEST_CASES_FAIL: null,

        ACCEPT_TC: null,
        ACCEPT_TC_SUCCESS: null,
        ACCEPT_TC_FAIL: null,

        REJECT_TC: null,
        REJECT_TC_SUCCESS: null,
        REJECT_TC_FAIL: null
});

export default actionTypes;
