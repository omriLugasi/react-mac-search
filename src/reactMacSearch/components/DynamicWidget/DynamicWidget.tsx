import React from 'react'
import {ConfigurationItemType, PageWidgetType} from '../../types'
import PageWidget from './widgets/pageWidget'
import { widgetTypeNames } from './../../types'
import classes from './DynamicWidget.module.scss'

export interface IDynamicWidgetProps {
    widget: ConfigurationItemType
}


const getWidgetByWidgetType = (item: ConfigurationItemType) => {
    switch (item.widgetType) {
        case widgetTypeNames.page:
            return <PageWidget item={item as PageWidgetType} />
        default:
            return item.widgetType
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
