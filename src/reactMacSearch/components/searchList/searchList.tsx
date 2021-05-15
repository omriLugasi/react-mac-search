import React, {useCallback, useEffect, useState} from 'react'
import { ConfigurationItemType } from './../../types'
import DynamicWidget from './../DynamicWidget'
import {ReactComponent as PageDefaultIcon} from './../../assets/layers_white_24dp.svg'
import classes from './searchList.module.scss'

export interface ISearchListProps {
    results: ConfigurationItemType[],
    onItemSelected: (item: ConfigurationItemType['action']) => void
}


const SearchList = (props: ISearchListProps) => {
    const [selectedItem, setSelectedItem] = useState<ConfigurationItemType>(props.results[0])
    const [focusItem , setFocusItem] = useState<number>(0)

    useEffect(() => {
        setSelectedItem(props.results[0])
        setFocusItem(0)
    }, [props.results])

    const navigator = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            const newSelectedItemIndex = focusItem + 1
            if (newSelectedItemIndex <= props.results.length -1) {
                setFocusItem(newSelectedItemIndex)
                setSelectedItem(props.results[newSelectedItemIndex])
            }
        } else if(e.key === 'ArrowUp') {
            const newSelectedItemIndex = focusItem - 1
            if (newSelectedItemIndex >= 0) {
                setFocusItem(newSelectedItemIndex)
                setSelectedItem(props.results[newSelectedItemIndex])
            }
        } else if (e.key === 'Enter') {
            props.onItemSelected(selectedItem.action)
        }
    }, [focusItem])

    useEffect(() => {
        document.body.addEventListener('keydown', navigator)
        return () => {
            document.body.removeEventListener('keydown', navigator)
        }
    }, [focusItem])

    return (
        <div className={classes.results}>
            <ul className={classes.list}>
                {
                    props.results.map((item: ConfigurationItemType, index: number) => (
                        <li
                            key={item.name}
                            className={focusItem === index ? classes.focusItem : classes.listItem}
                            onClick={() => setSelectedItem(item)}>
                             <PageDefaultIcon />
                             <span> { item.name } </span>
                        </li>
                    ))
                }
            </ul>
            <DynamicWidget widget={selectedItem} />
        </div>
    )
}

SearchList.defaultProps = {}

export default SearchList
