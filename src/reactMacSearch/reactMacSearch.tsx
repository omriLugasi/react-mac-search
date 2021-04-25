import React, { Component } from 'react'
import {ReactComponent as SearchIcon} from './assets/searchIcon.svg'
import ReactMacSearchSmartInput from './containers/macSearchSmartInput'
import { ConfigurationItemType } from './types'
import classes from './reactMacSearch.module.scss'

interface IState {
    displayMacSearch: boolean
    results: ConfigurationItemType[]
}

interface IProps {
    triggerKey: string,
    closeKey?: string
    withMeta?: boolean
    withIcon?: boolean
    iconComponent?: any
    placeholder?: string
    searchSchema: ConfigurationItemType[]
}

class ReactMacSearch extends Component<IProps, IState> {
    static defaultProps = {}

    constructor(props: IProps) {
        super(props)
        this.state = {
            displayMacSearch: true,
            results: []
        }
    }

    componentDidMount() {
        document.body.addEventListener('keydown', (e) => {
            if (this.isTriggeredKeyPressed(e.key, e.metaKey)) {
                this.setState({ displayMacSearch: true })
            } else if (this.isCloseKeyPressed(e.key)) {
                this.setState({ displayMacSearch: false })
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
        if (this.props.triggerKey === key && (metaPressed === this.props.withMeta)) {
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

    private onValueChanged = (value: string): void => {
        const results = this.props.searchSchema.filter((item: ConfigurationItemType) =>
            item.name.startsWith(value))
        this.setState({ results })
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
        // TODO: change to component.
    private renderSearchResults = (): React.ReactElement | null => {
        if (!this.state.results.length) {
            return null
        }
        return (
            <ul>
                {
                    this.state.results.map((result: ConfigurationItemType) => (
                        <li key={result.name}> { result.name } </li>
                    ))
                }
            </ul>
        )
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
    withIcon: true
}


export default ReactMacSearch
