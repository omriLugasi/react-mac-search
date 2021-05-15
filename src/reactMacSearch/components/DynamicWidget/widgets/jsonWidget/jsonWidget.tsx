import React from 'react'
import { JsonWidgetType } from '../../../../types'
import {ReactComponent as CopyIcon} from './../../../../assets/content_copy_white_24dp.svg'
import classes from './jsonWidget.module.scss'

export interface IJsonWidgetProps {
    item: JsonWidgetType
}

const copyFunction = (copyText: string): void => {
    const textArea = document.createElement('textarea')
    textArea.textContent = copyText
    document.body.append(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
}

const JsonWidget = (props: IJsonWidgetProps) => {
    const data = props.item.widgetData?.data || {}
    const theme = props.item.widgetData?.theme || 'dark'
    const isCopyAllow = props.item.widgetData?.features?.copy || false

    return (
        <div className={classes.jsonWidget}>
            {
                isCopyAllow && (
                        <div className={classes.copyButton}>
                            <CopyIcon
                                onClick={() => copyFunction(JSON.stringify(data))}
                                title={'copy file content'}
                            />
                        </div>
                )
            }
            <pre className={classes[theme]}>
                { JSON.stringify(data, null, 4) }
            </pre>
        </div>
    )
}

JsonWidget.defaultProps = {}

export default JsonWidget
