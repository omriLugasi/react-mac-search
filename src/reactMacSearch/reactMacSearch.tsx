import React, { Component } from 'react'
import {ReactComponent as SearchIcon} from './assets/searchIcon.svg'
import classes from './reactMacSearch.module.scss'

interface IState {
    displayMacSearch: boolean
    searchValue: string
    autocompleteSuggestion: string
}

interface IProps {
    triggerKey: string,
    closeKey?: string
    withMeta?: boolean
    withIcon?: boolean
    iconComponent?: any
    placeholder?: string
}

class ReactMacSearch extends Component<IProps, IState> {
    static defaultProps = {}

    constructor(props: IProps) {
        super(props)
        this.state = {
            displayMacSearch: true,
            searchValue: '',
            autocompleteSuggestion: ''
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

    private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target
        this.setState({ searchValue: value })
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
        if (this.props.closeKey === key) {
            return true
        }
        return false
    }

    /**
     * @description
     * Show or hide/render default or custom main search icon.
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

    render() {
        if (!this.state.displayMacSearch) {
            return null
        }
        const { searchValue, autocompleteSuggestion } = this.state
        const { placeholder } = this.props
        return (
            <div className={classes.container}>
                <div className={classes.searchWidget}>
                    { this.renderSearchMainIcon()}
                    <div>
                        <input
                            size={searchValue.length}
                            className={classes.searchInput}
                            placeholder={placeholder}
                            value={searchValue}
                            onChange={this.onSearchChange}
                            autoFocus
                        />
                        <span className={classes.autocompleteSuggestion}>
                            { autocompleteSuggestion }
                        </span>
                    </div>
                </div>
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
