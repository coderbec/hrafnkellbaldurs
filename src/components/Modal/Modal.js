import React from 'react'
import ReactModal from 'react-modal'
import { MODAL_TYPES, MODAL_SIZES } from '../../constants'
import * as R from 'ramda'
import styles from './Modal.scss'
import classnames from 'classnames'
import { createGlobalLocalClassnames } from '../../scripts/utils'

ReactModal.setAppElement('#___gatsby')

const createDecoratorClassname = (key, val) => `${ R.toLower(key) }-${ R.toLower(val) }`
const createTypeClassname = R.partial(createDecoratorClassname, ['type'])
const createSizeClassname = R.partial(createDecoratorClassname, ['size'])

class Modal extends React.PureComponent {
    afterOpenModal = () => {

    }

    handleOnClose = _e => {
        this.props.onClose()
    }

    render() {
        const {
            isOpen,
            contentLabel
        } = this.props

        const type = R.defaultTo(MODAL_TYPES.DEFAULT, this.props.type)
        const size = R.defaultTo(MODAL_SIZES.SMALL, this.props.size)

        // The highest parent below ReactModalPortal is the overlay
        // We want to have a root to set styles on
        const rootClassName = 'ModalPortal'
        const rootClassNames = classnames(
            createGlobalLocalClassnames(styles, rootClassName),
            createTypeClassname(type),
            createSizeClassname(size),
            this.props.rootClassName
        )

        // Prepare ReactModal props
        const createReactModalClassname = (base, other) => ({
            base: classnames(base, other),
            afterOpen: `${ base }--after-open`,
            beforeClose: `${ base }--before-close`
        })

        const overlayClassName = createReactModalClassname('modalOverlay', this.props.overlayClassName)

        const reactModalProps = {
            isOpen,
            contentLabel,
            onAfterOpen: this.afterOpenModal,
            onRequestClose: this.handleOnClose,
            portalClassName: rootClassNames,
            overlayClassName: overlayClassName,
            className: createReactModalClassname('modalContent'),
            bodyOpenClassName: `${ rootClassName }--open__Body`,
            htmlOpenClassName: `${ rootClassName }--open__Html`,
            closeTimeoutMS: 200

        }
        return (
            <ReactModal { ...reactModalProps }>
                { this.props.children }
            </ReactModal>
        )
    }
}

export default Modal
