export enum widgetTypeNames {
    page = 'page',
    json = 'json'
}

export type PageWidgetType = {
    action: {
        name: string
        props?: any
    },
    name: string
    widgetType: widgetTypeNames.page
    widgetData?: {
        description?: string
        pageIcon?: string
        details?: { name: string, value: any}[]
    }
}

export type JsonWidgetType = {
    name: string
    action: {
        name: string,
        props?: any
    },
    widgetType: widgetTypeNames.json,
}


export type ConfigurationItemType = PageWidgetType | JsonWidgetType
