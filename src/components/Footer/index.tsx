import { LogoFooter } from '@/utils/icons'

import ThemeToggle from '@/components/ThemeToggle'
import * as S from './styles'

export default function Footer() {
  return (
    <S.Footer>
      <S.Container>
        <S.Border />
        <S.FlexContainer>
          <S.LogoContainer>
            <span>
              <LogoFooter width={30} height={30} />
            </span>
            © {new Date().getFullYear()} TabNews - Unofficial Redesign
          </S.LogoContainer>
          <div className="flex flex-row gap-2 justify-between">
            <S.UlContainer>
              <li>Contact</li>
              <li>GitHub</li>
              <li>About</li>
              <li>RSS</li>
              <li>Status</li>
              <li>Terms of Use</li>
              <li>Museum</li>
            </S.UlContainer>
            <ThemeToggle />
          </div>
        </S.FlexContainer>
      </S.Container>
    </S.Footer>
  )
}
