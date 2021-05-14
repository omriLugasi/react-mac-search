import React, { useState } from 'react'
import { ConfigurationItemType } from './../../types'
import DynamicWidget from './../DynamicWidget'
import classes from './searchList.module.scss'

export interface ISearchListProps {
    results: ConfigurationItemType[]
}

const SearchList = (props: ISearchListProps) => {
    const [selectedItem, setSelectedItem] = useState<ConfigurationItemType>()
    const [focusItem , setFocusItem] = useState<number>(0)

    return (
        <div className={classes.results}>
            <ul className={classes.list}>
                {
                    props.results.map((item: ConfigurationItemType, index: number) => (
                        <div
                            key={item.name}
                            className={focusItem === index ? classes.focusItem : ''}
                            onClick={() => setSelectedItem(item)}>
                            { item.name }
                        </div>
                    ))
                }
            </ul>
            <DynamicWidget widgetType={selectedItem?.widgetType} />
        </div>
    )
}

SearchList.defaultProps = {}

export default SearchList
