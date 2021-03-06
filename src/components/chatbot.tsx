import React from 'react'

import ReactSimpleChatbot from 'react-simple-chatbot'
import styled, { ThemeProvider } from 'styled-components/macro'
import { getChatClassifications } from 'services/chat-classifier'

import steps from 'steps'
import { theme, mobileBreakpoint } from 'theme'
import chloe from 'images/chloe.png'
import { transformStep } from 'services/steps-processor'

const DISABLE_DELAYS = process.env.NODE_ENV !== 'production'

const transformedSteps = steps.map(transformStep)

const makeTheme = ({ colors, sizes, fontFamily }: typeof theme) => ({
  background: colors.background,
  headerBgColor: colors.primary,
  headerFontColor: colors.backgroundLight,
  headerFontSize: sizes.question,
  botBubbleColor: colors.backgroundLight,
  botFontColor: colors.text,
  userBubbleColor: colors.secondaryLight,
  userFontColor: colors.backgroundLight,
  fontFamily,
  colors,
  sizes
})

// const navigateToResults = results => {
//   const query = results.join(',')
//   const url = `result=${query}`
//   window.location.search = url
// }

const handleEnd = async ({ renderedSteps }) => {
  const results = await getChatClassifications(renderedSteps)
  console.log(results)
  // navigateToResults(results)
}

const StyledChatbot = styled(ReactSimpleChatbot)`
  height: 100%;
  width: 100%;

  /* Removes shadow around avatar */
  .rsc-ts-bot .rsc-ts-image {
    box-shadow: none;
  }

  .rsc-container {
    box-shadow: none;
    border-radius: 0;
  }

  .rsc-content {
    padding: 15px;
    height: calc(100% - 30px);
    @media (max-width: ${mobileBreakpoint}px) {
      padding: 10px;
      height: calc(100% - 20px);
    }
  }

  .rsc-ts-bubble {
    font-size: ${props => props.theme.sizes.question};
    padding: calc(${props => props.theme.sizes.question} * 0.75);
    margin-top: 4px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    @media (max-width: ${mobileBreakpoint}px) {
      max-width: 100%;
    }
  }

  .rsc-os {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    justify-content: center;
  }

  .rsc-os-options {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 15px;
  }

  .rsc-os-option-element {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.sizes.buttonText};
    font-family: ${props => props.theme.fontFamily};
    padding: calc(${props => props.theme.sizes.buttonText} * 0.75);
    font-weight: 500;
    background: ${props => props.theme.colors.backgroundLight};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    min-width: 6em;
    margin: 3px;
    cursor: pointer;
    @media (max-width: ${mobileBreakpoint}px) {
      padding: 11px;
      font-size: 14px;
    }
  }

  .rsc-footer {
    display: none;
  }
`

export const Chatbot: React.FC = props => {
  return (
    <ThemeProvider theme={makeTheme}>
      <StyledChatbot
        {...props}
        steps={transformedSteps}
        handleEnd={handleEnd}
        hideHeader
        hideUserAvatar
        botAvatar={chloe}
        userDelay={DISABLE_DELAYS ? 0 : 400}
        botDelay={DISABLE_DELAYS ? 0 : 800}
        customDelay={DISABLE_DELAYS ? 0 : 800}
        width="100%"
        height="100%"
      />
    </ThemeProvider>
  )
}

export default Chatbot
