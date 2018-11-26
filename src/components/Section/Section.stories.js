import React from 'react'
import { storiesOf } from '@storybook/react'
import Section from './Section'
import * as R from 'ramda'

storiesOf('Section', module)
    .add('Basic', () => (
        <Section id="mysection">
            <h1>My section</h1>
            <p>This component is a section of the page</p>
        </Section>
    ))
