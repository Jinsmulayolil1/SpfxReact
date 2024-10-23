import "@pnp/polyfill-ie11";    
import {sp} from '@pnp/sp/presets/all';    
import {WebPartContext}  from '@microsoft/sp-webpart-base';    
import {PageContext}  from '@microsoft/sp-page-context';  
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IListitem {      
    Title: string;  
    Created: string;
    Modified: string; 
  }     
  export  class SplistviewwpService{    
    constructor(context:WebPartContext,mypagecontext:PageContext){    
    sp.setup({    
        spfxContext:context,    
        sp: {    
            headers: {    
              "Accept": "application/json; odata=verbose"    
            }    
          },    
          ie11: true    
            
            });    
        
    }    
    public async getAllrecords1(listname:string):Promise<IListitem[]>{    
        const result:IListitem[]=[];  
        alert("lname"+listname);  
        return new Promise<IListitem[]>(async(resolve, reject)=>{    
            sp.web.lists.getByTitle(listname).items.get().then((items)=>{    
            items.map((item)=>{    
            //result.push({Title:item.Title,Region:item.Region});    
        });    
        resolve(result);   
        });          
        
        });    
    }
     
    public getEmployeesFromSpList(spHttpClient:SPHttpClient, currentSiteUrl:string): Promise<IListitem[]> {
      return new Promise<IListitem[]>((resolve, reject) => {
        const endpoint: string = `${currentSiteUrl}/_api/lists/getbytitle('Employees')/items?$select=Id,Title,Created,Modified`;
        spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
          .then((response: SPHttpClientResponse) => {
            return response.json();
          })
          .then((jsonResponse: any) => {
            let spListItemEmployees: IListitem[] = [];
            for (let index = 0; index < jsonResponse.value.length; index++) {
              spListItemEmployees.push({
                //id: jsonResponse.value[index].Id,
                Title: jsonResponse.value[index].Title,
                Created: jsonResponse.value[index].Created,
                Modified: jsonResponse.value[index].Modified
              });
    
              resolve(spListItemEmployees);
            }
          });
      });
    
      }
    
  }    