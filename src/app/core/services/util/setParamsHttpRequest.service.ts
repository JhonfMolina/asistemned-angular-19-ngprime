import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SetParamsHttpRequestService {

  constructor() {}

  setHttpFormDataRequest(data:any): FormData{
    const dataUpload = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if(!Array.isArray(value)) dataUpload.append(key, value as string)
      
      if(Array.isArray(value)) (value as Array<File>).forEach((item, index) => {
          dataUpload.append(`object${index}`, item);
        })

    });
    return dataUpload
  }

  setHttpParams(params:any): HttpParams{
    let dataParams:any = {};
    if(params){
      const list:Array<string> = Object.keys(params);
      dataParams = list.reduce((obj, clave) => {
        const value = params[clave];
        if(Array.isArray(value)) clave = `${clave}[]`;
        obj[clave] = value;
        return obj;
      }, {} as { [clave: string]: any });
    }
    let param = new HttpParams({fromObject: dataParams});
    return param;
  }

  setHttpParamsTools(params:any): HttpParams{
    let dataParams:any = {};
    if(params){
      const list:Array<string> = Object.keys(params);
      dataParams = list.reduce((obj, clave) => {
        const value = params[clave];
        if(Array.isArray(value)) clave = `${clave}[]`;
        obj[clave] = `"${value}"` ;
        return obj;
      }, {} as { [clave: string]: any });
    }
    let param = new HttpParams({fromObject: dataParams});
    return param;
  }

}