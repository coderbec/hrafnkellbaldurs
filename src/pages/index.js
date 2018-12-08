import '../styles/pages/index/main.scss'
import React from 'react'
import { graphql } from 'gatsby'
import * as R from 'ramda'
import { ReactComponent as DownloadIcon } from '../assets/images/download.svg'
import { LayoutContainer } from '../components/Layout'
import FitText from 'react-fittext'
import Link from '../components/Link'
import Hero from '../components/Hero'
import Section from '../components/Section'
import Experience from '../components/Experience'
import SkillGrid from '../components/SkillGrid'
import HTMLReactParser from 'html-react-parser'
import Waypoint from 'react-waypoint'
import ShowcaseGrid from '../components/ShowcaseGrid'

const mapData = R.mapObjIndexed(R.pipe(
    R.prop('edges'),
    R.pluck('node')
))

const WAYPOINT_PROPS = {
    topOffset: '40%',
    bottomOffset: '40%'
}

class IndexPage extends React.PureComponent {
    constructor(props) {
        super(props)

        this.layoutContainerRef = React.createRef()
    }

    render() {
        const {
            props,
            renderHero: RenderHero,
            renderAboutSection: RenderAboutSection,
            renderResumeSection: RenderResumeSection,
            renderPortfolioSection: RenderPortfolioSection
        } = this

        const {
            aboutMe: aboutMeData,
            workExperience: workExperienceItems,
            educationExperience: educationExperienceItems,
            skills
        } = mapData(props.data)

        const aboutMe = aboutMeData[0]

        const heroProps = {
            authorFullName: aboutMe.contactDetails.name,
            text: aboutMe.shortDescription,
            backgroundUrl: require('../assets/images/hero-background.jpg')
        }

        const aboutProps = {
            ...aboutMe
        }

        const resumeProps = {
            workExperienceItems,
            educationExperienceItems,
            skills
        }

        const portfolioProps = {

        }

        return (
            <LayoutContainer ref={ this.layoutContainerRef }>
                <RenderHero { ...heroProps } />
                <RenderAboutSection { ...aboutProps } />
                <RenderResumeSection { ...resumeProps } />
                <RenderPortfolioSection { ...portfolioProps } />
            </LayoutContainer>
        )
    }

    onWaypointEnter = (waypoint, section) => {
        const {
            currentPosition,
            previousPosition,
            event,
            waypointTop,
            viewportTop,
            viewportBottom
        } = waypoint

        const layoutContainerRef = this.layoutContainerRef.current
        if (layoutContainerRef) {
            layoutContainerRef.setCurrentNavItem(section.id)
        }
    }

    renderHero = props => {
        const {
            authorFullName,
            text,
            backgroundUrl
        } = props

        const heroProps = {
            backgroundUrl,
            className: 'page-hero'
        }

        const waypointProps = {
            ...WAYPOINT_PROPS,
            onEnter: waypoint => this.onWaypointEnter(waypoint, {
                id: 'home'
            })
        }

        return (
            <Hero { ...heroProps }>
                <Waypoint { ...waypointProps }>
                    <div className="banner-text">
                        <FitText minFontSize={ 30 } maxFontSize={ 80 }>
                            <h1>Hi, I'm { authorFullName }.</h1>
                        </FitText>
                        <FitText minFontSize={ 14 } maxFontSize={ 18 } compressor={ 3 }>
                            <h3>{ text }</h3>
                        </FitText>
                    </div>
                </Waypoint>
            </Hero>
        )
    }

    renderAboutSection = props => {
        const {
            title,
            description,
            urls,
            contactDetails,
            downloadResumeLabel
        } = props

        const waypointProps = {
            ...WAYPOINT_PROPS,
            onEnter: waypoint => this.onWaypointEnter(waypoint, {
                id: 'about'
            })
        }

        return (
            <Section id="about">
                <Waypoint { ...waypointProps }>
                    <div className="row">

                        <div className="three columns">

                            <img className="profile-pic" src={ urls.profilePic.public } alt="" />
                        </div>

                        <div className="nine columns main-col">

                            <h2>{ title }</h2>

                            <div>{ HTMLReactParser(description) }</div>

                            <div className="row">

                                <div className="columns contact-details">

                                    <h2>{ contactDetails.label }</h2>
                                    <p className="address">
                                        <span>{ contactDetails.name }</span><br />
                                        <span>{ contactDetails.address }</span><br />
                                        <span>{ contactDetails.zip } { contactDetails.city }, { contactDetails.country }</span><br />
                                        <span>{ contactDetails.phone }</span><br />
                                        <Link style={ { color: 'inherit' } } to={ `mailto:${ contactDetails.email }` } target="_top">
                                            { contactDetails.email }
                                        </Link>
                                    </p>

                                </div>

                                <div className="columns download">
                                    <Link to={ urls.portfolioPdf.public } className="button" target="_blank">
                                        <span style={ { display: 'flex', alignItems: 'center', 'justifyContent': 'center' } }>
                                            <DownloadIcon style={ { fontSize: '22px', marginRight: '5px', marginTop: '-5px' } } />
                                            { downloadResumeLabel }
                                        </span>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </Waypoint>
            </Section>
        )
    }

    renderResumeSection = props => {
        const {
            workExperienceItems,
            educationExperienceItems,
            skills
        } = props

        const renderExperience = (item, i) => {
            const {
                id,
                dataId,
                title,
                subtitle,
                startDate,
                endDate,
                description,
                logo
            } = item
            const icon = <img src={ logo.publicURL }></img>

            const props = {
                id,
                dataId,
                icon,
                title,
                subtitle,
                startDate,
                endDate,
                description
            }

            return <Experience key={ id } { ...props } />
        }

        const waypointProps = {
            ...WAYPOINT_PROPS,
            onEnter: waypoint => this.onWaypointEnter(waypoint, {
                id: 'resume'
            })
        }

        return (
            <Section id="resume">
                <Waypoint { ...waypointProps }>
                    <div>
                        <div className="row section-item">

                            <div className="three columns header-col">
                                <h1 className="accent-underline">
                                    Experience
                                </h1>
                            </div>

                            <div className="nine columns main-col">
                                { workExperienceItems.map(renderExperience) }
                            </div>

                        </div>

                        <div className="row section-item">

                            <div className="three columns header-col">
                                <h1 className="accent-underline">
                                    Education
                                </h1>
                            </div>

                            <div className="nine columns main-col">
                                { educationExperienceItems.map(renderExperience) }
                            </div>

                        </div>

                        <div className="row section-item">

                            <div className="three columns header-col">
                                <h1 className="accent-underline">
                                    Skills
                                </h1>
                            </div>

                            <div className="nine columns main-col">
                                <div className="row item">
                                    <div className="one columns"></div>
                                    <div className="eleven columns">
                                        <p>
                                            I have experience with a broad field of front-end technologies and frameworks.
                                        </p>
                                    </div>
                                    <SkillGrid skills={ skills }></SkillGrid>
                                </div>
                            </div>
                        </div>
                    </div>
                </Waypoint>
            </Section>

        )
    }

    renderPortfolioSection = props => {
        const {
            items = []
        } = props

        const waypointProps = {
            ...WAYPOINT_PROPS,
            onEnter: waypoint => this.onWaypointEnter(waypoint, {
                id: 'portfolio'
            })
        }

        return (
            <Section id="portfolio">
                <Waypoint { ...waypointProps }>
                    <div className="row">
                        <div className="twelve columns collapsed content-container">
                            <h1 className="accent-underline">Check out some of my works</h1>
                            <ShowcaseGrid items={ items }/>
                        </div>
                    </div>
                </Waypoint>
            </Section>
        )
    }
}

export const query = graphql`
    query IndexPage {
        ...IndexPageFragment
    }
`

export default IndexPage
