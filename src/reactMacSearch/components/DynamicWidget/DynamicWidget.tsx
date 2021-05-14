import React from 'react'
import classes from './DynamicWidget.module.scss'

export interface IDynamicWidgetProps {
    widgetType: string
}

const DynamicWidget = (props: IDynamicWidgetProps) => {

    return (
        <div className={classes.widgetContainer}>
            { props.widgetType }
        </div>
    )
}

DynamicWidget.defaultProps = {}

export default DynamicWidget
