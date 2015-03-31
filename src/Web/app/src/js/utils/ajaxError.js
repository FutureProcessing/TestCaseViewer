class AjaxError {
    constructor(message, statusCode){
        this.message = message;
        this.statusCode = statusCode;
    }

    clear(){
        this.message = '';
        this.statusCode = 0;
    }
}

export default AjaxError;
