import React, { Component } from 'react'
import classes from './reactMacSearch.module.scss'

interface IState {
    displayMacSearch: boolean
    searchValue: string
}

interface IProps {
    triggerKey: string,
    closeKey?: string
    withMeta?: boolean
    placeholder?: string
}

class ReactMacSearch extends Component<IProps, IState> {
    static defaultProps = {}

    constructor(props: IProps) {
        super(props)
        this.state = {
            displayMacSearch: false,
            searchValue: ''
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

    render() {
        if (!this.state.displayMacSearch) {
            return null
        }
        return (
            <div className={classes.container}>
                <div className={classes.searchWidget}>
                    <div>ICON</div>
                    <input
                        className={classes.searchInput}
                        placeholder={this.props.placeholder}
                        value={this.state.searchValue}
                        onChange={this.onSearchChange}
                        autoFocus
                    />
                </div>
            </div>
        )
    }

}

ReactMacSearch.defaultProps = {
    closeKey: 'Escape',
    withMeta: false,
    placeholder: 'Search something'
}


export default ReactMacSearch
