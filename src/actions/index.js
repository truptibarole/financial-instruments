
export const fetchConfig = () => async dispatch => {
    const url = '/config.json'
    try {
        const response = await fetch(`${document.location.origin}${url}`);
        const configData = await response.json();
        dispatch({
            type: "FETCH_CONFIG_SUCCESS",
            payload: configData
        })
    } catch {
        dispatch(fetchFailed());
    }
}

export const fetchFailed = () => ({
    type: "FETCH_FAILED"
});

export const updateFinancialInstruments = (configData) => dispatch => {
    dispatch({
        type: "FETCH_CONFIG_SUCCESS",
        payload: { "financialInstruments": configData }
    });
}
