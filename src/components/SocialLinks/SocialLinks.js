import React from 'react'
import * as R from 'ramda'
import classnames from 'classnames'
import Link from '../Link'
import styles from './SocialLinks.module.scss'
import { createGlobalLocalClassnames } from '../../scripts/utils'
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg'
import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg'
import { ReactComponent as BitBucketIcon } from '../../assets/icons/bitbucket.svg'
import { ReactComponent as CodePenIcon } from '../../assets/icons/codepen.svg'

const createSocialLinksGlobalLocalClassnames = R.partial(createGlobalLocalClassnames, [styles])

const defaultLinks = [
    {
        icon: LinkedInIcon,
        href: 'https://www.linkedin.com/in/hrafnkellbaldurs'
    },
    {
        icon: GitHubIcon,
        href: 'https://www.github.com/hrafnkellbaldurs'
    },
    {
        icon: BitBucketIcon,
        href: 'https://www.bitbucket.com/kotkarl'
    },
    {
        icon: CodePenIcon,
        href: 'https://codepen.io/kotkarl/'
    }
]

const renderSocialLink = ({ href, icon: Icon }, key) => {
    const socialLinkClassnames = classnames(
        createSocialLinksGlobalLocalClassnames('socialLink')
    )

    return (
        <li key={ key }>
            <Link className={ socialLinkClassnames } to={ href }>
                <Icon />
            </Link>
        </li>
    )
}

const SocialLinks = props => {
    const {
        links = defaultLinks
    } = props

    const socialLinksClassnames = classnames(
        createSocialLinksGlobalLocalClassnames('SocialLinks')
    )

    return (
        <ul className={ socialLinksClassnames }>
            { links.map(renderSocialLink) }
        </ul>
    )
}

export default SocialLinks
