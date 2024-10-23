import { WebPartContext } from "@microsoft/sp-webpart-base";  
import { SPHttpClient } from "@microsoft/sp-http";
    
export interface ISplistviewwpProps {    
  description: string;    
  context:WebPartContext;   
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}