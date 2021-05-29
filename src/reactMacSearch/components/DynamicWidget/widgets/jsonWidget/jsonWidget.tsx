import React, { useMemo, useState } from 'react'
import Classnames from 'classnames'
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



const COLLAPSE_OBJECT_VALUE = 'COLLAPSE_OBJECT_VALUE'


const JsonWidget = (props: IJsonWidgetProps) => {
    // const [collapseItems, setCollapseItems] = useState<string[]>([])
    const data = props.item.widgetData?.data || {}
    const theme = props.item.widgetData?.theme || 'dark'
    const isCopyAllow = props.item.widgetData?.features?.copy || false
    const isLineCounterAllow = props.item.widgetData?.features?.linesCounter || false

    const [collapse, setCollapse] = useState<Record<string, boolean>>({})

    const rowClasses = Classnames({
        [classes.lineCounter]: isLineCounterAllow
    })

    const content = useMemo(() => {
        return Object.keys(data).reduce((acc: Record<any, any>, currentKey, index: number) => {
            const item = data[currentKey]
            if (typeof item === 'object') {
                const uniqueId = `${JSON.stringify(item)}_${index}`
                acc.push(
                    <code className={rowClasses} key={index}>
                        <span onClick={() => {
                            setCollapse({ ...collapse, [uniqueId]: collapse[uniqueId] === true ? false : true})
                            alert(JSON.stringify(collapse))
                        }}>
                            O
                        </span> { collapse[uniqueId] ? COLLAPSE_OBJECT_VALUE : JSON.stringify(item, null, 4) }
                    </code>
                )
            } else {
                acc.push(
                    <code className={rowClasses} key={index}>{ data[currentKey] }</code>
                )
            }
            return acc
        }, [])
    }, [])

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
                {
                    content
                }
            </pre>
        </div>
    )
}

JsonWidget.defaultProps = {}

export default JsonWidget
