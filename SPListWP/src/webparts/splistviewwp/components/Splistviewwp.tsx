import * as React from 'react';
import * as moment from 'moment';
import { ISplistviewwpProps } from './ISplistviewwpProps';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";    
import {SplistviewwpService }from './SplistviewwpService';
import styles from './Splistviewwp.module.scss';

interface IPnpstate {        
  ListData:IListitem[];      
}      
export interface IListitem {      
  Title: string; 
  Created:string;
  Modified:string;    
} 

export default class Splistviewwp extends React.Component<ISplistviewwpProps, IPnpstate> {

  private _SplistviewwpService:SplistviewwpService;    
  constructor(props: ISplistviewwpProps, state: IPnpstate) {      
    super(props);      
    this.state = {      
      ListData: []      
    };      
    this._SplistviewwpService =new SplistviewwpService(this.props.context,this.props.context.pageContext);    
  }    
  private _getSelection(items: any[]) {    
    console.log('Selected items:', items);    
  } 

  public componentDidMount(){ 
    this._SplistviewwpService.getEmployeesFromSpList(this.props.spHttpClient, this.props.currentSiteUrl).then((result:IListitem[]) =>{    
      this.setState({ ListData: result }); 
    }); 
        
}  

  public render(): React.ReactElement<ISplistviewwpProps> {
    return ( 
      <div className={styles.splistviewcss}>
        <div className={styles.welcome}>
                <img alt="" src={require('../assets/welcome-dark.png')} className={styles.welcomeImage} />
                <h2>Welcome!</h2>
            </div>    
      <div >    
        <ListView    
          items={this.state.ListData}    
          showFilter={true}    
          filterPlaceHolder="Search..."    
          compact={true}    
          selectionMode={SelectionMode.multiple}    
          selection={this._getSelection} 
          //listClassName={styles.splistviewcss}   
          viewFields={viewFields} />    
      </div>
      </div>
        
    );
  }
}



 export const  viewFields : IViewField []= [{    
  name: "Title",    
  displayName: "Employee Name",    
  isResizable: true,    
  sorting: true,    
  minWidth: 0,    
  maxWidth: 150    
},{    
  name: "Created",    
  displayName: "Created Date",  
  isResizable: true,    
  sorting: true,    
  minWidth: 0,    
  maxWidth: 150,
  render: (item: any) => {
    const created = item["Created"];
    if (created) {
      const createdDate = moment(created);
      return <span>{createdDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
    }
  }

},{    
  name: "Modified",    
  displayName: "Modified Date",  
  isResizable: true,    
  sorting: false,    
  minWidth: 0,    
  maxWidth: 150,
  render: (item: any) => {
    const modified = item["Modified"];
    if (modified) {
      const modifiedDate = moment(modified);
      return <span>{modifiedDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
    }
  }

},];
