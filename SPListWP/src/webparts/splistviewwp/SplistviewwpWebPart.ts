import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SplistviewwpWebPartStrings';
import Splistviewwp from './components/Splistviewwp';
import { ISplistviewwpProps } from './components/ISplistviewwpProps';

export interface ISplistviewwpWebPartProps {
  description: string;
}

export default class SplistviewwpWebPart extends BaseClientSideWebPart<ISplistviewwpWebPartProps> {

  

  public render(): void {
    const element: React.ReactElement<ISplistviewwpProps> = React.createElement(
      Splistviewwp,
      {
        description: this.properties.description,
        context:this.context,
        spHttpClient: this.context.spHttpClient,
        currentSiteUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
