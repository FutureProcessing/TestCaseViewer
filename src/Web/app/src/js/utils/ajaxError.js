class AjaxError {
    constructor(message, xhr){
        this.message = message;
        if(xhr){
            this.statusCode = xhr.status;
            this.autoMessage = generateAutoMessage(xhr);
        }
    }

    clear(){
        this.message = '';
        this.statusCode = 0;
    }

    getMessage(){
        return this.message || this.autoMessage;
    }
}

function generateAutoMessage(xhr){
    if(xhr.readyState === 4 && xhr.status === 0){
        return 'Canceled becouse of timeout';
    }
    return '';
}

export default AjaxError;
