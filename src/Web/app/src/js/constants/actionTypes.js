import keymirror from 'keymirror';

var actionTypes = keymirror({
        LOG_IN: null,
        LOG_IN_SUCCESS: null,
        LOG_IN_FAIL: null,

        LOG_OUT: null,
        LOG_OUT_SUCCESS: null,
        LOG_OUT_FAIL: null
});

export default actionTypes;
