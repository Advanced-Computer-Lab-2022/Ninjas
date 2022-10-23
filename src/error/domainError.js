class DomainError extends Error {
    code;
    message;
    messageKey;
    sourceError;
    constructor(message,code){
       super(message);
       this.code=code;
       this.message=message;
    }
    GetHttpResponse(){
        return{
            code:this.code,
            message:this.message,
            messageKey:this.messageKey
        };
    }
}
module.exports= DomainError;