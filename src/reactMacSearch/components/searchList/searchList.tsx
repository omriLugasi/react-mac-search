import React, {useCallback, useEffect, useState, useRef} from 'react'
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
    const listRef = useRef<any>()
    const lastReachIndex = useRef<number>(0)
    /**
     * @description
     * On each re search reset the selection to the first item in the search array.
     */
    useEffect(() => {
        setSelectedItem(props.results[0])
        setFocusItem(0)
    }, [props.results])

    const navigator = useCallback((e: KeyboardEvent) => {
        const itemsPerList = 10
        const itemHeight = 30

        if (e.key === 'ArrowDown') {
            const newSelectedItemIndex = focusItem + 1
            if (newSelectedItemIndex <= props.results.length -1) {
                setFocusItem(newSelectedItemIndex)
                setSelectedItem(props.results[newSelectedItemIndex])
            }

            if (newSelectedItemIndex > itemsPerList && lastReachIndex.current < newSelectedItemIndex) {
                listRef?.current.scrollTo(0, listRef.current.scrollTop + itemHeight, 'smooth')
                lastReachIndex.current = newSelectedItemIndex
            }

        } else if(e.key === 'ArrowUp') {
            const newSelectedItemIndex = focusItem - 1
            if (newSelectedItemIndex >= 0) {
                setFocusItem(newSelectedItemIndex)
                setSelectedItem(props.results[newSelectedItemIndex])
            }

            if (listRef.current.scrollTop > 0 && (newSelectedItemIndex === (lastReachIndex.current - itemsPerList))) {
                listRef?.current.scrollTo(0, listRef.current.scrollTop - itemHeight, 'smooth')
                lastReachIndex.current--
            }
        } else if (e.key === 'Enter') {
            props.onItemSelected(selectedItem.action)
        }
    }, [focusItem, lastReachIndex])

    useEffect(() => {
        document.body.addEventListener('keydown', navigator)
        return () => {
            document.body.removeEventListener('keydown', navigator)
        }
    }, [focusItem])

    return (
        <div className={classes.results}>
            <ul className={classes.list} ref={listRef}>
                {
                    props.results.map((item: ConfigurationItemType, index: number) => (
                        <li
                            key={item.name}
                            className={focusItem === index ? classes.focusItem : classes.listItem}
                            onClick={() => props.onItemSelected(selectedItem.action)}>
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
