import React from 'react'
import {ConfigurationItemType, JsonWidgetType, PageWidgetType, widgetTypeNames} from '../../types'
import PageWidget from './widgets/pageWidget'
import JsonWidget from './widgets/jsonWidget'
import classes from './DynamicWidget.module.scss'

export interface IDynamicWidgetProps {
    widget: ConfigurationItemType
}


const getWidgetByWidgetType = (item: ConfigurationItemType) => {
    switch (item.widgetType) {
        case widgetTypeNames.page:
            return <PageWidget item={item as PageWidgetType} />
        case widgetTypeNames.json:
            return <JsonWidget item={item}/>
        default:
            return null
    }
}

const DynamicWidget = (props: IDynamicWidgetProps) => {

    return (
        <div className={classes.widgetContainer}>
            { getWidgetByWidgetType(props.widget) }
        </div>
    )
}

DynamicWidget.defaultProps = {}

export default DynamicWidget
