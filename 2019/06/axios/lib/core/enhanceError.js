
module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if(code) {
        error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function() {
        return {
            message: this.message,
            name: this.name,
            
            // IE
            description: this.description,
            number: this.number,

            // Firefox
            filename: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,

            // Axios
            config: this.config,
            code: this.code,
        }
    }
}