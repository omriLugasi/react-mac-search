import React, { useState, useEffect, useCallback, useRef } from 'react'
import classes from './macSearchSmartInput.module.scss'


interface IProps {
    placeholder?: string
    searchSchema?: any // TODO; add strong type
    onValueChanged: (value: string) => void
}

let timeoutId: NodeJS.Timeout

const MacSearchSmartInput = (props: IProps) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [autocompleteSuggestion, setAutocompleteSuggestion] = useState<{ full: string, display: string }>({
        full: '',
        display: ''
    })
    const ref = useRef<any>() // TODO: strong type

    /**
     * @description
     * Search for suggestion name from searchSchema object.
     * If there is a match we will display the match to the user,
     * In order to perform better UX and show him words that we know exists.
     * For example:
     * If we have searchSchema object with Downloads as a name,
     * And user types "Down", the display will be "Down"loads
     * @private
     */
    const searchForSuggestion = useCallback((value: string): { full: string, display: string } => {
        if (!value) {
            return { full: '', display: '' }
        }
        const index = props.searchSchema.findIndex(({ name }: { name: string }) => {
            return name.toLowerCase().startsWith(value.toLowerCase())
        })
        if (index === -1) {
            return { full: '', display: '' }
        }
        return {
            full: props.searchSchema[index].name,
            display: props.searchSchema[index].name.toLowerCase().replace(value.toLowerCase(), '')
        }
    }, [props.searchSchema])

    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target
        const autocompleteSuggestion = searchForSuggestion(value)
        setSearchValue(value)
        setAutocompleteSuggestion(autocompleteSuggestion)
    }, [])


    useEffect(() => {
        const callback = (e: any) => {
            if (e.key === 'ArrowRight') {
                if (searchValue && autocompleteSuggestion.display) {
                    setSearchValue(autocompleteSuggestion.full)
                    setAutocompleteSuggestion({
                        full: '',
                        display: ''
                    })
                }
            }
        }
        ref.current.addEventListener('keydown', callback)
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('keydown', callback)
            }
        }
    }, [ref.current, autocompleteSuggestion.full])

    useEffect(() => {
        clearTimeout(timeoutId)
        // add debounce for notify parent
        timeoutId = setTimeout(() => {
            props.onValueChanged(searchValue)
        }, 350)
    }, [searchValue])

    return (
        <div>
            <input
                ref={ref}
                size={searchValue.length}
                className={classes.searchInput}
                placeholder={props.placeholder}
                value={searchValue}
                onChange={onSearchChange}
                autoFocus
            />
            <span className={classes.autocompleteSuggestion}>
                { autocompleteSuggestion.display }
            </span>
        </div>
    )
}

MacSearchSmartInput.defaultProps = {
    onValueChanged: (value: string) => undefined
}


export default MacSearchSmartInput
