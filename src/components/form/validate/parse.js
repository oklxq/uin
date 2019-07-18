import {isString,isArray} from "../../../utils";

export default rules => {
    if(isArray(rules)){
        return  rules;
    }
    return [rules];
}