import keymirror from 'keymirror';

var actionTypes = keymirror({
        LOG_IN: null,
        LOGGED_IN_SUCCESS: null,
        LOGGED_IN_FAIL: null,

        LOG_OUT: null,
        LOGGED_OUT_SUCCESS: null,
        LOGGED_OUT_FAIL: null
});

export default actionTypes;
