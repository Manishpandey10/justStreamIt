let str = ["hola","bhaag","ja","kahi"] 
let encode = (str) => {
        return (str.map(str=>{`${str.length}#{str}`}).join(';'));
    }
encode();