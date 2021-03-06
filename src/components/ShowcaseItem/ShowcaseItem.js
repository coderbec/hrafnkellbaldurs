import React from 'react'
import PropTypes from 'prop-types'
import styles from './ShowcaseItem.module.scss'
import { createGlobalLocalClassnames, stringToArray } from '../../scripts/utils'
import classnames from 'classnames'
import * as R from 'ramda'
import Tag from '../Tag'

const globalLocalClassnames = R.partial(createGlobalLocalClassnames, [styles])

/**
 * Showcase item
 */
class ShowcaseItem extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        image: PropTypes.shape({
            label: PropTypes.string,
            src: PropTypes.string
        }),
        title: PropTypes.string,
        subtitle: PropTypes.string,
        // comma seperated string or array
        tags: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]),
        onClick: PropTypes.func
    }

    handleOnClick = _e => {
        this.props.onClick(this.props, _e)
    }

    renderTag = (tag, i) => (
        <Tag key={ i } size="small">{ tag }</Tag>
    )

    render() {
        const {
            id,
            title,
            subtitle,
            image
        } = this.props

        const tagArray = stringToArray(this.props.tags)

        const imageSrcMissing = R.either(R.isNil, R.isEmpty)(image.src)
        const containerProps = {
            className: classnames(
                globalLocalClassnames('ShowcaseItem'),
                {
                    'noImage': imageSrcMissing
                }
            )
        }

        const imageContainer = (
            <div
                className="imageContainer"
                style={ {
                    backgroundImage: imageSrcMissing ? 'none' : `url(${ image.src })`
                } }></div>
        )

        return (
            <div { ...containerProps } onClick={ this.handleOnClick }>
                { imageContainer }
                <div className="infoContainer">
                    <h5 className="title">{ title }</h5>
                    <h6 className="subtitle">{ subtitle }</h6>
                    <div className="tags">
                        { tagArray.map(this.renderTag) }
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowcaseItem
