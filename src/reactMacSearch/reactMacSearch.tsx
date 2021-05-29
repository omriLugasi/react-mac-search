import React, { Component } from 'react'
import {ReactComponent as SearchIcon} from './assets/searchIcon.svg'
import ReactMacSearchSmartInput from './containers/macSearchSmartInput'
import SearchList from './components/searchList'
import { ConfigurationItemType } from './types'
import classes from './reactMacSearch.module.scss'

interface IState {
    displayMacSearch: boolean
    results: ConfigurationItemType[]
    focusItemName: string
}

interface IProps {
    triggerKey: string
    closeKey?: string
    withMetaKey?: boolean
    withIcon?: boolean
    iconComponent?: any
    placeholder?: string
    searchSchema: ConfigurationItemType[],
    handleSearch?: (item: ConfigurationItemType, inputValue: string) => boolean
    handleItemSelected: (item: ConfigurationItemType['action']) => void
}

class ReactMacSearch extends Component<IProps, IState> {
    static defaultProps = {}

    constructor(props: IProps) {
        super(props)
        this.state = {
            displayMacSearch: true,
            results: [],
            focusItemName: ''
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', (e) => {
            if (this.isTriggeredKeyPressed(e.key, e.metaKey)) {
                this.setState({ displayMacSearch: true })
            } else if (this.isCloseKeyPressed(e.key)) {
                this.setState({ displayMacSearch: false, results: [] })
            }
        })
    }

    /**
     * @description
     * Check if the "tiggerKey" pressed, if yes we will return true and display the macSearch.
     * Also please pay attention that we listen to meta key as well.
     * @private
     */
    private isTriggeredKeyPressed(key: string, metaPressed: boolean): boolean {
        if (this.props.triggerKey === key && (metaPressed === this.props.withMetaKey)) {
            return true
        }
        return false
    }

    /**
     * @description
     * Listen to keyTrigger for close macSearch.
     * @default: Esc
     * @private
     */
    private isCloseKeyPressed(key: string): boolean {
        return (this.props.closeKey === key)
    }

    /**
     * @description
     * when input value change the following function will filter our list
     * by the "handleSearch" function
     */
    private onValueChanged = (value: string): void => {
        const results = this.props.searchSchema.filter((item: ConfigurationItemType) =>
            (this.props.handleSearch && this.props.handleSearch(item, value)))
        this.setState({ results, focusItemName: '' })
    }

    /**
     * @description
     * When user click on enter while he/she in focus on item
     * The following function will triggered, it will trigger the handleItemSelected
     * And reset the library state.
     */
    private onItemsSelected = (item: ConfigurationItemType['action']) => {
        this.setState({
            displayMacSearch: false,
            results: []
        })
        this.props.handleItemSelected(item)
    }

    private onFocusChanged = (name: ConfigurationItemType['name']): void => {
        this.setState({ focusItemName: name })
    }

    /**
     * @description
     * Show or hide or render default or custom main search icon.
     */
    private renderSearchMainIcon = (): React.ReactElement | null => {
        const { withIcon, iconComponent } = this.props
        if (!withIcon) {
            return null
        }
        return (
            <div className={classes.iconWrapper}>
                { iconComponent || <SearchIcon /> }
            </div>
        )
    }

    /**
     * @description
     * Render the search results items list.
     * @private
     */
    private renderSearchResults = (): React.ReactElement | null => {
        if (!this.state.results.length) {
            return null
        }
        return <SearchList
            results={this.state.results}
            onItemSelected={this.onItemsSelected}
            onFocusChanged={this.onFocusChanged}
        />
    }

    render() {
        if (!this.state.displayMacSearch) {
            return null
        }
        return (
            <div className={classes.container}>
                <div className={classes.searchWidget}>
                    { this.renderSearchMainIcon()}
                    <ReactMacSearchSmartInput
                        onValueChanged={this.onValueChanged}
                        placeholder={this.props.placeholder}
                        searchSchema={this.props.searchSchema}
                        focusItemName={this.state.focusItemName}
                    />
                </div>
                {this.renderSearchResults()}
            </div>
        )
    }

}

ReactMacSearch.defaultProps = {
    closeKey: 'Escape',
    withMeta: false,
    placeholder: 'Search something',
    withIcon: true,
    handleSearch: (item: ConfigurationItemType, inputValue: string) =>
        inputValue && item.name.toLowerCase().startsWith(inputValue.toLowerCase())
}


export default ReactMacSearch
