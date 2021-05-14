import React from 'react'
import {ReactComponent as PageDefaultIcon} from './../../../../assets/pageview_black_24dp.svg'
import { PageWidgetType } from '../../../../types'
import classes from './pageWidget.module.scss'

export interface IPageWidgetProps {
    item: PageWidgetType
}

const PageWidget = (props: IPageWidgetProps) => {
    //@ts-ignore
    const details = props.item.widgetData.details || []
    //@ts-ignore
    const description = props.item.widgetData.description

    return (
        <div className={classes.pageWidget}>
            <PageDefaultIcon />
            <p className={classes.infoBlock}>
                <span className={classes.name}> { props.item.name } </span>
                <br/>
                <span className={classes.description}> { description } </span>
            </p>
            <hr className={classes.divider}/>
            <div className={classes.list}>
                {
                    details.map((item: {name: string, value: any}) => (
                        <div key={item.name} className={classes.listItem}>
                            <span className={classes.itemName}> { item.name } </span>
                            <span> { item.value } </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

PageWidget.defaultProps = {
    item: {
        widgetData: {
            details: [],
            description: ''
        }
    }
}

export default PageWidget
