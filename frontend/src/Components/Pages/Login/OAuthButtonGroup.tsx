import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'

const google = () =>{

  window.open("http://localhost:3001/auth/google", "_self");
}

const providers = [
  { name: 'Google', icon: <GoogleIcon boxSize="5" onClick={google}/> },
  { name: 'Twitter', icon: <TwitterIcon boxSize="5" /> },
  { name: 'GitHub', icon: <GitHubIcon boxSize="5" /> },
]

export const OAuthButtonGroup = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
)
